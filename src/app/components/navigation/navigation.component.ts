import { Component } from '@angular/core';

import { AuthManager } from './../../utils/auth.manager';

@Component({
    selector : 'navigation',
    templateUrl : './navigation.component.html',
    styleUrls : [ './navigation.component.css' ]
})
export class NavigationComponent {

    private isAuthenticated : boolean;

    constructor(private authManager : AuthManager){
        this.isAuthenticated = this.authManager.isAuthenticated()
    }
}