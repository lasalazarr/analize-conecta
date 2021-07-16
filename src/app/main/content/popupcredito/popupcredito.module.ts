import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupcreditoComponent } from './popupcredito.component';
import { MatToolbarModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [PopupcreditoComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatToolbarModule,
        ReactiveFormsModule,
        MatFormFieldModule, 
        MatInputModule
    ], entryComponents: [PopupcreditoComponent]
})
export class PopupcreditoModule { }
