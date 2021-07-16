import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {  MatDialogModule, MatToolbarModule, MatButtonModule, MatCheckboxModule, MatStepperModule, MatSelectModule,  MatIconModule,MatFormFieldModule, MatInputModule, MatSpinner, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FuseLoginComponent } from './login.component';

const routes = [
    {
        path: 'login',
        component: FuseLoginComponent
    },
    {
        path: 'login/:newRegister',
        component: FuseLoginComponent
    }
];

@NgModule({
    declarations: [
        FuseLoginComponent
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
        MatProgressSpinnerModule
    ]
})
export class LoginModule {
}
