import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import { PropertyService } from './property.service';

// components
import { PropertyFrom } from './property-form.component';

//models
//import { PropertyDto } from './../../models/property/propertyDto.model';

@NgModule({
    imports : [ 
        CommonModule,
        FormsModule,
        
     ],
    declarations : [
        // components
        PropertyFrom
        
    ],
    exports : [
        // components
        PropertyFrom
    ],
    providers : [
        PropertyFrom
        //PropertyDto
    ]
})
export class PropertyModule {

}