import { User } from './../auth/user.model';
import { Property } from './../property/property.model';

export class Comment {
    public id : string;
    public authorId : string;
    public author : User;
    public propertyId : string;
    public property : Property;
    public comment : string;
}