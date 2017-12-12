import { User } from './../auth/user.model';
import { Comment } from './../common/comment.model';
import { Room } from './room.model';
import { Address } from './../location/address.model';

export class Property{
    
    //public _id : string;

    constructor(
        
        public publisherId : string,
        //public publisher : User,
        public commentIds : string[],
        //public comments : Comment[],
        public roomIds : string[],
        //public rooms : Room[],
        public likes : string[],
        public dislikes : string[],
        public renterIds : string[],
        //public renters : User[],
        public price : number,
        public description : string,
        public name : string,
        public propertyTypeId : string,
        public country : string,
        public city : string,
        public address : string,
        public imageIds : string[],
        public images : string[],
        public isRentedOut : boolean,
        public phone : string
    ){
        //this._id = '';
    }
}