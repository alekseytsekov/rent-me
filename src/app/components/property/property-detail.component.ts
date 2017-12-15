import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { PropertyService } from './property.service';
import { CommonService } from '../../core/common.service';

import { AuthManager } from '../../utils/auth.manager';

import observer from './../../utils/observer';
import actions from './../../utils/actionName';

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
    
    public propertyId : string;
    public property : PropertyDto;
    public likesDislikes : Map<string,boolean>;

    constructor(
        public propertyService : PropertyService,
        public route : ActivatedRoute,
        public router : Router,
        public commonService : CommonService,
        public authManager : AuthManager
        //private property : PropertyDto
    ) {
        this.propertyId = '';
        this.likesDislikes = new Map();

        this.getPropertyCallBack = this.getPropertyCallBack.bind(this);
        this.isRentedCallback = this.isRentedCallback.bind(true);
        this.updateProperty = this.updateProperty.bind(this);
        this.updatePropertyCallback = this.updatePropertyCallback.bind(this);
        this.updateLike = this.updateLike.bind(this);
        this.updateDislike = this.updateDislike.bind(this);
        this.update = this.update.bind(this);
        this.updateCallback = this.updateCallback.bind(this);
        this.updateVote = this.updateVote.bind(this);
        //this.getActualPropState = this.getActualPropState.bind(this);
        //this.removeDislike = this.removeDislike.bind(this);
        //this.removeLike = this.removeLike.bind(this);
    }

    ngOnInit() {
        this.propertyId = this.route.snapshot.params['propertyId'];
        this.property = new PropertyDto();
        this.getProperty(this.propertyId);

        observer.addFunc(actions.UPDATEE_PROPERTY, this.update);
        observer.addFunc(actions.UPDATE_PROPERTY_VOTES, this.updateVote);
    }

    getProperty(propertyId) {
        this.propertyService.getPropertyById(propertyId, this.getPropertyCallBack);
    }

    rentMe(){
        this.propertyService.getPropertyById(this.propertyId, this.isRentedCallback);

        observer.addFunc(actions.UPDATE_RENT_PROPERTY, this.updateProperty);
    }

    isRentedCallback(res, err){
        if(err){
            console.log(err);
            observer.executeFunc(actions.SHOW_ERROR, 'Internal server error! Please try again later!', true );
            return;
        }


        if(res.isRentedOut){
            observer.executeFunc(actions.SHOW_INFO, 'Property is rented out!', true );
            return;
        }
        
        res.isRentedOut = true;

        observer.executeFunc(actions.UPDATE_RENT_PROPERTY, res);
    }

    updateProperty(property) {
        this.propertyService.updateProperty(property, this.updatePropertyCallback);
    }

    updatePropertyCallback(res, err) {
        
        if(err){
            console.log(err);
            observer.executeFunc(actions.SHOW_ERROR, 'Error! Something happened!', true );
            return;
        }

        observer.executeFunc(actions.SHOW_SUCCESS, 'Successfully rented this property!', true );

        this.property.isRentedOut = true;
        //this.router.navigate([`/property/${this.propertyId}`]);
    }

    async getPropertyCallBack(property, err) {

        if(err){
            //this.router.navigate(['/error?message=badrequest']);
            observer.executeFunc(actions.SHOW_ERROR, "Error! Something happened!");
            console.error(err);
            return;
        }

        this.property = property as PropertyDto;

        let typeMap = await this.getTypes();
        let roomMap = await this.getRooms();

        const userMap = new Map();
        let commentMap = new Map();
        const commentIds = [];
        const imageMap = new Map();

        this.processLikeDislike();

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

    processLikeDislike() {
        this.property.likeCount = this.property.likes.length;
        this.property.dislikeCount = this.property.dislikes.length;

        this.property.likes.forEach(x => {
            if(!this.likesDislikes.has(x)){
                this.likesDislikes.set(x, true);
            }
        });

        this.property.dislikes.forEach(x => {
            if(!this.likesDislikes.has(x)){
                this.likesDislikes.set(x, false);
            }
        });
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

    like() {
        const userId = this.authManager.getAuth().id;

        let isSameVote = false;
        
        if(this.likesDislikes.has(userId)){
            isSameVote = this.likesDislikes.get(userId);
        }

        if(!isSameVote) {
           // console.log('go go like!');
            this.likesDislikes.set(userId, true);
            this.propertyService.getPropertyById(this.propertyId, this.updateLike);
        }
    }

    dislike() {

        const userId = this.authManager.getAuth().id;

        let isSameVote = false;
        
        if(this.likesDislikes.has(userId)){
            isSameVote = this.likesDislikes.get(userId);
        }

        if(isSameVote) {
            //console.log('go dislike!');
            this.likesDislikes.set(userId, false);
            this.propertyService.getPropertyById(this.propertyId, this.updateDislike);
        }
    }

    updateLike(res, err){
        
        if(err) {
            observer.executeFunc(actions.SHOW_ERROR, 'Cannot process vote!');
            console.log(err);
            return;
        }

        const userId = this.authManager.getAuth().id;
        let temp = [];
        
        for(let i = 0; i < res.dislikes.length; i++){
            if(res.dislikes[i] !== userId){
                temp.push(res.dislikes[i]);
            }
        }

        res.dislikes = temp;

        temp = [];

        for(let i = 0; i < res.likes.length; i++){
            if(res.likes[i] !== userId){
                temp.push(res.likes[i]);
            }
        }
        
        res.likes = temp;
        res.likes.push(userId);

        observer.executeFunc(actions.UPDATEE_PROPERTY, res);
        observer.executeFunc(actions.UPDATE_PROPERTY_VOTES, res);
    }

    updateDislike(res, err){

        if(err) {
            observer.executeFunc(actions.SHOW_ERROR, 'Cannot process vote!');
            console.log(err);
            return;
        }

        const userId = this.authManager.getAuth().id;
        
        let temp = [];

        for(let i = 0; i < res.likes.length; i++){

            if(res.likes[i] !== userId){
                temp.push(res.likes[i]);
            }
        }

        res.likes = temp;

        temp = [];

        for(let i = 0; i < res.dislikes.length; i++){
            
            if(res.dislikes[i] !== userId){
                temp.push(res.dislikes[i]);
            }
        }

        res.dislikes = temp;
        res.dislikes.push(userId);

        observer.executeFunc(actions.UPDATEE_PROPERTY, res);
        observer.executeFunc(actions.UPDATE_PROPERTY_VOTES, res);
    }

    update(res){
        this.propertyService.updateProperty(res, this.updateCallback);
    }

    updateVote(res){
        this.property.likeCount = res.likes.length;
        this.property.dislikeCount = res.dislikes.length;
    }

    updateCallback(res, err){
        if(err){
            console.log(err);
            observer.executeFunc(actions.SHOW_ERROR, 'Cannot process update!');
            return;
        }
    }
}