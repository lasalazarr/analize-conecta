import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeConfigComponent } from './home-config/home-config.component';
import { ListHomecomponent } from './home-config/listhome/listhome.component';
import { EditHomecomponent } from './home-config/edithome/edithome.component';
import { AdminpuntosComponent } from './adminpuntos/adminpuntos.component';
import { AgGridModule } from 'ag-grid-angular';
import { RenderIpdatePuntopComponent } from './adminpuntos/render-update-puntop/render-update-puntop.component';
import { ConceptosComponent } from './adminpuntos/conceptos/conceptos.component';
import { RenderConceptosComponent } from './adminpuntos/conceptos/render-conceptos/render-conceptos.component';
import { PuntosXMontosComponent } from './adminpuntos/puntos-xmontos/puntos-xmontos.component';
import { RenderPuntosMontoComponent } from './adminpuntos/puntos-xmontos/render-puntos-monto/render-puntos-monto.component';
import { RenderPuntosCantidadComponent } from './adminpuntos/puntos-xcantidad/render-puntos-cantidad/render-puntos-cantidad.component';
import { PuntosXCantidadComponent } from './adminpuntos/puntos-xcantidad/puntos-xcantidad.component';
import { PuntosXEstadoComponent } from './adminpuntos/puntos-xestados/puntos-xestado.component';
import { RenderPuntosEstadoComponent } from './adminpuntos/puntos-xestados/render-puntos-estado/render-puntos-estado.component';
import { CarguePuntosComponent } from './adminpuntos/cargue-puntos/cargue-puntos.component';




export const route: Routes = [
    {
        path: "homeconfig", component: ListHomecomponent, pathMatch: "full"
    },{
        path: "adminpuntos", component: AdminpuntosComponent, pathMatch: "full"
    }

]

@NgModule({
    declarations: [PuntosXMontosComponent, ConceptosComponent,  HomeConfigComponent,
        RenderIpdatePuntopComponent,RenderConceptosComponent,RenderPuntosCantidadComponent,
        RenderPuntosMontoComponent, ListHomecomponent,AdminpuntosComponent, EditHomecomponent, 
        AdminpuntosComponent, ConceptosComponent, PuntosXMontosComponent, RenderPuntosMontoComponent,
        PuntosXCantidadComponent,PuntosXEstadoComponent,RenderPuntosEstadoComponent,CarguePuntosComponent],
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
        MatTabsModule,AgGridModule.withComponents([RenderIpdatePuntopComponent,RenderConceptosComponent,
            RenderPuntosMontoComponent])

    ], entryComponents: [EditHomecomponent,RenderIpdatePuntopComponent,RenderConceptosComponent,
        RenderPuntosMontoComponent,RenderPuntosCantidadComponent,RenderPuntosEstadoComponent]
})
export class AdminModule { }
