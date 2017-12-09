import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// services
import { AuthService } from './../auth.service';

// utils
import validator from './../../../utils/validator';
import { AuthManager } from './../../../utils/auth.manager';

//models
import { User } from './../../../models/auth/user.model';
import { UserDto } from './../../../models/auth/userDto.model';

@Component({
    selector : '',
    templateUrl : './login-form.component.html',
    styleUrls : [ './login-form.component.css' ],
    providers : [ 
        UserDto,
        AuthService,
        AuthManager
     ]
})
export class LoginFormComponent implements OnInit {
    constructor(
        private router : Router, 
        private user: UserDto, 
        private authService : AuthService,
        private authManager : AuthManager
    ){

    }

    ngOnInit(): void {
        if(this.authManager.isAuthenticated()){
            this.router.navigate(['/']);
        }
    }
}