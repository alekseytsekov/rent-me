import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanLoad,
  Router,
  Route
} from '@angular/router';

import { AuthManager } from './../utils/auth.manager';
import { CommonService } from './common.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authManager : AuthManager,
    private router : Router,
    private commonService : CommonService
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }
  
  checkLoggedIn(url : string) : boolean {

    if (this.authManager.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']).then(res => {
      return false;
    });
    return false;
  }
}