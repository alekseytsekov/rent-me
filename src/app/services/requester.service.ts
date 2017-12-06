import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import config from './../config/config';
import authManager from './../utils/auth.manager';

const appKey = config.appKey; // APP KEY HERE;
const appSecret = config.appSec; // APP SECRET HERE;

const baseUrl = config.baseUrl;
const registerUrl = config.baseUrl + `/user/${appKey}`;
const loginUrl = config.baseUrl + `/user/${appKey}/login`;
const logoutUrl = config.baseUrl + `/user/${appKey}/_logout`

@Injectable()
export class RequesterService {
    constructor(private http : HttpClient){

    }

    getReq(url : string){

        const fullUrl = config.baseUrl + url;
        const headers = this.createAuthHeaders('Basic');

        return this.http.get(fullUrl, { headers });
    }

    postReq(url : string, data : {}) {
        const fullUrl = config.baseUrl + url;
        const body = JSON.stringify(data);
        const headers = this.createAuthHeaders('Kin');

        return this.http.post(fullUrl, body, { headers });
    }

    private createAuthHeaders(type : string) : HttpHeaders {
        if (type === 'Basic') {
          return new HttpHeaders({
            'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
            'Content-Type': 'application/json'
          })
        } else {

            const token = authManager.getAuth().token;

            return new HttpHeaders({
                'Authorization': `Kinvey ${token}`,
                'Content-Type': 'application/json'
            })
        }
      }
}