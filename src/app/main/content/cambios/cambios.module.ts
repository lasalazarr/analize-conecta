// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'; // agm-direction
import { CambiosComponent } from './cambios.component';
import { FuseConfirmDialogModule } from '@fuse/components';
import { PoliticasComponent } from './politicas/politicas.component';

@NgModule({
    imports: [


        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDialogModule,
        FuseSharedModule,
        TextMaskModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        AgmCoreModule,
        AgmDirectionModule,
        MatToolbarModule,
        FuseConfirmDialogModule
    ],
    declarations: [
        CambiosComponent, PoliticasComponent
    ],
    exports: [
        CambiosComponent,
    ], entryComponents: [CambiosComponent, PoliticasComponent]
})
export class CambiosModule {

}
