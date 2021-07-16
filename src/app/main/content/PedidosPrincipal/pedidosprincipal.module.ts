// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { PedidosPrincipalComponent } from './pedidosprincipal.component';
import {BotonPagosComponent} from './boton-pagos/boton-pagos.component'
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';

import { CdkTableModule } from '@angular/cdk/table';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";

import { DigitOnlyModule } from '@uiowa/digit-only'; //para textbox solo numeros

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatBadgeModule } from '@angular/material/badge';
import { ArticulosModule } from '../articulos/articulos.module';
import { PopupcreditoModule } from '../popupcredito/popupcredito.module';
import { PopupcreditoComponent } from '../popupcredito/popupcredito.component';

const routes: Routes = [
    {
        path: 'pedidosprincipal',
        component: PedidosPrincipalComponent
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
        MatBadgeModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        CdkTableModule,


        DigitOnlyModule,

        MatAutocompleteModule,
        MatBottomSheetModule,
        ScrollingModule,
        ArticulosModule,
        PopupcreditoModule

    ],
    declarations: [
        PedidosPrincipalComponent,
        BotonPagosComponent,
    ],
    exports: [
        PedidosPrincipalComponent,
    ], entryComponents: [PopupcreditoComponent]

})
export class PedidosPrincipalModule {

}
