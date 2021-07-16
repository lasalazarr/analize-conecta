// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { micarteralidercomponent } from './micarteralider.component';

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatBottomSheetModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';

import { CdkTableModule } from '@angular/cdk/table';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";
import { FuseConfirmDialogModule } from '@fuse/components';


const routes: Routes = [
    {
        path: 'micarteralider',
        component: micarteralidercomponent
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
        MatBottomSheetModule,
        FuseConfirmDialogModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        NgxDatatableModule,
        MatSortModule,
        MatTableModule,
        CdkTableModule

    ],
    declarations: [
        micarteralidercomponent,
    ],
    exports: [
        micarteralidercomponent,
    ]

})
export class micarteraliderModule {

}
