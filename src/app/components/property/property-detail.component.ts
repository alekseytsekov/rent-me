import { Component, OnInit } from '@angular/core';

import { PropertyService } from './property.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector : '',
    templateUrl : './property-detail.component.html',
    styleUrls : [ './property-detail.component.css' ],
    providers : [
        PropertyService
    ]
})
export class PropertyDetailComponent implements OnInit {
    
    private propertyId : string;

    constructor(
        private propertyService : PropertyService,
        private route : ActivatedRoute
    ) {
        this.propertyId = '';
    }

    ngOnInit() {
        this.propertyId = this.route.snapshot.params['propertyId'];
    }
}