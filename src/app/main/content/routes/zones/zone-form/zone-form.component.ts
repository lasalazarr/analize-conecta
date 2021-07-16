import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { DeliveryService } from 'app/ApiServices/delivery.service';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { ModalPopUpComponent } from 'app/main/content/ModalPopUp/modalpopup.component';
import { DeliveryZone } from 'app/Models/DeliveryZoneModel';
import { E_Canton } from 'app/Models/E_Canton';
import { E_Provincia } from 'app/Models/E_Provincia';
import { Observable, Subscription } from 'rxjs';
import { SectorsDialogComponent } from '../sectors-dialog/sectors-dialog.component';

@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss']
})
export class ZoneFormComponent implements OnInit {

  @Input() zone:DeliveryZone;
  @Output() outputZone:EventEmitter<DeliveryZone> =new EventEmitter<DeliveryZone>();
  provincias: E_Provincia[] = [];
  canton: E_Canton[] = [];
  
  private eventsSubscription: Subscription;
  @Input() events: Observable<DeliveryZone>;

  constructor(private dialog: MatDialog,
              private parameterSrv: ParameterService,
              private deliverySrv:DeliveryService,
              private communicationSrv: CommunicationService) { }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((zone) => this.onProvinceChange(zone));
    this.parameterSrv.listarProvincia().toPromise().then(provinces => {
      this.provincias = provinces;
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  onProvinceChange(zone:DeliveryZone) {
    let selectedZone:DeliveryZone;

    if (zone != undefined && zone != null)
      selectedZone = zone;
    else
      selectedZone = this.zone;

    if (selectedZone.ProvinciaId != 0 && selectedZone.ProvinciaId != null && selectedZone.ProvinciaId != undefined) 
    {
      let selectedProvince = this.provincias.find(x => x.CodEstado == selectedZone.ProvinciaId.toString());
      this.parameterSrv.listarCanton(selectedProvince).toPromise().then(list => {
        this.canton = list;
      });
    }
  }

  openSectorsDialog() {
    if (this.zone.Sectores == undefined)
      this.zone.Sectores = [];

    this.dialog.open(SectorsDialogComponent, {
      panelClass: 'custom-dialog-container',
      hasBackdrop: true,
      data: this.zone.Sectores,
      disableClose: true
    }).afterClosed().subscribe(sectors => {
      if (sectors != undefined)
        this.zone.Sectores = sectors;
    });
  }

  save() {
    this.communicationSrv.showLoader.next(true);
    if (this.zone.Id != undefined && this.zone.Id != null && this.zone.Id != 0) {
      this.zone.Sectores.forEach(sector => {
        if (sector.ZonaId == 0)
          sector.ZonaId = this.zone.Id;
      });

      this.deliverySrv.updateZone(this.zone).then(response => {
        this.communicationSrv.showLoader.next(false);
        let msg: string = '';
        if (response)
          msg = 'Zona actualizada correctamente';
        else
          msg = 'Ocurrió un problema actualizando la zona';

        this.dialog.open(ModalPopUpComponent, {
          panelClass: "dialogInfocustom",
          width: "450px",
          data: {
            TipoMensaje: "",
            Titulo: "Mensaje",
            Mensaje: msg,
          },
        }).afterClosed().toPromise().then(() => {
          if (response)
            this.outputZone.emit(this.zone);
        });
      });
    } else {
      this.deliverySrv.createZone(this.zone).then(response => {
        this.communicationSrv.showLoader.next(false);
        let msg: string = '';
        if (response != 0)
          msg = 'Zona creada correctamente';
        else
          msg = 'Ocurrió un problema creando la zona';

        this.dialog.open(ModalPopUpComponent, {
          panelClass: "dialogInfocustom",
          width: "450px",
          data: {
            TipoMensaje: "",
            Titulo: "Mensaje",
            Mensaje: msg,
          },
        }).afterClosed().toPromise().then(() => {
          if (response != 0)
          {
            this.zone.Id = response;
            this.outputZone.emit(this.zone);
          }
        });
      });
    }
  }

}
