#ifndef HASH_H
#define HASH_H
#include <iostream>
#include <string>
#include <vector>

class Hash {
    private:
        static const int database_size = 1000; // temp size for now

        struct profile_info{
            std::string Username;       // store username
            std::string Password;       // store password
            std::vector<std::string> Interests;   // store interests (limit 10 for now)
            std::string Bio;            // save user bio
            std::string Email;          //Stores the email 
            std::string Domain;         // csusm.edu

            profile_info* next;
        };

        profile_info* HashTable[database_size];

        std::string extractDomain(const std::string& email); // getting csusm.edu

    public:
        //The Hash Table
    Hash();  // constructor
    int hash_key(const std::string& key);

    //Profile Creation
    void insertProfile(const std::string& username, 
                       const std::string& password, 
                       const std::string& email,
                       const std::vector<std::string>& interests, 
                       const std::string& bio);

    void updateProfile(const std::string& username, const std::string& bio, const std::vector<std::string>& interests); // update system

    bool login(const std::string& username, const std::string& password); // how user can login
        
    void saveToFile(const std::string& filename); // save into system

    void loadFromFile(const std::string& filename); // loads email/login

    profile_info* getProfile(const std::string& username);

};

#endif