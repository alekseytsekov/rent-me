import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonService } from './common.service';

import { AdminComponent } from './../components/admin/admin.component';

@NgModule({
    imports : [ 
        CommonModule,
        //CommonService
     ],
    declarations : [
        //components
        AdminComponent
    ],
    exports : [
        //CommonService
    ],
    providers : [
        CommonService
    ]
})
export class AppCommonModule {}