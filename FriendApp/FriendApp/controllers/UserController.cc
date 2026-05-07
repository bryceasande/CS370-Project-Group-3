#include <drogon/HttpController.h>
#include "../models/Hash.h"

using namespace drogon;

class UserController : public HttpController<UserController>
{
public:
    METHOD_LIST_BEGIN
    ADD_METHOD_TO(UserController::createUser, "/create", Post);
    METHOD_ADD(UserController::registerUser, "/register", Post);
    METHOD_LIST_END

    void createUser(const HttpRequestPtr& req,
                    std::function<void (const HttpResponsePtr &)> &&callback)
    {
        static Hash db;

        auto json = req->getJsonObject();

        std::string username = (*json)["username"].asString();
        std::string password = (*json)["password"].asString();
        std::string email = (*json)["email"].asString();

        std::vector<std::string> interests; // empty for now
        std::string bio = "";

        db.insertProfile(username, password, email, interests, bio);

        auto resp = HttpResponse::newHttpResponse();
        resp->setBody("User created");

        callback(resp);
    }

    void registerUser(
    const HttpRequestPtr& req,
    std::function<void(const HttpResponsePtr&)>&& callback)
{
    auto json = req->getJsonObject();

    std::string username = (*json)["username"].asString();
    std::string email = (*json)["email"].asString();
    std::string password = (*json)["password"].asString();

    if (email.find("@csusm.edu") == std::string::npos)
    {
        auto resp =
            HttpResponse::newHttpJsonResponse(
                Json::Value("Invalid campus email"));

        callback(resp);
        return;
    }

    auto db = drogon::app().getDbClient();

    db->execSqlAsync(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",

        [callback](const drogon::orm::Result&)
        {
            auto resp =
                HttpResponse::newHttpJsonResponse(
                    Json::Value("User created"));

            callback(resp);
        },

        [callback](const drogon::orm::DrogonDbException&)
        {
            auto resp =
                HttpResponse::newHttpJsonResponse(
                    Json::Value("Error creating user"));

            callback(resp);
        },

        username,
        email,
        password
    );
}
};