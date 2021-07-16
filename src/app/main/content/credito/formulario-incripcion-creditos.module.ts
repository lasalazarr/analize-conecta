import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormularioIncripcionCreditosComponent } from './formulario-incripcion-creditos/formulario-incripcion-creditos.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatToolbarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FuseConfirmDialogModule } from '@fuse/components';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { FormularioContratoComponent } from './formulario-contrato/formulario-contrato.component';
import { FormularioContainerComponent } from './formulario-container/formulario-container.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SeleccionDireccionComponent } from '../Ubicacion/seleccion-direccion/seleccion-direccion.component';
import { UbicacionGeneralModule } from '../Ubicacion/UbicacionGeneral/ubicaciongeneral.module';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { CreditoListComponent } from './credito-list/credito-list.component';
import { DetalleSolicitudCredito } from './credito-list/detalle-solicitud-credito/detalle-solicitud-credito.component';
import { EditCreditDocumentComponent } from './credito-list/edit-credit-document/edit-credit-document.component';
import { SolicitudFisicaComponent } from './credito-list/solicitud-fisica/solicitud-fisica.component';

export const route: Routes = [
    {
        path: "", component: FormularioContainerComponent, pathMatch: "full"
    },
    {
        path: "ListCredit", component: CreditoListComponent, pathMatch: "full"
    }


]

@NgModule({
    declarations: [FormularioIncripcionCreditosComponent,
        FormularioContratoComponent,
        FormularioContainerComponent,
        CreditoListComponent,
        DetalleSolicitudCredito,
        EditCreditDocumentComponent,
        SolicitudFisicaComponent],
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
        MatTabsModule,
        UbicacionGeneralModule,
        FuseConfirmDialogModule,
        MatToolbarModule

    ], entryComponents: [DetalleSolicitudCredito, EditCreditDocumentComponent, SolicitudFisicaComponent]
    , providers: [DatePipe,
    
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }]
})
export class FormularioIncripcionCreditosModule { }
