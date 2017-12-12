import { Injectable } from "@angular/core";


@Injectable()
export class PropertyType {
    public _id : string;
    public type : string;

    constructor(){
        this._id = '',
        this.type = ''
    }
}