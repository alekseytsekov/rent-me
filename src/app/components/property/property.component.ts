import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PropertyService } from './property.service';
import { CommonService } from './../../core/common.service';

import { AuthManager } from './../../utils/auth.manager';
import { PropertyType } from './../../models/property/property-type.model';
import { Room } from './../../models/property/room.model';
import { PropertyDto } from './../../models/property/propertyDto.model';
import { User } from '../../models/auth/user.model';
import { Comment } from '../../models/common/comment.model';
import { Image } from './../../models/common/image.model';

//import { forEach } from '@angular/router/src/utils/collection';

//import validator from './../../utils/validator';

@Component({
    selector : '',
    templateUrl : './property.component.html',
    styleUrls : ['./property.component.css'],
    providers : [
        PropertyService,
        //CommonService
    ]
})
export class PropertyComponent implements OnInit{
    
    public properties : PropertyDto[];
    private isAuth : boolean;
    
    constructor(
        public propertyService : PropertyService,
        public commonService : CommonService,
        public router : Router,
        public AuthManager : AuthManager
    ){
        this.properties = [];
        this.isAuth = false;
    }

    ngOnInit(){
        //console.log('here')
        this.isAuth = this.AuthManager.isAuthenticated();
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
        
        this.properties = await this.propertyService.getAllProperties() as PropertyDto[];

        //console.log('here!!')
        //console.log(this.properties);

        this.properties = this.properties.filter(x => !x.isRentedOut);
        
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

        //let images = await this.getImages(imageMap);

        // let comments = await this.commonService.getCommentsById(commentIds) as Comment[];

        // comments.forEach(x => {
        //     if(x.userId !== undefined && x.userId !== null && !userMap.has(x.userId)){
        //         userMap.set(x.userId, null);
        //     }
        // });

        this.getAndSetUsersToMap(userMap);

        // this.properties.forEach(x => {
        //     x.
        // })
    }

    goToDetails(link){
        this.router.navigate([link]);
    }
}