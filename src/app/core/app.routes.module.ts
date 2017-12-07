import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterForm } from './../components/auth/register/register-form.component';
import { LoginFormComponent } from './../components/auth/login/login-form.component';
import { HomeComponent } from './../components/home/home.component';
import { NavigationComponent } from './../components/navigation/navigation.component';

const routes : Routes = [
    { path : '', component : HomeComponent, pathMatch : 'full' },
    { path : 'login', component : LoginFormComponent },
    { path : 'register', component : RegisterForm },
    //{ path : '**', component : PageNotFoundComponent }
];

@NgModule({
    declarations : [
        //RegisterForm
        HomeComponent,
        NavigationComponent
    ],
    imports : [ RouterModule.forRoot(routes) ],
    exports : [ 
        RouterModule,
        HomeComponent,
        NavigationComponent ]
})
export class AppRoutesModule{

}