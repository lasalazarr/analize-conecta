import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatListOption, MatSelectionList } from '@angular/material';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { DeliveryService } from 'app/ApiServices/delivery.service';
import { DeliveryZone } from 'app/Models/DeliveryZoneModel';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-zone-admin',
  templateUrl: './zone-admin.component.html',
  styleUrls: ['./zone-admin.component.scss']
})
export class ZoneAdminComponent implements OnInit {

  @ViewChild(MatSelectionList, { })
  private selectionList: MatSelectionList;
  zones: DeliveryZone[] = [];
  filteredZones: DeliveryZone[] = [];
  selectedZone:DeliveryZone = new DeliveryZone();
  filter:string = '';
  formEvent: Subject<DeliveryZone> = new Subject<DeliveryZone>();

  constructor(private deliverySrv:DeliveryService,
              private dialog: MatDialog,
              private communicationSrv: CommunicationService) { }

  ngOnInit() {
    this.communicationSrv.showLoader.next(true);
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.deliverySrv.getDeliveryZones().then(data => {
      this.zones = data;
      this.filteredZones = this.zones;
      this.communicationSrv.showLoader.next(false);
    });
  }

  filterZones() {
    this.filteredZones = this.zones;
    if (this.filter != undefined && this.filter != null && this.filter != '')
    {
      this.filteredZones = this.zones.filter(x => {
        return x.Nombre.toLowerCase().includes(this.filter.toLowerCase());
      });
    }
  }

  setZone(zone:DeliveryZone) {
    this.communicationSrv.showLoader.next(true);
    this.deliverySrv.getZoneSectors(zone.Id).then(data => {
      this.communicationSrv.showLoader.next(false);
      zone.Sectores = data;
      let tmpZone = this.zones.find(x => x.Id == zone.Id);
      if (tmpZone == undefined)
        this.zones.push(zone);
      else
        tmpZone.Sectores = data;
    });
  }

  onItemSelect(param:DeliveryZone, list:MatSelectionList) {
    if (list.selectedOptions.selected.length > 0)
      this.selectedZone = param;
    else
      this.selectedZone = new DeliveryZone();

    this.formEvent.next(this.selectedZone);
  }

}
