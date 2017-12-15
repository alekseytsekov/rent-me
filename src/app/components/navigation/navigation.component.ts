import { Component, OnInit } from '@angular/core';
//import { NavigationEnd } from '@angular/router';

import { CommonService } from './../../core/common.service';
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
    private isAdmin : boolean;

    constructor(
        private authManager : AuthManager,
        private commonService : CommonService
    ){
        this.isAuthenticated = this.authManager.isAuthenticated();
        this.currentUser = '';
        this.isAdmin = false;

        this.changeState = this.changeState.bind(this);
        this.activateAdmin = this.activateAdmin.bind(this);
    }

    ngOnInit(){
        
        if(this.isAuthenticated) {
            this.currentUser = this.authManager.getAuth().fullName;
        }
        
        observer.addFunc(action.changeNavState, this.changeState);
        observer.addFunc(action.ACTIVATE_ADMIN_MENU, this.activateAdmin)
    }

    changeState(isAuth : boolean) : void{
        this.isAuthenticated = isAuth;

        if(this.isAuthenticated) {
            this.currentUser = this.authManager.getAuth().fullName;

            //console.log('get user');

            this.commonService.getUserById(this.authManager.getAuth().id)
                .then(res => {
                    
                    this.isAdmin = res['isAdmin'];
                })
        }
    }

    activateAdmin(isAdmin){
        this.isAdmin = isAdmin;
    }
}