import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// services
import { AuthService } from './../auth.service';

// utils
import { AuthManager } from './../../../utils/auth.manager';
import validator from './../../../utils/validator';
import observer from './../../../utils/observer';
import action from './../../../utils/actionName';

//models
import { User } from './../../../models/auth/user.model';
import { UserDto } from './../../../models/auth/userDto.model';
//import { Property } from './../../../models/property/property.model';

@Component({
    selector: 'RegisterForm',
    templateUrl : './register-form.component.html',
    styleUrls : [
        './register-form.component.css'
    ],
    providers : [ 
        UserDto,
        AuthService,
        AuthManager
     ]
})
export class RegisterForm implements OnInit{
    
    private hasError : boolean;
    private errorMessage : string;

    constructor(private router : Router, 
                private user: UserDto, 
                private authService : AuthService,
                private authManager : AuthManager
            ){
        this.hasError = false;
        this.errorMessage = '';

        this.processRegisterResponse = this.processRegisterResponse.bind(this);
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
            this.errorMessage = 'Email is not corect!';
            return;
        }

        let firstNameValid = validator.isStringValid(this.user.firstName);
        if(!firstNameValid){
            this.hasError = true;
            this.errorMessage = 'First name is not corect!';
            return;
        }

        let lastNameValid = validator.isStringValid(this.user.lastName);
        if(!lastNameValid){
            this.hasError = true;
            this.errorMessage = 'Last name is not corect!';
            return;
        }

        let arePasswordsValid = validator.isPasswordValidOnRegister(this.user.password, this.user.confirmPassword, 3);
        if(!arePasswordsValid){
            this.hasError = true;
            this.errorMessage = 'Password or confirm password is not corect or password do not math to confirm password!';
            return;
        }

        this.hideError();

        this.makeRegistration(this.user);
    }

    makeRegistration(user : UserDto){

        let newUser = new User();
        newUser.username = user.email;
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.password = user.password;
        newUser.canComment = true;
        //newUser.favoriteProperties = [];
        newUser.favoritePropertyIds = [];
        newUser.isBanned = false;
        //newUser.roles = [];
        newUser.roleIds = [];

        this.authService.register(newUser, this.processRegisterResponse);
    }

    processRegisterResponse(res, err) : void{
        
        if(err){
            console.log('err');
            console.log(err);
            return;
        }

        let fullName = res.firstName + ' ' + res.lastName;

        this.authManager.setAuth(res._kmd.authtoken, res._id, fullName, res.canComment, res.isBanned);

        //this.router.navigate(['/login']);
        observer.executeFunc(action.changeNavState, this.authManager.isAuthenticated());
        this.router.navigate(['/']);
    }

    hideError() : void{
        this.hasError = false;
        this.errorMessage = '';
    }
}