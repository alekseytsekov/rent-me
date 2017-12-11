import { Injectable } from '@angular/core'

import { Property } from './../property/property.model';
import { PropertyType } from './../property/property-type.model';
import { User } from './../../models/auth/user.model';
import { Room } from './../../models/property/room.model';

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
    public dislikes : string[];
    public renterIds : string[];
    public renters : User[];
    public price : number;
    public name : string;
    public description : string;
    public selectRoom : string;
    public country : string;
    public city : string;
    public address : string;
}