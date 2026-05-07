#pragma once
#include <drogon/WebSocketController.h>
#include <set>
#include "../models/Hash.h"
#include <map>

using namespace drogon;

class ChatSocket : public WebSocketController<ChatSocket> {
private:
    static std::set<WebSocketConnectionPtr> clients;

    static Hash database;
    static std::map<WebSocketConnectionPtr, std::string> connectionUsers;
    static std::map<std::string, std::string> matches;
    static std::vector<std::string> waitingQueue;

public:
    void handleNewMessage(const WebSocketConnectionPtr &,
                          std::string &&,
                          const WebSocketMessageType &) override;

    void handleNewConnection(const HttpRequestPtr &,
                             const WebSocketConnectionPtr &) override;
                             

    void handleConnectionClosed(const WebSocketConnectionPtr &) override;
    
    void tryMatchFromQueue();

    bool hasSharedInterest(const std::vector<std::string>& a,
                       const std::vector<std::string>& b);

    WS_PATH_LIST_BEGIN
    WS_PATH_ADD("/chat", Get);
    WS_PATH_LIST_END


};