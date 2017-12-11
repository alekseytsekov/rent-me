import { Component, OnInit } from '@angular/core';

import { PropertyService } from './property.service';

@Component({
    selector: '',
    templateUrl : './property-own.component.html',
    styleUrls : [ './property-own.component.css' ],
    providers : [
        PropertyService
    ]
})
export class PropertyOwnComponent implements OnInit {

    private properties;

    constructor(private propertyService : PropertyService){
        this.properties = [];
    }

    ngOnInit() {
        this.getProperties();
    }

    async getProperties (){
        this.properties = await this.propertyService.getAllPropertiesByUser();
        //console.log(this.properties);
    }
}