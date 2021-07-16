// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { MisPedidosAnuladosComponent } from './mispedidosanulados.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
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


const routes: Routes = [
    {
        path: 'mispedidosanulados',
        component: MisPedidosAnuladosComponent
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
        MatCardModule

    ],
    declarations: [
        MisPedidosAnuladosComponent,
    ],
    exports: [
        MisPedidosAnuladosComponent,
    ]

})
export class MisPedidosAnuladosModule {

}
