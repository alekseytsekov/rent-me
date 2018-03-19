import { Injectable } from '@angular/core';
import { RequesterService } from './requester.service';

import { AuthManager } from './../utils/auth.manager';

import { Image } from './../models/common/image.model';

import config from './../config/config';

const userUrl = `/user/${config.appKey}/`;
const commentUrl = `/appdata/${config.appKey}/comments`;
const imageUrl = `/appdata/${config.appKey}/images`;
const addUserIdUrl = `/appdata/${config.appKey}/allUsers`;

//const baseCollectionUrl = `/appdata/${config.appKey}`;

@Injectable()
export class CommonService {
    constructor(
        public requestService : RequesterService,
        public authManager : AuthManager
    ) {

    }

    //methods
    async addImage(image){

        let entity  = {
            imageUrl : image.url
        }

        return this.requestService.postReq(imageUrl, entity).toPromise();
        // .subscribe(res => {
        //     console.log(res);
        //     callback(res);
        // },
        // err => {
        //     callback(null, err);
        // });
    }

    async getImages(imageArr : string[]){
        try {
            let validArr = this.mapToValidQueryArr(imageArr);
            let query = `?query={"_id": { "$in" : ${validArr} }}`;

            let result = await this.requestService.getReq(commentUrl + query, true).toPromise();
            
            if(result['status'] && result['status'] === 401){
                return [];
            }
            
            console.log(result);
            return result;

        } catch(e) {
            console.log(e);
            return [];
        }
    }

    mapToValidQueryArr(array : string[]) {
        let temp = '['
        for(let i = 0; i < array.length; i++){
            if(i === array.length - 1){
                temp += `\"${array[i]}\"`;
            } else {
                temp += `\"${array[i]}\",`;
            }
        }
        
        temp += ']';

        return temp;
    }

    //await this.requestService.getReq(propertiesUrl + `?query={"publisherId": "${this.authManager.getAuth().id}"}`, true).toPromise();
    async getCommentsById(commentIds : string[]) {
        try {
            
            if(commentIds.length < 1){
                commentIds = ["5a2ef6d2970ffa09c880c4ee", "5a2efab2e0f4037c9eb884c0"];
            }

            // let temp = '['
            // for(let i = 0; i < commentIds.length; i++){
            //     if(i === commentIds.length - 1){
            //         temp += `\"${commentIds[i]}\"`;
            //     } else {
            //         temp += `\"${commentIds[i]}\",`;
            //     }
            // }
            // temp += ']';

            let temp = this.mapToValidQueryArr(commentIds);

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
            
            return result;
        } catch (e) {
            console.log('----------greshka-------------');
            console.log(e);
            
            return [];
        } 
    }

    addUserId(userId) {
        
        let allUsers = {
            userId : userId
        };

        //console.log('before send add userid');
        this.requestService.postReq(addUserIdUrl, allUsers).subscribe(res => {
           // console.log('res from add userid');
            //console.log(res);
        });
    }

    getUserIds(callback){
        this.requestService.getReq(addUserIdUrl, true)
            .subscribe(res => {
                callback(res);
            },
            err => {
                callback(null, err);
            })
    }

    updateUser(user, callback){

        let url = userUrl + user['_id'];

        this.requestService.put(url , user)
        .subscribe(res => {
            callback(res);
        },
        err => {
            callback(null, err);
        })
    }
}