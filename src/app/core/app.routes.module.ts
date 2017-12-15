import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropertyModule } from './../components/property/property.module';

import { AuthGuard } from './../core/auth.guard.service';

import { RegisterForm } from './../components/auth/register/register-form.component';
import { LoginFormComponent } from './../components/auth/login/login-form.component';
import { HomeComponent } from './../components/home/home.component';
import { NavigationComponent } from './../components/navigation/navigation.component';
import { LogoutComponent } from './../components/auth/logout/logout.component';
import { PropertyFrom } from './../components/property/property-form.component';
import { PropertyComponent } from './../components/property/property.component';
import { PropertyOwnComponent } from './../components/property/property-own.component';
import { PropertyDetailComponent } from './../components/property/property-detail.component';
import { AdminComponent } from './../components/admin/admin.component';

const routes : Routes = [
    { path : '', canActivate: [ AuthGuard ], component : PropertyComponent, pathMatch : 'full' },
    { path : 'login', component : LoginFormComponent },
    { path : 'register', component : RegisterForm },
    { path : 'admin', canActivate: [ AuthGuard ], component : AdminComponent },
    { path : 'logout', canActivate: [ AuthGuard ], component : LogoutComponent },
    { path : 'property/add', canActivate: [ AuthGuard ], pathMatch : 'full', component : PropertyFrom },
    //{ path : 'property/add/:propertyId', canActivate: [ AuthGuard ], pathMatch : 'full', component : PropertyFrom },
    { path : 'property/own', canActivate: [ AuthGuard ], pathMatch : 'full', component : PropertyOwnComponent },
    { path : 'property/:propertyId', canActivate: [ AuthGuard ], pathMatch : 'full', component : PropertyDetailComponent },

    //{ path : 'admin/users', canActivate: [ AuthGuard ], pathMatch : 'full', component : Property },
    //{ path : 'admin/properties', canActivate: [ AuthGuard ], pathMatch : 'full', component : Property },
    //{ path : '**', component : PageNotFoundComponent }
];

@NgModule({
    declarations : [
        //RegisterForm
        HomeComponent,
        NavigationComponent,
        //PropertyFrom
    ],
    imports : [ RouterModule.forRoot(routes), CommonModule ],
    exports : [ 
        RouterModule,
        HomeComponent,
        NavigationComponent,
        PropertyModule
        //PropertyFrom
    ]
})
export class AppRoutesModule{

}