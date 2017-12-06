import { User } from './../auth/user.model';
import { Comment } from './../common/comment.model';
import { Room } from './room.model';
import { Address } from './../location/address.model';

export class Property{
    public id : string;
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
}