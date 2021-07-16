import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { SubirCatalogoComponent } from '../subircatalogo/subircatalogo.component';


export const route: Routes = [
    {
        path: "subircatalogo", component: SubirCatalogoComponent, pathMatch: "full"
    }

]

@NgModule({
    declarations: [SubirCatalogoComponent],
    imports: [
        RouterModule.forChild(route),
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
        MatDatepickerModule,
        MatNativeDateModule,
        DigitOnlyModule,
        MatTabsModule,AgGridModule.withComponents([])

    ], entryComponents: [SubirCatalogoComponent]
})
export class SubirCatalogoModule { }
