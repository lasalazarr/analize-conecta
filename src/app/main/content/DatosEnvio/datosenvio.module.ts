// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { DatosEnvioComponent } from './datosenvio.component';

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';



import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

const routes: Routes = [
    {
        path: 'datosenvio',
        component: DatosEnvioComponent
//       , canActivate:[AdminGuard]
    }
];

@NgModule({
    declarations: [
        DatosEnvioComponent  
    ],
    imports: [
        RouterModule.forChild(routes),
        MatProgressSpinnerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDialogModule,
        FuseSharedModule,
        TextMaskModule,
        NgxDatatableModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatBottomSheetModule

    ]

})
export class DatosEnvioModule {

}
