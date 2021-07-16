// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoaderImageComponent } from './loader-image.component';
import { CommonModule } from '@angular/common';
//import { AdminGuard } from 'app/Guards/AdminGuard';

@NgModule({
  declarations: [LoaderImageComponent],
  imports: [
    CommonModule,
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
    MatToolbarModule

  ],
  exports: [LoaderImageComponent]

})
export class LoaderImageModule {

}
