// Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
// This Module's Components
import { MiCarteraEmpresariaComponent } from './micarteraempresaria.component';

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatBottomSheetModule, MatToolbarModule, MatCardModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';

import { CdkTableModule } from '@angular/cdk/table';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";
import { DigitOnlyModule } from '@uiowa/digit-only'; //para textbox solo numeros
import { FuseConfirmDialogModule } from '@fuse/components';
import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

const routes: Routes = [
    {
        path: 'micarteraempresaria',
        component: MiCarteraEmpresariaComponent
//       , canActivate:[AdminGuard]
    }
];
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
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
        FuseConfirmDialogModule,
        DigitOnlyModule,
        NgxDatatableModule,
        MatToolbarModule,
        MatBottomSheetModule,
        BrowserModule, FusionChartsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        CdkTableModule,
        ScrollingModule,
        MatCardModule,
        MatProgressSpinnerModule,
        CommonModule

    ],
    declarations: [
        MiCarteraEmpresariaComponent,
    ],
    exports: [
        MiCarteraEmpresariaComponent,
    ]

})
export class MiCarteraEmpresariaModule {

}
