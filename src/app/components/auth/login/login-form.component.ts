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

    public hasError : boolean;
    public errorMessage : string;

    constructor(
        public router : Router, 
        public user: UserDto, 
        public authService : AuthService,
        public authManager : AuthManager
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
            observer.executeFunc(action.SHOW_ERROR, 'Email or password is incorrect!');
            return;
        }

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