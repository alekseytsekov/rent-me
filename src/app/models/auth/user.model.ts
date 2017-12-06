import { Role } from './role.model';
import { Property } from './../property/property.model';

export class User{
    public id : string;
    public email : string;
    public firstName : string;
    public lastName : string;
    public roleId : string;
    public role : Role;
    public canComment : boolean;
    public isBanned : boolean;
    public favoritePropertyIds : string[];
    public favoriteProperties : Property[]; 
}