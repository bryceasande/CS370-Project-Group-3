#define _WINSOCK_DEPRECATED_NO_WARNINGS
#pragma comment(lib, "ws2_32.lib")

#include <iostream>
#include <string>
#include <WinSock2.h>
using namespace std;

class Client {
    private:
        int port;
        std::string Token;  // Authorize token 
        std::string serverIP;

    public:
        void Login(string Username, string Password);   //log in to existing account
        void Signin(string Username, string Password);  //create/registar an account <-- User does this first
        void holdProfile();
};