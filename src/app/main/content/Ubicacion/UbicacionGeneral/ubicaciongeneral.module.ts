// Angular Imports
import { NgModule } from "@angular/core";
import { UbicacionGeneralComponent } from "./ubicaciongeneral.component";
import { RouterModule, Routes } from "@angular/router";
import {
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
} from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";
import { TextMaskModule } from "angular2-text-mask";

import { AgmCoreModule } from "@agm/core";
import { AgmDirectionModule } from "agm-direction"; // agm-direction
import { SeleccionDireccionComponent } from "../seleccion-direccion/seleccion-direccion.component";
import { InfoUpdateDataComponent } from "../info-update-data/info-update-data.component";
import { ConfirmAdressModule } from "@fuse/components/confirm-adress/confirm-adress.module";
import { ConfirmAdressComponent } from "@fuse/components/confirm-adress/confirm-adress.component";
const routes: Routes = [
    {
        path: "ubicaciongeneral",
        component: UbicacionGeneralComponent,
    },
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
        ConfirmAdressModule,
    ],
    declarations: [
        UbicacionGeneralComponent,
        SeleccionDireccionComponent,
        InfoUpdateDataComponent,
    ],
    exports: [
        UbicacionGeneralComponent,
        SeleccionDireccionComponent,
        InfoUpdateDataComponent,
    ],
    entryComponents: [
        SeleccionDireccionComponent,
        InfoUpdateDataComponent,
        ConfirmAdressComponent,
    ],
})
export class UbicacionGeneralModule {}
