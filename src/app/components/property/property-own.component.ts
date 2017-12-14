import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PropertyService } from './property.service';
import { CommonService } from './../../core/common.service';

import observer from './../../utils/observer';
import actions from './../../utils/actionName';

import { PropertyType } from './../../models/property/property-type.model';
import { Room } from './../../models/property/room.model';
import { PropertyDto } from './../../models/property/propertyDto.model';
import { User } from '../../models/auth/user.model';
import { Comment } from '../../models/common/comment.model';
import { Image } from './../../models/common/image.model';

@Component({
    selector: '',
    templateUrl : './property-own.component.html',
    styleUrls : [ './property-own.component.css' ],
    providers : [
        PropertyService
    ]
})
export class PropertyOwnComponent implements OnInit {

    private properties;

    constructor(
        private propertyService : PropertyService,
        private commonService : CommonService,
        private router : Router
    ){
        this.properties = [];

        this.isRentedCallback = this.isRentedCallback.bind(this);
        this.updateProperty = this.updateProperty.bind(this);
        this.updatePropertyCallback = this.updatePropertyCallback.bind(this);
    }

    ngOnInit() {
        this.getProperties();
    }

    async getImages(imageMap){
        let imagesArr : string[] = [];
        imageMap.forEach((value: any, key: string) => {
            

            if(key === undefined || key === null || key === 'undefined' || key.length < 1 || key === ''){
                return;
            }

            imagesArr.push(key);
            
        });

        let images = await this.commonService.getImages(imagesArr) as Image[];

        return images;
    }

    async getAndSetUsersToMap(userMap) {
        let tempUserArr = [];
        userMap.forEach((value: any, key: string) => {
            

            if(key === undefined || key === null || key === 'undefined' || key.length < 1 || key === ''){
                return;
            }

            tempUserArr.push(key);
            
        });

        // get users, one by one
        for(let i = 0; i < tempUserArr.length; i++){

            //console.log('key:' + tempUserArr[i]);

            let response = await this.commonService.getUserById(tempUserArr[i]);
            
            if(response === []){
                console.log('res is empty arr.')
                return;
            }

            if(response['status'] && response['status'] == '404'){
                console.log('** user not found **');
                continue;
            }

            userMap.set(tempUserArr[i], response);
        }
    }

    async getProperties(){
        
        const types = await this.propertyService.getPropertyTypes() as PropertyType[];
        
        const typesMap = new Map();

        types.forEach(t => {
            //console.log(t)
            typesMap.set(t._id, t);
        });

        const rooms = await this.propertyService.getRoomTypes() as Room[];

        const roomMap = new Map();

        rooms.forEach(r => {
            roomMap.set(r._id, r);
        });

        //console.log('map');
        //console.log(roomMap);
        const userMap = new Map();
        const commentMap = new Map();
        const commentIds : string[] = [];
        const imageMap = new Map();
        
        this.properties = await this.propertyService.getAllPropertiesByUser() as PropertyDto[];
        //this.properties = await this.propertyService.getAllProperties() as PropertyDto[];

        this.properties.forEach(x => {

            x.detailsLink = '/property/' + x._id;

            x.rooms = [];
            x.roomIds.forEach(r => {
                x.rooms.push(roomMap.get(r));
            });

            x.propertyType = typesMap.get(x.propertyTypeId);

            if(!userMap.has(x.publisherId)){
                userMap.set(x.publisherId, null);
            }

            x.likes.forEach(x => {
                if(!userMap.has(x)){
                    userMap.set(x, null);
                }
            });

            x.dislikes.forEach(x => {
                if(!userMap.has(x)){
                    userMap.set(x, null);
                }
            });

            x.commentIds.forEach(x => {
                if(!commentMap.has(x)){
                    commentMap.set(x, null);
                    commentIds.push(x);
                }
            });

            x.roomIds.forEach(x => {
                if(!roomMap.has(x)){
                    roomMap.set(x, null);
                }
            })

        })

        // commentMap.forEach((value: any, key: string) => {
        //     console.log(key, value);
        // });

        // let comments = await this.commonService.getCommentsById(commentIds) as Comment[];

        // comments.forEach(x => {
        //     if(x.userId !== undefined && x.userId !== null && !userMap.has(x.userId)){
        //         userMap.set(x.userId, null);
        //     }
        // });

        this.getAndSetUsersToMap(userMap);
    }

    goToDetails(link){
        this.router.navigate([link]);
    }

    rentMe(propertyId){

        this.propertyService.getPropertyById(propertyId, this.isRentedCallback);

        observer.addFunc(actions.UPDATE_RENT_PROPERTY, this.updateProperty);
    }

    isRentedCallback(res, err){
        if(err){
            console.log(err);
            observer.executeFunc(actions.SHOW_ERROR, 'Internal server error! Please try again later!', true );
            return;
        }


        if(res.isRentedOut){
            res.isRentedOut = false;
        } else {

            res.isRentedOut = true;
        }
        
        observer.executeFunc(actions.UPDATE_RENT_PROPERTY, res);
    }

    updateProperty(property) {
        this.propertyService.updateProperty(property, this.updatePropertyCallback);
    }

    updatePropertyCallback(res, err) {
        
        if(err){
            console.log(err);
            observer.executeFunc(actions.SHOW_ERROR, 'Internal server error!', true );
            return;
        }

        if(res.isRentedOut){
            observer.executeFunc(actions.SHOW_SUCCESS, 'Successfully deactivated this property!', true );

            this.properties.forEach(x => {
                if(x._id === res._id){
                    x.isRentedOut = true;
                }
            });

        } else {

            observer.executeFunc(actions.SHOW_SUCCESS, 'Successfully activated this property!', true );

            this.properties.forEach(x => {
                if(x._id === res._id){
                    x.isRentedOut = false;
                }
            })

        }

        //this.router.navigate([`/property/${this.propertyId}`]);
    }
}