#define _WINSOCK_DEPRECATED_NO_WARNINGS
#pragma comment(lib, "ws2_32.lib")

#include <iostream>
#include <string>
#include <WinSock2.h>
using namespace std;

class Server {
    private:
        SOCKET server;
        WSADATA wsaData;
        sockaddr_in serverAddr;
        int port;

    public:
    Server(int p){
        port = p;
    };
    
    bool start(){
        //initialize WinSock
        if(WSAStartup(MAKEWORD(2,2), &wsaData) != 0){
            cout << "WSASTARTUP Error"<< endl;
            return false;
        }

        //creating socket
        server = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);

        if(server == INVALID_SOCKET){
            cout << "Socket creation error"<< endl;
            return false;
        }

        //Setup address
        serverAddr.sin_family = AF_INET;
        serverAddr.sin_addr.s_addr = inet_addr("127.0.0.1");
        serverAddr.sin_port = htons(port);

        //bind
        if(bind(server, (SOCKADDR*)&serverAddr, sizeof(serverAddr)) != 0){
            cout << "Binding Error"<< endl;
            return false;
        }

        //listen
        if(listen(server, 20) != 0){
            cout << "Listen Error"<< endl;
            return false;
        }

        cout << "Server listening on port " << port << endl;

        while(true){
            SOCKET clientSocket = accept(server, NULL, NULL);

            if(clientSocket == INVALID_SOCKET){
                cout << "Accept Error"<< endl;
                continue;
            }

            handleClient(clientSocket);
        }

        closesocket(server);
        WSACleanup();
    }

    void acceptClients();

    void handleClient(SOCKET client){
        char buffer[30720];

        int bytesReceived = recv(client, buffer, sizeof(buffer), 0);

        if (bytesReceived > 0) {

            cout << "Request received:\n";
            cout << buffer << endl;

            string response =
                "HTTP/1.1 200 OK\r\n"
                "Content-Type: text/plain\r\n"
                "Content-Length: 12\r\n"
                "\r\n"
                "Hello World!";

            send(client, response.c_str(), response.size(), 0);
        }

        closesocket(client);
    }
    
};
