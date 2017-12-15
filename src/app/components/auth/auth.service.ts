import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import config from './../../config/config';

import { RequesterService } from './../../core/requester.service';
import { User } from './../../models/auth/user.model';

const registerUrl = `/user/${config.appKey}`;
const loginUrl = `/user/${config.appKey}/login`;
const logoutUrl = `/user/${config.appKey}/_logout`;

@Injectable()
export class AuthService{
    constructor (private requestor : RequesterService){

    }

    register(user : User, callBack) {

        this.requestor.postReq(registerUrl, user, true)
            .subscribe(res => {

                callBack(res);
            }, err => {
                callBack(null, err);
            });
    }

    login(loginUser, callBack) {
        this.requestor.postReq(loginUrl, loginUser, true)
            .subscribe(res => {
                callBack(res);
                //console.log(res);
            },
            err => {
                callBack(null, err);
            })
    }

    logout(callBack){
        this.requestor.postReq(logoutUrl, {})
            .subscribe(
                res => {
                    callBack(res);
                },
                err => {
                    callBack(null, err);
                }
            );
    }
}