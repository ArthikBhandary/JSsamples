#include<iostream> 

using namespace std; 
void fun(int *ptr) {
    *ptr = 30;
}

int main() {
     int y = 20;
    fun(&y);
    cout<<y++ + 10<<endl;
    return 0;

}