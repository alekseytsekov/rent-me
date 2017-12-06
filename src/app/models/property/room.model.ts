import { Image } from './../common/image.model';

export class Room {
    public id : string;
    public name : string;
    public isPrimary : boolean;
    public primaryImage : Image;
    public secondaryImage : Image;
}