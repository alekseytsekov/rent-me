import { Component, OnInit } from '@angular/core';

import { PropertyService } from './property.service';
import { CommonService } from './../../core/common.service';

import { PropertyType } from './../../models/property/property-type.model';
import { Room } from './../../models/property/room.model';
import { PropertyDto } from './../../models/property/propertyDto.model';
import { User } from '../../models/auth/user.model';
import { Comment } from '../../models/common/comment.model';
import { forEach } from '@angular/router/src/utils/collection';

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
    
    private properties : PropertyDto[];
    
    constructor(
        private propertyService : PropertyService,
        private commonService : CommonService
    ){
        this.properties = [];
    }

    ngOnInit(){
        this.getProperties();
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
        
        this.properties = await this.propertyService.getAllProperties() as PropertyDto[];
        
        this.properties.forEach(x => {
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

            x.renterIds.forEach(x => {
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

        })

        // for(let commentKey of commentMap){
        //     let key = commentKey[0];
        // }
        
        // commentMap.forEach((value: any, key: string) => {
        //     console.log(key, value);
        // });

        let comments = await this.commonService.getCommentsById(commentIds) as Comment[];

        //console.log('comments 111');
        //console.log(comments);

        comments.forEach(x => {
            if(x.userId !== undefined && x.userId !== null && !userMap.has(x.userId)){
                userMap.set(x.userId, null);
            }
        });

        let tempUserArr = [];
        userMap.forEach((value: any, key: string) => {
            

            if(key === undefined || key === null || key === 'undefined' || key.length < 1 || key === ''){
                return;
            }

            tempUserArr.push(key);
            
        });

        for(let i = 0; i < tempUserArr.length; i++){

            console.log('key:' + tempUserArr[i]);

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

        console.log(userMap);
        //console.log(this.properties);
    }
}