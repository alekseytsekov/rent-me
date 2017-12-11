import { Injectable } from '@angular/core';

import config from './../../config/config';
import { RequesterService } from './../../core/requester.service';

import { PropertyType } from './../../models/property/property-type.model';
import { AuthManager } from '../../utils/auth.manager';


const baseCollectionUrl = `/appdata/${config.appKey}`;
const propertyTypeUrl = `${baseCollectionUrl}/propertyType`;
const roomTypeUrl = `${baseCollectionUrl}/rooms`;
const addPropertyUrl = `${baseCollectionUrl}/property`;
const propertiesUrl = addPropertyUrl;

@Injectable()
export class PropertyService{
    constructor(
        private requestService : RequesterService,
        private authManager : AuthManager
    ){

    }

    async getPropertyTypes ()  { // : PropertyType[]
        
        try{
            let res = await this.requestService.getReq(propertyTypeUrl, true)
            .toPromise();

            //console.log(res);
            if(res['status'] && res['status'] === 401){
                return [];
            }

            return res;
        } catch(e) {
            console.log(e);
            return [];
        }
    }

    async getRoomTypes()  { // : PropertyType[]
        
        try{
            let res = await this.requestService.getReq(roomTypeUrl, true)
            .toPromise();

            //console.log(res);
            if(res['status'] && res['status'] === 401){
                return [];
            }

            return res;
        } catch(e) {
            console.log(e);
            return [];
        }
    }

    async getAllPropertiesByUser() {
        try {

            let result = await this.requestService.getReq(propertiesUrl + `?query={"publisherId": "${this.authManager.getAuth().id}"}`, true).toPromise();

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

    async getAllProperties(){
        try {

            let result = await this.requestService.getReq(propertiesUrl, true).toPromise();

            if(result['status'] && result['status'] === 401){
                return [];
            }
            //console.log(1);
           // console.log(result);
            return result;

        } catch(e) {
            console.log(e);
            return [];
        }
    }

    addProperty(property, callback) {
        this.requestService.postReq(addPropertyUrl, property)
            .subscribe(res => {
                console.log(res);
                callback(res);
            },
            err => {
                callback(null, err);
            });
    }
}