// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ReportesComponent } from './reportes.component';

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';

import { CdkTableModule } from '@angular/cdk/table';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReporteCarteraGComponent } from './ReporteCarteraG/reportecarterag.component';
import { AgGridModule } from 'ag-grid-angular';
import { ReporteCarteraCoorComponent } from './ReporteCarteraCoor/reportecarteracoor.component';
import { RenderCarteraCoorComponent } from './ReporteCarteraCoor/render-cartera-coor/render-cartera-coor.component';
import { Render2CarteraCoorComponent } from './ReporteCarteraCoor/render2-cartera-coor/render2-cartera-coor.component';


const routes: Routes = [
    {
        path: 'reportes',
        component: ReportesComponent
//       , canActivate:[AdminGuard]
    },{
        path: 'reportecarterag',
        component: ReporteCarteraGComponent
//       , canActivate:[AdminGuard]
    },{
        path: 'reportecarteracoor',
        component: ReporteCarteraCoorComponent
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
        AgGridModule.withComponents([RenderCarteraCoorComponent])

    ],
    declarations: [
        ReportesComponent,ReporteCarteraGComponent,ReporteCarteraCoorComponent,RenderCarteraCoorComponent,Render2CarteraCoorComponent
    ],
    exports: [
        ReportesComponent,ReporteCarteraGComponent,ReporteCarteraCoorComponent,RenderCarteraCoorComponent,Render2CarteraCoorComponent
    ], entryComponents: [Render2CarteraCoorComponent]

})
export class ReportesModule {

}
