import { Injectable } from '@angular/core';
import { RequesterService } from './requester.service';

import { AuthManager } from './../utils/auth.manager';

import config from './../config/config';

const userUrl = `/user/${config.appKey}/`;
const commentUrl = `/appdata/${config.appKey}/comments`

//const baseCollectionUrl = `/appdata/${config.appKey}`;

@Injectable()
export class CommonService {
    constructor(
        private requestService : RequesterService,
        private authManager : AuthManager
    ) {

    }

    //methods
    
    //await this.requestService.getReq(propertiesUrl + `?query={"publisherId": "${this.authManager.getAuth().id}"}`, true).toPromise();
    async getCommentsById(commentIds : string[]) {
        try {
            
            if(commentIds.length < 1){
                commentIds = ["5a2ef6d2970ffa09c880c4ee", "5a2efab2e0f4037c9eb884c0"];
            }

            let temp = '['
            for(let i = 0; i < commentIds.length; i++){
                if(i === commentIds.length - 1){
                    temp += `\"${commentIds[i]}\"`;
                } else {
                    temp += `\"${commentIds[i]}\",`;
                }
            }
            
            temp += ']'

            let query = `?query={"_id": { "$in" : ${temp} }}`;

            //console.log(query);
            //let query = `?query={"_id": { $in : ${commentIds} } }`;
            //let query = `?query={"_id": "5a2ef6d2970ffa09c880c4ee" }`;
            let result = await this.requestService.getReq(commentUrl + query, true).toPromise();

            if(result['status'] && result['status'] === 401){
                return [];
            }
            //console.log(1);
           //console.log(result);
            return result;
        } catch (e) {
            console.log(e);
            return [];
        } 
    }


    async getUserById(userId : string) {
        try {
            
            let result = await this.requestService.getReq(userUrl + userId, true).toPromise();

            if(result['status'] && result['status'] === 401){
                return [];
            }
            //console.log(1);
           //console.log(result);
            return result;
        } catch (e) {
            console.log('greshka');
            console.log(e);
            return [];
        } 
    }
}