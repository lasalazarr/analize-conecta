// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';


import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';

import { CdkTableModule } from '@angular/cdk/table';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";
import { FuseSharedModule } from '@fuse/shared.module';
import { ArticulosComponent } from './articulos.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
    imports: [

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
        NgxDatatableModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        CdkTableModule,
        ScrollingModule
        

    ],
    declarations: [
        ArticulosComponent,
    ],
    exports: [
        ArticulosComponent,
    ]

})
export class ArticulosModule {

}
