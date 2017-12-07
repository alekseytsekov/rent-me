import { Injectable } from '@angular/core';

const tokenKey = 'rentMeToken';
const currentUserKey = 'rentMeUser';

class CurrentUser {
    constructor( public token : string, public fullName : string){

    }
}

@Injectable()
export class AuthManager {
    constructor(){

    }
    
    setAuth(token : string, fullName : string) : void {
        localStorage.setItem(tokenKey, token);
        localStorage.setItem(currentUserKey, fullName);
    }

    getAuth() : CurrentUser {

        const token = localStorage.getItem(tokenKey);
        const fullName = localStorage.getItem(currentUserKey);

        return new CurrentUser(token, fullName);
    }

    removeAuth() : void {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(currentUserKey);
    }

    isAuthenticated() : boolean {
        let result = localStorage.getItem(tokenKey) != null && localStorage.getItem(currentUserKey) != null;
        return result;
    }
}