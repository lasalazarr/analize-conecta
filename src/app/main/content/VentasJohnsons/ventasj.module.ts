// Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
// This Module's Components
import { VentasJohnsonComponent } from './ventasj.component';
import { FusionChartsModule } from "angular-fusioncharts";
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';

import { CdkTableModule } from '@angular/cdk/table';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";
import { ChartType } from 'ag-grid-community';

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

const routes: Routes = [
    {
        path: 'ventasj',
        component: VentasJohnsonComponent
//       , canActivate:[AdminGuard]
    }
];
// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        BrowserModule, FusionChartsModule,
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
        CdkTableModule

    ],
    declarations: [
        VentasJohnsonComponent,
    ],
    exports: [
        VentasJohnsonComponent,
    ]

})
export class VentasJohnsonModule {

}
