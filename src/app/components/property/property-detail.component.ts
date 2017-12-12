import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { PropertyService } from './property.service';
import { CommonService } from '../../core/common.service';

import { Property } from '../../models/property/property.model';
import { PropertyType } from '../../models/property/property-type.model';
import { Room } from '../../models/property/room.model';
import { PropertyDto } from '../../models/property/propertyDto.model';
import { Comment } from './../../models/common/comment.model';

@Component({
    selector : '',
    templateUrl : './property-detail.component.html',
    styleUrls : [ './property-detail.component.css' ],
    providers : [
        PropertyService,
        CommonService,
        PropertyDto
    ]
})
export class PropertyDetailComponent implements OnInit {
    
    private propertyId : string;
    private property : PropertyDto;

    constructor(
        private propertyService : PropertyService,
        private route : ActivatedRoute,
        private router : Router,
        private commonService : CommonService,
        //private property : PropertyDto
    ) {
        this.propertyId = '';

        this.getPropertyCallBack = this.getPropertyCallBack.bind(this);
    }

    ngOnInit() {
        this.propertyId = this.route.snapshot.params['propertyId'];
        this.property = new PropertyDto();
        this.getProperty(this.propertyId);
    }

    getProperty(propertyId) {
        this.propertyService.getPropertyById(propertyId, this.getPropertyCallBack);
    }

    async getPropertyCallBack(property, err) {

        if(err){
            this.router.navigate(['/error?message=badrequest']);
            return;
        }

        this.property = property as PropertyDto;

        let typeMap = await this.getTypes();
        let roomMap = await this.getRooms();

        const userMap = new Map();
        let commentMap = new Map();
        const commentIds = [];
        const imageMap = new Map();

        this.property.rooms = [];

        this.property.roomIds.forEach(r => {
            this.property.rooms.push(roomMap.get(r));
        });

        this.property.rooms = this.property.rooms.sort((a,b) => {
            return a.name.localeCompare( b.name);
        })
        //this.property.rooms = this.property.rooms.sort((a,b) => { return (b.isPrimary === a.isPrimary) ? 0 : a ? -1 : 1;})

        this.property.propertyType = typeMap.get(this.property.propertyTypeId);

        if(!userMap.has(this.property.publisherId)){
            userMap.set(this.property.publisherId, null);
        }

        this.property.likeCount = this.property.likes.length;
        this.property.dislikeCount = this.property.dislikes.length;

        this.property.commentIds.forEach(x => {
            if(!commentMap.has(x)){
                commentMap.set(x, null);
                commentIds.push(x);
            }
        });

        this.property.roomIds.forEach(x => {
            if(!roomMap.has(x)){
                roomMap.set(x, null);
            }
        });

        commentMap = await this.getComments(commentIds);
        
        // this.property.likes.forEach(x => {
        //     if(!userMap.has(x)){
        //         userMap.set(x, null);
        //     }
        // });

        // x.dislikes.forEach(x => {
        //     if(!userMap.has(x)){
        //         userMap.set(x, null);
        //     }
        // });

        // x.renterIds.forEach(x => {
        //     if(!userMap.has(x)){
        //         userMap.set(x, null);
        //     }
        // });
    }

    async getComments(commentIds) {

        let userMap = new Map();

        let comments = await this.commonService.getCommentsById(commentIds) as Comment[];
        
        comments.forEach(x => {
            if(x.userId !== undefined && x.userId !== null && !userMap.has(x.userId)){
                userMap.set(x.userId, null);
            }
        });

        return userMap;
    }

    async getRooms() {
        let rooms = await this.propertyService.getRoomTypes() as Room[];
        
        //rooms = rooms.sort((a,b) => { return (b.isPrimary === a.isPrimary) ? 0 : b ? -1 : 1;});

        const roomMap = new Map();

        rooms.forEach(r => {
            roomMap.set(r._id, r);
        });

        return roomMap;
    }

    async getTypes() {
        const types = await this.propertyService.getPropertyTypes() as PropertyType[];
        
        const typesMap = new Map();

        types.forEach(t => {
            //console.log(t)
            typesMap.set(t._id, t);
        });

        return typesMap;
    }
}