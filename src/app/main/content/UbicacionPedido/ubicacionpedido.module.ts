// Angular Imports
import { NgModule } from '@angular/core';
import { UbicacionPedidoComponent } from './ubicacionpedido.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'; // agm-direction
const routes: Routes = [
    {
        path: 'ubicacionpedido',
        component: UbicacionPedidoComponent
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
        AgmCoreModule,
        AgmDirectionModule,
        MatToolbarModule,
        
    ],
    declarations: [
        UbicacionPedidoComponent,
    ],
    exports: [
        UbicacionPedidoComponent,
    ]
})
export class UbicacionPedidoModule {

}
