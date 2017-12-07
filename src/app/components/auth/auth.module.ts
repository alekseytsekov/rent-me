import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//components
import { RegisterForm } from './register/register-form.component';
import { LoginFormComponent } from './login/login-form.component';

@NgModule({
    imports : [ 
        CommonModule,
        FormsModule
     ],
    declarations : [
        // components
        RegisterForm,
        LoginFormComponent
    ],
    exports : [
        // components
        RegisterForm,
        LoginFormComponent
    ],
    providers : [
        
    ]
})
export class AuthModule {

}

