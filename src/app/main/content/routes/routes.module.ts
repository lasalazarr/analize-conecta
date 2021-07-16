import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRouteComponent } from './new-route/new-route.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatListModule, MatToolbarModule, MatCardModule, MatCheckboxModule, MatDividerModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { EditRouteComponent } from './edit-route/edit-route.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryPaymentComponent } from './delivery-payment/delivery-payment.component';
import { MapTraceComponent } from './map-trace/map-trace.component';
import { CameraDialogComponent } from './camera-dialog/camera-dialog.component';
import { ReasonCancelationComponent } from './map-dialog/reason-cancelation/reason-cancelation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { VarConfigComponent } from './var-config/var-config.component';
import { PuntoRefComponent } from './map-dialog/punto-ref/punto-ref.component';
import { ZoneAdminComponent } from './zones/zone-admin/zone-admin.component';
import { ZoneFormComponent } from './zones/zone-form/zone-form.component';
import { SectorsDialogComponent } from './zones/sectors-dialog/sectors-dialog.component';

@NgModule({
  declarations: [NewRouteComponent, MapDialogComponent, EditRouteComponent, DeliveryListComponent, DeliveryPaymentComponent, MapTraceComponent, CameraDialogComponent, ReasonCancelationComponent, VarConfigComponent, PuntoRefComponent, ZoneAdminComponent, ZoneFormComponent, SectorsDialogComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule
  ],
  entryComponents: [MapDialogComponent,DeliveryPaymentComponent,CameraDialogComponent,ReasonCancelationComponent,PuntoRefComponent,SectorsDialogComponent]
})
export class RoutesModule { }
