#include "ChatSocket.h"
#include "Hash.h"
#include <json/json.h>

std::set<WebSocketConnectionPtr> ChatSocket::clients;
Hash ChatSocket::database;
std::map<WebSocketConnectionPtr, std::string> ChatSocket::connectionUsers;
std::map<std::string, std::string> ChatSocket::matches;
std::vector<std::string> ChatSocket::waitingQueue;

bool hasSharedInterest(const std::vector<std::string>& a,
                       const std::vector<std::string>& b)
{
    for (const auto& x : a)
        for (const auto& y : b)
            if (x == y)
                return true;
    return false;
}

void ChatSocket::handleNewConnection(const HttpRequestPtr&,
                                     const WebSocketConnectionPtr& conn)
{
    clients.insert(conn);
    LOG_INFO << "WebSocket connected!";
}

void ChatSocket::handleConnectionClosed(const WebSocketConnectionPtr& conn)
{
    if (connectionUsers.find(conn) != connectionUsers.end())
    {
        std::string user = connectionUsers[conn];

        // Remove match
        if (matches.find(user) != matches.end())
        {
            std::string other = matches[user];
            matches.erase(other);
            matches.erase(user);
        }

        connectionUsers.erase(conn);
    }

    clients.erase(conn);
}

void ChatSocket::handleNewMessage(const WebSocketConnectionPtr& conn,
                                  std::string&& message,
                                  const WebSocketMessageType&)
{
    if (message.empty()) {
        LOG_WARN << "Empty message received, ignoring...";
        return;
    }

    Json::Value json;
    Json::Reader reader;

    if (!reader.parse(message, json)) {
        LOG_ERROR << "JSON Parse Failed: " << message;
        conn->send("Invalid JSON format");
        return;
    }

    if (!json.isMember("username") || !json.isMember("message")) {
        conn->send("Missing fields");
        return;
    }

    std::string Username = json["username"].asString();
    std::string msg = json["message"].asString();
    std::string Email = json["email"].asString();

    std::vector<std::string> Interests;
    for (auto& i : json["interests"]) {
        Interests.push_back(i.asString());
    }

    // store user
    connectionUsers[conn] = Username;

    if (!database.getProfile(Username)) {
        database.insertProfile(Username, "temp", Email, Interests, "");
    }

    // add to queue (avoid duplicates)
    if (matches.find(Username) == matches.end() &&
        std::find(waitingQueue.begin(), waitingQueue.end(), Username) == waitingQueue.end())
    {
        waitingQueue.push_back(Username);
    }

    // match attempt
    tryMatchFromQueue();

    // sending message
    if (matches.find(Username) != matches.end())
    {
        std::string targetUser = matches[Username];

        for (auto& c : clients)
        {
            if (connectionUsers.find(c) == connectionUsers.end())
                continue;

            std::string currentUser = connectionUsers[c];

            if (currentUser == targetUser)
            {
                c->send(Username + ": " + msg);
            }
        }
    }
    else
    {
        conn->send("matching...");
    }
}
void ChatSocket::tryMatchFromQueue()
{

    for (size_t i = 0; i < waitingQueue.size(); i++)
    {
        for (size_t j = i + 1; j < waitingQueue.size(); j++)
        {
            std::string userA = waitingQueue[i];
            std::string userB = waitingQueue[j];

            auto* A = database.getProfile(userA);
            auto* B = database.getProfile(userB);

            if (!A || !B)
            {
                continue;
            }

            if (A->Domain != B->Domain)
            {
                continue;
            }
            for (auto& a : A->Interests)
            {
                for (auto& b : B->Interests)
                {
                    if (a == b)
                    {
                        matches[userA] = userB;
                        matches[userB] = userA;

                        // Notify both users
                        for (auto& c : clients)
                        {
                            if (connectionUsers[c] == userA)
                                c->send("You Matched With " + userB);

                            if (connectionUsers[c] == userB)
                                c->send("You Matched With  " + userA);
                        }

                        // Remove from queue safely
                        waitingQueue.erase(waitingQueue.begin() + j);
                        waitingQueue.erase(waitingQueue.begin() + i);

                        return; // stop after one match
                    }
                }
            }
        }
    }
}