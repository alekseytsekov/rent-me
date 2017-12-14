import { Component, OnInit } from '@angular/core';
//import { NavigationEnd } from '@angular/router';

import { AuthManager } from './../../utils/auth.manager';
import observer from './../../utils/observer';
import action from './../../utils/actionName';

@Component({
    selector : 'navigation',
    templateUrl : './navigation.component.html',
    styleUrls : [ './navigation.component.css' ]
})
export class NavigationComponent implements OnInit {
    
    private isAuthenticated : boolean;
    private currentUser : string;

    constructor(private authManager : AuthManager){
        this.isAuthenticated = this.authManager.isAuthenticated();
        this.currentUser = '';

        this.changeState = this.changeState.bind(this);
    }

    ngOnInit(){
        observer.addFunc(action.changeNavState, this.changeState);

        if(this.isAuthenticated) {
            this.currentUser = this.authManager.getAuth().fullName;
        }
    }

    changeState(isAuth : boolean) : void{
        this.isAuthenticated = isAuth;

        if(this.isAuthenticated) {
            this.currentUser = this.authManager.getAuth().fullName;
        }
    }
}