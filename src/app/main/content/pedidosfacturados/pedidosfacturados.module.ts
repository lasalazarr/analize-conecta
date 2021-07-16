// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { pedidosfacturadoscomponent } from './pedidosfacturados.component';

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
import { CambiosModule } from '../cambios/cambios.module';


const routes: Routes = [
    {
        path: 'pedidosfacturados',
        component: pedidosfacturadoscomponent
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
        CambiosModule


    ],
    declarations: [
        pedidosfacturadoscomponent,
    ],
    exports: [
        pedidosfacturadoscomponent,
    ]

})
export class pedidosfacturadosModule {

}
