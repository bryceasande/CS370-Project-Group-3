#pragma once

#include <drogon/HttpController.h>

using namespace drogon;

class UserController : public HttpController<UserController>
{
public:
    METHOD_LIST_BEGIN
    ADD_METHOD_TO(UserController::createUser, "/create", Post);
    METHOD_LIST_END

    void createUser(const HttpRequestPtr& req,
                    std::function<void (const HttpResponsePtr &)> &&callback);

    void UserController::registerUser(const HttpRequestPtr& req,
                                  std::function<void (const HttpResponsePtr &)> &&callback);

};