// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// This Module's Components
import { RecepcionVposComponent } from './recepcionvpos.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FuseConfirmDialogModule } from '@fuse/components';
import { DigitOnlyModule } from '@uiowa/digit-only'; //para textbox solo numeros
import { MatStepperModule, MatIconModule, MatDatepickerModule,  MatProgressSpinnerModule, MatCheckboxModule, MatFormFieldModule,MatInputModule, MatNativeDateModule, MatDialogModule,MatButtonModule,MatSelectModule, MatAutocompleteModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
    {
        path: 'recepcionvpos',
        component: RecepcionVposComponent
//       , canActivate:[AdminGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FormsModule,ReactiveFormsModule,
        MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,  
        MatSelectModule,
        MatDialogModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatIconModule,
        FuseSharedModule,
        TextMaskModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatProgressSpinnerModule,
        FuseConfirmDialogModule,
        DigitOnlyModule,
        BrowserModule,
        HttpClientModule,
        MatToolbarModule
    
       // BrowserModule,
    ],
    declarations: [
        RecepcionVposComponent
    ],
    exports: [
        RecepcionVposComponent
    ], 
})
export class RecepcionVposModule {


}
