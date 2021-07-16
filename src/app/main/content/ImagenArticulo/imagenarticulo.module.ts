// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ImagenArticuloComponent } from './imagenarticulo.component';

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';
import { MatCardModule } from '@angular/material';

//import { FuseWidgetDocsComponent } from '../widget/widget.component';

//import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {MatDividerModule} from '@angular/material/divider';


const routes: Routes = [
    {
        path: 'imagenarticulo',
        component: ImagenArticuloComponent
//       , canActivate:[AdminGuard]
    }
  
];

@NgModule({
    declarations: [
        ImagenArticuloComponent,
      
        
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
        MatCardModule,
        FuseWidgetModule,
        MatButtonToggleModule,
        MatDividerModule
    ]

})
export class ImagenArticuloModule {

}
