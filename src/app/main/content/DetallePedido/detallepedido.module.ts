// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { DetallePedidoComponent } from './detallepedido.component';

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatToolbarModule, MatBottomSheetModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';
import { MatCardModule } from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";

import { BrowserModule } from '@angular/platform-browser';

import { AgGridModule } from 'ag-grid-angular';
import { RenderDeleteComponent } from './render-delete/render-delete.component';
import { FuseContentModule } from '../content.module';
import { RenderDisponibleComponent } from './render-disponible/render-disponible.component';

const routes: Routes = [
    {
        path: 'detallepedido',
        component: DetallePedidoComponent
//       , canActivate:[AdminGuard]
    }
];

@NgModule({
    declarations: [
        DetallePedidoComponent,
        RenderDeleteComponent,
        RenderDisponibleComponent
        
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
        MatCardModule,
        MatBottomSheetModule,
        BrowserModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        CdkTableModule, AgGridModule.withComponents([])
    ],    
    exports: [
        DetallePedidoComponent,
        RenderDeleteComponent,
        RenderDisponibleComponent
    ],entryComponents: [
        RenderDeleteComponent,
        RenderDisponibleComponent
      ],


})
export class DetallePedidoModule {

}
