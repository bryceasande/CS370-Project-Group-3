#pragma once
#include <string>
#include <vector>

class Users {
public:
    int id;
    std::string username;
    std::string email;
    std::string password;
    std::string bio;
    std::vector<std::string> interests;

    void  getUsername();
    void getEmail();
    void getPassword();
};