import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// services
import { AuthService } from './../auth.service';

// utils
import validator from './../../../utils/validator';
import observer from './../../../utils/observer';
import action from './../../../utils/actionName';
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

    private hasError : boolean;
    private errorMessage : string;

    constructor(
        private router : Router, 
        private user: UserDto, 
        private authService : AuthService,
        private authManager : AuthManager
    ){
        this.hasError = false;
        this.errorMessage = '';

        this.processLogin = this.processLogin.bind(this);
    }

    ngOnInit(): void {
        if(this.authManager.isAuthenticated()){
            this.router.navigate(['/']);
        }
    }

    submit() : void {
        //console.log(JSON.stringify(this.user));

        let emailValid = validator.isEmailValid(this.user.email);

        if(!emailValid){
            this.hasError = true;
            this.errorMessage = 'Email is not correct!';
            return;
        }


        let arePasswordValid = validator.isPasswordValid(this.user.password, 3);
        if(!arePasswordValid){
            this.hasError = true;
            this.errorMessage = 'Password should be minimum 3 character length and can contain a-z, A-Z, 0-9, "." , "-" and "_" !';
            return;
        }

        this.hideError();

        let login = {
            username : this.user.email,
            password : this.user.password
        };

        this.authService.login(login, this.processLogin);
    }

    processLogin(res, err){
        if(err){
            console.log(err);
            //this.router.navigate([`/error?msg=${err}`]);
        }

        console.log(res);

        let fullName = res.firstName + ' ' + res.lastName;
        
        this.authManager.setAuth(res._kmd.authtoken, res._id, fullName, res.canComment, res.isBanned);

        observer.executeFunc(action.changeNavState, this.authManager.isAuthenticated());
        this.router.navigate(['/']);
    }

    hideError() : void{
        this.hasError = false;
        this.errorMessage = '';
    }
}