#include "Hash.h"
#include <iostream>
#include <cstdlib>
using namespace std;

Hash::Hash()
{
    for(int i = 0; i < database_size; i++)
    {
        HashTable[i] = nullptr;
    }
}

int Hash::hash_key(std::string key){
    int hash = 0;
    int index;

    for(int i = 0; i < key.length(); i++){
        hash = (hash + (int)key[i]) * 17;
    }
        index = hash % database_size;
        return index;
}

void Hash::insertProfile(std::string username, std::string password){
    int index = hash_key(username);
    profile_info* NEWPF = new profile_info;
    profile_info*_ptr = new profile_info;

    NEWPF -> Username = username;
    NEWPF -> Password = password;

    if(HashTable[index] == NULL){
        HashTable[index] = NULL;
    }else{
        _ptr = HashTable[index];
        
        while(_ptr -> next != NULL){
            _ptr = _ptr -> next;
        }

        _ptr -> next = NEWPF;
    }

}

void Hash::EnterBio(std::string username, std::string bio){
    int index = hash_key(username);
    profile_info* _ptr = new profile_info;

    while(_ptr -> next != NULL){
        if(_ptr -> Username == username){
            _ptr -> Bio = bio;
        }

        _ptr = _ptr -> next;
    }
}

void Hash::EnterInterests(std::string username, std::vector<std::string> interests){
    int index = hash_key(username);
    profile_info* _ptr = new profile_info;

    while(_ptr -> next != NULL){
        if(_ptr -> Username == username){
            _ptr -> Interests = interests;
        }

        _ptr = _ptr -> next;
    }
}

void Hash::FindMatch(std::string username){

    int index = hash_key(username);
    profile_info* Main = new profile_info;

    while(Main != NULL && Main -> Username != username){
        Main = Main -> next;
    }

    if(Main == NULL){
        cout << "ERROR: Usar is not found" << endl;
        return;
    }

    cout << "Your Future Friends Could Be...." << endl;

    for(int i = 0; i < database_size; i++){
        profile_info* _ptr = new profile_info;

        while(_ptr != NULL){
             if(_ptr->Username != username)
            {
                int score = countSharedInterests(Main, _ptr);

                if(score > 0)
                {
                    std::cout << _ptr->Username 
                              << " (" << score 
                              << " shared interests)\n";
                }
            }
            _ptr = _ptr -> next;
        }
    }
}

int Hash::countSharedInterests(profile_info* a, profile_info* b)
{
    int matches = 0;

    for(const std::string& interestA : a->Interests)
    {
        for(const std::string& interestB : b->Interests)
        {
            if(interestA == interestB)
            {
                matches++;
            }
        }
    }

    return matches;
}