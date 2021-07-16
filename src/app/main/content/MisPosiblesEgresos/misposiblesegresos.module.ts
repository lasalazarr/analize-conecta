// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { MisPosiblesEgresosComponent } from './misposiblesegresos.component';

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';

import { CdkTableModule } from '@angular/cdk/table';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";
import { ScrollingModule } from '@angular/cdk/scrolling';

const routes: Routes = [
    {
        path: 'misposiblesegresos',
        component: MisPosiblesEgresosComponent
//       , canActivate:[AdminGuard]
    }
];

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
        ScrollingModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        CdkTableModule

    ],
    declarations: [
        MisPosiblesEgresosComponent,
    ],
    exports: [
        MisPosiblesEgresosComponent,
    ]

})
export class MisPosiblesEgresosModule {

}
