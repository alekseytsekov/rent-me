import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonService } from './common.service';

@NgModule({
    imports : [ 
        CommonModule,
        //CommonService
     ],
    declarations : [
        //components
        //CommonService
    ],
    exports : [
        //CommonService
    ],
    providers : [
        CommonService
    ]
})
export class AppCommonModule {}