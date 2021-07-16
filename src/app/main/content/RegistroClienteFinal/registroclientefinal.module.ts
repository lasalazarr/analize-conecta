// Angular Imports
import { NgModule } from '@angular/core';
import { RegistroClienteFinalComponent } from './registroclientefinal.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule,MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
//import { AdminGuard } from 'app/Guards/AdminGuard';
import { FuseConfirmDialogModule } from '@fuse/components';
import { DigitOnlyModule } from '@uiowa/digit-only'; //para textbox solo numeros


const routes: Routes = [
    {
        path: 'registroclientefinal',
        component: RegistroClienteFinalComponent,
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
        DigitOnlyModule
    ],
    declarations: [
        RegistroClienteFinalComponent,
    ],
    exports: [
        RegistroClienteFinalComponent,
    ]
})
export class RegistroClienteFinalModule {

}
