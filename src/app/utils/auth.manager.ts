import { Injectable } from '@angular/core';

const tokenKey = 'rentMeToken';
const currentUserKey = 'rentMeUser';
const idKey = 'userId';
const canCommentKey = 'userCanComment';
const isUserBannedKey = 'userIsBanned';

class CurrentUser {
    public canComment : boolean;
    public isBanned : boolean;
    constructor( public token : string, public fullName : string, public id : string, canComment, isBanned){
        this.canComment = canComment.toLowerCase() === 'true';
        this.isBanned = isBanned.toLowerCase() === 'true';
    }
}

@Injectable()
export class AuthManager {
    constructor(){

    }
    
    setAuth(token : string, id: string, fullName : string, canComment : boolean, isBanned : boolean) : void {
        localStorage.setItem(tokenKey, token);
        localStorage.setItem(currentUserKey, fullName);
        localStorage.setItem(idKey, id);
        localStorage.setItem(canCommentKey, canComment.toString());
        localStorage.setItem(isUserBannedKey, isBanned.toString());
    }

    getAuth() : CurrentUser {

        const token = localStorage.getItem(tokenKey);
        const fullName = localStorage.getItem(currentUserKey);
        const id = localStorage.getItem(idKey);
        const canComment = localStorage.getItem(canCommentKey);
        const isBanned = localStorage.getItem(isUserBannedKey);

        return new CurrentUser(token, fullName, id, canComment, isBanned);
    }

    removeAuth() : void {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(currentUserKey);
        localStorage.removeItem(idKey);
        localStorage.removeItem(canCommentKey);
        localStorage.removeItem(isUserBannedKey);
    }

    isAuthenticated() : boolean {
        let result = localStorage.getItem(tokenKey) != null && localStorage.getItem(currentUserKey) != null;
        return result;
    }
}