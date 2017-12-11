import { Component, OnInit } from '@angular/core';

import { PropertyService } from './property.service';

//import validator from './../../utils/validator';

@Component({
    selector : '',
    templateUrl : './property.component.html',
    styleUrls : ['./property.component.css'],
    providers : [
        PropertyService
    ]
})
export class PropertyComponent implements OnInit{
    
    private properties;
    
    constructor(private propertyService : PropertyService){
        this.properties = [];
    }

    ngOnInit(){
        this.getProperties();
    }

    async getProperties(){
        this.properties = await this.propertyService.getAllProperties();
    }
}