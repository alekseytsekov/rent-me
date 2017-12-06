const tokenKey = 'rentMeToken';
const currentUserKey = 'rentMeUser';

class CurrentUser {
    constructor( public token : string, public fullName : string){

    }
}

const authManager = {
    setAuth(token : string, fullName : string) : void {
        localStorage.setItem(tokenKey, token);
        localStorage.setItem(currentUserKey, fullName);
    },
    getAuth() : CurrentUser {

        const token = localStorage.getItem(tokenKey);
        const fullName = localStorage.getItem(currentUserKey);

        return new CurrentUser(token, fullName);
    },
    removeAuth() : void {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(currentUserKey);
    }
};

export default authManager;