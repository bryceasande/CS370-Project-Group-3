#ifndef HASH_H
#define HASH_H
#include <iostream>
#include <string>
#include <vector>

class Hash {
    private:
        static const int database_size = 1000; // temp size for now

        struct profile_info{
            std::string Username = "";       // store username
            std::string Password = "";       // store password
            std::vector<std::string> Interests;   // store interests (limit 10 for now)
            std::string Bio = "";            // save user bio

            profile_info* next;
        };

        profile_info* HashTable[database_size];

    public:
        //The Hash Table
        Hash(); // constructor
        int hash_key(std::string key);

        //Profile Creation
        void insertProfile(std::string username, std::string password); // Enter User's profile
        void EnterBio(std::string username, std::string bio);
        void EnterInterests(std::string username, std::vector<std::string> interests);

        //Friend Connection
        void FindMatch(std::string username);
        int countSharedInterests(profile_info* a, profile_info* b);
};

#endif