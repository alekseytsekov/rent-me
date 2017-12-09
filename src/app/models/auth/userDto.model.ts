import { Injectable } from '@angular/core'

import { Role } from './role.model';
import { Property } from './../property/property.model';

@Injectable()
export class UserDto{
    public id : string;
    public email : string;
    public firstName : string;
    public lastName : string;
    public password : string;
    public confirmPassword : string;
    //public roleId : string;
    public role : Role;
    public canComment : boolean;
    public isBanned : boolean;
    //public favoritePropertyIds : string[];
    //public favoriteProperties : Property[]; 
}