import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import config from './../config/config';
import { AuthManager } from './../utils/auth.manager';

const appKey = config.appKey; // APP KEY HERE;
const appSecret = config.appSec; // APP SECRET HERE;

const baseUrl = config.baseUrl;
//const registerUrl = config.baseUrl + `/user/${appKey}`;
const loginUrl = config.baseUrl + `/user/${appKey}/login`;
const logoutUrl = config.baseUrl + `/user/${appKey}/_logout`

@Injectable()
export class RequesterService {
    constructor(public http : HttpClient, public authManager : AuthManager){

    }

    getReq(url : string, useUserCredentials : boolean = false){

        const fullUrl = config.baseUrl + url;
        const headers = this.createAuthHeaders('Basic', useUserCredentials);

        //console.log(fullUrl);
        //console.log(headers);

        return this.http.get(fullUrl, { headers });
    }

    postReq(url : string, data : {}, isBasicAuth = false) {
        const fullUrl = config.baseUrl + url;
        const body = JSON.stringify(data);

        let authType = 'Kinvey';

        if(isBasicAuth){
            authType = 'Basic';
        }
        const headers = this.createAuthHeaders(authType);

        return this.http.post(fullUrl, body, { headers });
    }

    put(url : string, data : {}) {
        const fullUrl = config.baseUrl + url;
        const body = JSON.stringify(data);

        let authType = 'Kinvey';

        const headers = this.createAuthHeaders(authType);
        
        return this.http.put(fullUrl, body, { headers });
    } 

    private createAuthHeaders(type : string, useUserCredentials : boolean = false) : HttpHeaders {
        if (type === 'Basic') {

            if(useUserCredentials){
                let userAuth = this.authManager.getAuth();

                return new HttpHeaders({
                    'Authorization': `Kinvey ${userAuth.token}`,
                    'Content-Type': 'application/json'
                  })
            } else { // new 
                return new HttpHeaders({
                    'Authorization': `Basic ${btoa(`${config.anonymousUsername}:${config.anonymousPassword}`)}`,
                    'Content-Type': 'application/json'
                  });
            }

        //   return new HttpHeaders({
        //     'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        //     'Content-Type': 'application/json'
        //   });

        } else {

            // new
            if(!useUserCredentials){
                return new HttpHeaders({
                    'Authorization': `Basic ${btoa(`${config.anonymousUsername}:${config.anonymousPassword}`)}`,
                    'Content-Type': 'application/json'
                  });
            }

            const token = this.authManager.getAuth().token;

            return new HttpHeaders({
                'Authorization': `Kinvey ${token}`,
                'Content-Type': 'application/json'
            })
        }
      }
}