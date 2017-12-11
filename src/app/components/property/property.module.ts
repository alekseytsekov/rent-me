import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import { PropertyService } from './property.service';

// components
import { PropertyFrom } from './property-form.component';
import { PropertyComponent } from './property.component';
import { PropertyOwnComponent } from './property-own.component';
import { PropertyDetailComponent } from './property-detail.component';

//models
//import { PropertyDto } from './../../models/property/propertyDto.model';

@NgModule({
    imports : [ 
        CommonModule,
        FormsModule,
        
     ],
    declarations : [
        // components
        PropertyFrom,
        PropertyComponent,
        PropertyOwnComponent,
        PropertyDetailComponent
    ],
    exports : [
        // components
        PropertyFrom,
        PropertyComponent,
        PropertyOwnComponent,
        PropertyDetailComponent
    ],
    providers : [
        PropertyFrom,
        //PropertyComponent,
        //PropertyOwnComponent
        //PropertyDto
    ]
})
export class PropertyModule {

}