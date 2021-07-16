// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ResumenPedidoComponent } from './resumenpedido.component';

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatToolbarModule, MatBottomSheetModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';
import { MatCardModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';

const routes: Routes = [
    {
        path: 'resumenpedido',
        component: ResumenPedidoComponent
        //       , canActivate:[AdminGuard]
    }
];

@NgModule({
    declarations: [
        ResumenPedidoComponent

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
        MatBottomSheetModule,
        MatExpansionModule

    ]

})
export class ResumenPedidoModule {

}
