import { User } from './../auth/user.model';
import { Property } from './../property/property.model';
import { Injectable } from '@angular/core';

@Injectable()
export class Comment {
    public id : string;
    public userId : string;
    public author : User;
    public propertyId : string;
    public property : Property;
    public comment : string;
}