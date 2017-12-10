import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManager } from './../../../utils/auth.manager';
import { AuthService } from './../auth.service';

import observer from './../../../utils/observer';
import action from './../../../utils/actionName';

@Component({
  template: '',
  providers : [ 
    AuthService,
    AuthManager
 ]
})
export class LogoutComponent implements OnInit {
    constructor(
        private authManager : AuthManager,
        private authService : AuthService,
        private router : Router
    ) {
            this.onLogout = this.onLogout.bind(this);
    }

    ngOnInit() {
        this.authService.logout(this.onLogout);
    }

    onLogout(res, err){

        if(err){
            console.log(err);
        } 

        this.authManager.removeAuth();

        observer.executeFunc(action.changeNavState, this.authManager.isAuthenticated());
        this.router.navigate(['/login']);
    }
}