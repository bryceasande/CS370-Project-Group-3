#include "Hash.h"
#include <fstream>
#include <json/json.h>

Hash::Hash() {
    for (int i = 0; i < database_size; i++) {
        HashTable[i] = nullptr;
    }
}

int Hash::hash_key(const std::string& key) {
    int hash = 0;
    for (char c : key) {
        hash = (hash + c) * 17;
    }
    return hash % database_size;
}

std::string Hash::extractDomain(const std::string& email) {
    size_t pos = email.find('@');
    if (pos != std::string::npos) {
        return email.substr(pos + 1);
    }
    return "";
}

void Hash::insertProfile(const std::string& username, 
                       const std::string& password, 
                       const std::string& email,
                       const std::vector<std::string>& interests, 
                       const std::string& bio)
{
    if (getProfile(username)) return;

    int index = hash_key(username);
    profile_info* newNode = new profile_info;
    newNode->Username = username;
    newNode->Password = password;
    newNode->Email = email;
    newNode->Domain = extractDomain(email); // Automatically set domain
    newNode->Interests = interests;
    newNode->Bio = bio;
    newNode->next = HashTable[index]; // Simpler insertion at head
    HashTable[index] = newNode;
}

Hash::profile_info* Hash::getProfile(const std::string& username)
{
    int index = hash_key(username);

    profile_info* temp = HashTable[index];
    while (temp) {
        if (temp->Username == username) {
            return temp;
        }
        temp = temp->next;
    }
    return NULL;
}

bool Hash::login(const std::string& username, const std::string& password) {
    profile_info* p = getProfile(username);
    return (p != NULL && p->Password == password);
}

void Hash::updateProfile(const std::string& username, const std::string& bio, const std::vector<std::string>& interests) {
    profile_info* p = getProfile(username);
    if (p) {
        p->Bio = bio;
        p->Interests = interests;
    }
}

void Hash::saveToFile(const std::string& filename) {
    Json::Value root;
    for (int i = 0; i < database_size; i++) {
        profile_info* temp = HashTable[i];
        while (temp) {
            Json::Value user;
            user["username"] = temp->Username;
            user["password"] = temp->Password;
            user["email"] = temp->Email;
            user["bio"] = temp->Bio;

           for (const auto& interest : temp->Interests)
            {
                user["interests"].append(interest);
            }

            root.append(user);
            temp = temp->next;
        }
    }
    std::ofstream file(filename);
    file << root.toStyledString();
}

void Hash::loadFromFile(const std::string& filename) {
    std::ifstream file(filename);
    Json::Value root;
    file >> root;
for (auto& user : root)
{
    std::vector<std::string> interests;

    for (auto& i : user["interests"])
    {
        interests.push_back(i.asString());
    }

    insertProfile(
        user["username"].asString(),
        user["password"].asString(),
        user["email"].asString(),
        interests,
        user["bio"].asString()
    );
}
}