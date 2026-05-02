#include <drogon/WebSocketController.h>

using namespace drogon;

class ChatSocket : public WebSocketController<ChatSocket>
{
public:
    void handleNewConnection(const HttpRequestPtr&,
                             const WebSocketConnectionPtr& conn) override
    {
        std::cout << "New WebSocket connection\n";
    }

    void handleNewMessage(const WebSocketConnectionPtr& conn,
                          std::string &&message,
                          const WebSocketMessageType &type) override
    {
        // Echo message back
        conn->send("Server received: " + message);
    }

    void handleConnectionClosed(const WebSocketConnectionPtr& conn) override
    {
        std::cout << "Connection closed\n";
    }

    WS_PATH_LIST_BEGIN
    WS_PATH_ADD("/ws", Get);
    WS_PATH_LIST_END
};