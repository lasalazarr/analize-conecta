// Angular Imports
import { NgModule } from '@angular/core';
import { RecuperarClaveComponent } from './recuperarclave.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatToolbarModule , MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
//import { AdminGuard } from 'app/Guards/AdminGuard';
import { FuseConfirmDialogModule } from '@fuse/components';
import { DigitOnlyModule } from '@uiowa/digit-only'; //para textbox solo numeros


const routes: Routes = [
    {
        path: 'edicionempresaria',
        component: RecuperarClaveComponent,
        //canActivate:[AdminGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),

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
        MatProgressSpinnerModule,
        FuseConfirmDialogModule,
        DigitOnlyModule,
        NgxDatatableModule,
        MatToolbarModule,
        MatBottomSheetModule
    ],
    declarations: [
        RecuperarClaveComponent,
    ],
    exports: [
        RecuperarClaveComponent,
    ]
})
export class RecuperarClaveModule {

}
