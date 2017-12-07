import { Component } from '@angular/core';
import { Router } from '@angular/router';

//models
import { User } from './../../../models/auth/user.model';

@Component({
    selector: 'RegisterForm',
    templateUrl : './register-form.component.html',
    styleUrls : [
        './register-form.component.css'
    ],
})
export class RegisterForm{

    private user : User

    constructor(private router : Router){
        this.user = new User();
    }

    submit() : void {
        console.log(JSON.stringify(this.user));

        this.router.navigate(['/login']);
    }
}