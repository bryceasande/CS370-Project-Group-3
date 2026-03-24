#include<iostream>

struct ProfileUser {
    char Username[50];  // Character limit for USER Name
    char bio[2000];     // Bio including character limit
    std::string interests[10];
    std::string Major[3];
    std::string Minor[5];

    void ListInterest(const std::string arr[]); // Contains user interest
    void Create_Edit(); // Allows user to make changes 
};

class Connections{
    private:
     int friendcap = 900;
     std::string friends[900];

     public:
     void viewOther();  //view who the user follows
     void AorD();       //Accept or Decline follow
     void unfollow();   //Option to unfollow

};