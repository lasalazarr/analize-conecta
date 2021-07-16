
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FuseConfirmDialogModule } from '@fuse/components';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { MatTabsModule } from '@angular/material/tabs';
import { CambiarClaveComponent } from '../AutenticationComponents/cambiar-clave/cambiar-clave.component';
import { CambioContrasenaComponent } from './cambio-contrasena.component';


export const route: Routes = [
    {
        path: "", component: CambioContrasenaComponent, pathMatch: "full"
    }

]

@NgModule({
    declarations: [CambioContrasenaComponent],
    imports: [
        RouterModule.forChild(route),
        CommonModule,
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
        DigitOnlyModule,
        MatTabsModule

    ]
})
export class CambioContrasenaModule{ }
