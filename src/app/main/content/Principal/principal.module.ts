// Angular Imports
import { NgModule } from '@angular/core';
import { PrincipalComponent } from './principal.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderImageModule } from 'app/Tools/loadingImages/loader-image/loader-image.module';

const routes: Routes = [
    {
        path: 'principal',
        component: PrincipalComponent
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
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        LoaderImageModule,
    ],
    declarations: [
        PrincipalComponent,
    ],
    exports: [
        PrincipalComponent,
    ]
})
export class PrincipalModule {

}
