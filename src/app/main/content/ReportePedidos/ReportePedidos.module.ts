// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatCardModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';

import { CdkTableModule } from '@angular/cdk/table';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReportePedidosComponent } from './ReportePedidos.component';
import { DetalleReportePedidos } from './detalle-reporte-pedidos/detalle-reporte-pedidos.component';


const routes: Routes = [
    {
        path: 'ReportePedidos',
        component: ReportePedidosComponent
        //       , canActivate:[AdminGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
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
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        CdkTableModule,
        ScrollingModule,
        MatCardModule,
        NgxChartsModule,
        MatExpansionModule, 
        MatToolbarModule

    ],
    declarations: [
        ReportePedidosComponent,
        DetalleReportePedidos 
    ],
    exports: [
        ReportePedidosComponent,
    ],entryComponents:[
        DetalleReportePedidos
    ]

})
export class ReportePedidosModule {

}
