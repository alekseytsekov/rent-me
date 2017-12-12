import { Image } from './../common/image.model';
import { Injectable } from '@angular/core';

@Injectable()
export class Room {
    public _id : string;
    public name : string;
    public isPrimary : boolean;
    public primaryImage : Image;
    public secondaryImage : Image;
}