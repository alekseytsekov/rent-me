import { Injectable } from '@angular/core'

import { Property } from './../property/property.model';
import { PropertyType } from './../property/property-type.model';
import { User } from './../../models/auth/user.model';
import { Room } from './../../models/property/room.model';
import { Comment } from './../common/comment.model';

@Injectable()
export class PropertyDto{
    public id : string;
    public _id : string;
    public propertyTypeId : string;
    public propertyType : PropertyType;
    public publisherId : string;
    public publisher : User;
    public commentIds : string[];
    public comments : Comment[];
    public roomIds : string[];
    public rooms : Room[];
    public likes : string[];
    public likeCount : number;
    public dislikes : string[];
    public dislikeCount : number;
    public renterIds : string[];
    public renters : User[];
    public price : number;
    public name : string;
    public description : string;
    public selectRoom : string;
    public country : string;
    public city : string;
    public address : string;
    public detailsLink : string;
    public isRentedOut : boolean;
    public phone : string;
    public images : string[];

    constructor(){
        this.id  = '',
        this._id = '',
        this.propertyTypeId = '',
        this.propertyType = new PropertyType(),
        this.publisherId = '',
        this.publisher = new User(),
        this.commentIds = [],
        this.comments = [],
        this.roomIds = [],
        this.rooms = [],
        this.likes = [],
        this.likeCount = 0,
        this.dislikes = [],
        this.dislikeCount = 0,
        this.renterIds = [],
        this.renters = [],
        this.price = 0,
        this.name = '',
        this.description = '',
        this.selectRoom = '',
        this.country = '',
        this.city = '',
        this.address = '',
        this.detailsLink = '',
        this.isRentedOut = false,
        this.phone = '',
        this.images=[]
    }
}