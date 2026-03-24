#include <drogon/HttpController.h>
#include "../models/Hash.h"

using namespace drogon;

class UserController : public HttpController<UserController>
{
public:
    METHOD_LIST_BEGIN
    ADD_METHOD_TO(UserController::createUser, "/create", Post);
    METHOD_LIST_END

    void createUser(const HttpRequestPtr& req,
                    std::function<void (const HttpResponsePtr &)> &&callback)
    {
        static Hash db;

        auto json = req->getJsonObject();

        std::string username = (*json)["username"].asString();
        std::string password = (*json)["password"].asString();

        db.insertProfile(username, password);

        auto resp = HttpResponse::newHttpResponse();
        resp->setBody("User created");

        callback(resp);
    }
};