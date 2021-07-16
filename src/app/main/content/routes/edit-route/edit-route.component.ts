import { Component, OnInit, ViewChild } from '@angular/core';
import { DeliveryService } from 'app/ApiServices/delivery.service';
import { MatGridList, PageEvent, MatDialog } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { DeliveryRoute } from 'app/Models/DeliveryRouteModel';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { Router } from '@angular/router';
import { ModalPopUpComponent } from '../../ModalPopUp/modalpopup.component';
import { ConfirmAdressComponent } from '@fuse/components/confirm-adress/confirm-adress.component';
import { mergeMap } from 'rxjs/operators';
import { RouteStatus } from 'app/Models/constants/RouteStatus';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.scss']
})
export class EditRouteComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'FECHA', 'DISTANCIA', 'TIEMPO', 'VALOR', 'ESTADO', 'ACTION'];

  dataSource: DeliveryRoute[];
  filteredData: any[];
  temporalData: any[];
  status: any[] = [];
  filters: any = {
    code:null,
    date:null,
    status:null
  };

  @ViewChild('grid') grid: MatGridList;

  gridByBreakpoint = {
    xl: 5,
    lg: 5,
    md: 5,
    sm: 3,
    xs: 1
  }

  pageEvent: PageEvent;
  pageIndex:number = 0;
  pageSize:number = 5;
  dataLength:number;

  constructor(private deliverySrv:DeliveryService,
              private observableMedia: ObservableMedia,
              private dialog: MatDialog,
              private communicationSrv: CommunicationService,
              private router: Router) { }

  ngOnInit() {
    this.status = this.deliverySrv.getRouteStatus();
    this.communicationSrv.showLoader.next(true);
    this.deliverySrv.getRoutesByStatus(1).then(data => {
      data.forEach(item => {
        item.NombreEstado = this.status.find(x => x.value == item.Estado).text;
      });

      this.dataSource = data;
      this.dataLength = this.dataSource.length;
      this.getData(null,null);
      this.communicationSrv.showLoader.next(false);
    }, (error) => {
      console.log(error);
      this.communicationSrv.showLoader.next(false);
      this.dialog.open(ModalPopUpComponent, {
        panelClass: "dialogInfocustom",
        width: "450px",
        data: {
            TipoMensaje: "",
            Titulo: "Atención",
            Mensaje: "Ocurrió un problema consultado las rutas, por favor intenta de nuevo"
        }
      });
    });
  }

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }

  filter() {
    let request:any;
    if ((this.filters.code != null && this.filters.code != '') || this.filters.date != null || (this.filters.status != null && this.filters.status != undefined)) {
      request = this.deliverySrv.getRoutesByStatus(this.filters.status, this.filters.date, this.filters.code);
    } else {
      request = this.deliverySrv.getRoutesByStatus(1);
    }

    this.communicationSrv.showLoader.next(true);
    request.then(data => {
      data.forEach(item => {
        item.NombreEstado = this.status.find(x => x.value == item.Estado).text;
      });

      this.temporalData = [];
      this.dataSource = data;
      this.dataLength = this.dataSource.length;
      this.getData(null,null);
      this.communicationSrv.showLoader.next(false);
    });
  }

  getData(event: PageEvent, data?: any[]) {
    try {
      var pageIndex = 1;
      if (event != null) {
        pageIndex = (event.pageIndex + 1);
        this.pageSize = event.pageSize;
      }

      if (this.temporalData == undefined || this.temporalData == null || this.temporalData.length == 0)
        this.temporalData = this.dataSource;

      if (data != undefined && data != null)
        this.temporalData = data;

      this.dataLength = this.temporalData.length;

      var max = pageIndex * this.pageSize;
      var min = max - this.pageSize;

      this.filteredData = [];
      if (this.temporalData != undefined && this.temporalData.length > 0) {
        for (let index = min; index < max; index++) {
          if (this.temporalData[index] != undefined)
            this.filteredData.push(this.temporalData[index]);
        }
      }

      return event;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  edit(id:number) {
    this.router.navigate(['/routes/edit-route/' + id]);
  }

  cancel(id:number) {
    const confirmDialogRef = this.dialog.open(ConfirmAdressComponent, {
      panelClass: "dialogInfocustom",
    });

    confirmDialogRef.componentInstance.confirmMessage = "¿Desea cancelar la ruta " + id + '?';
    confirmDialogRef.afterClosed()
                .pipe(
                    mergeMap((result) => {
                        if (result) {
                            this.communicationSrv.showLoader.next(true);
                            return this.deliverySrv.changeRouteStatus(id, 0);
                        }
                    })
                )
                .subscribe((response) => {
                    this.dialog.open(ModalPopUpComponent, {
                        panelClass: "dialogInfocustom",
                        width: "450px",
                        data: {
                          TipoMensaje: "",
                          Titulo: "Atención",
                          Mensaje: "Ruta cancelada",
                        }
                    });

                    this.communicationSrv.showLoader.next(false);
                    setTimeout(() => {
                      window.location.reload();
                    }, 2500);
                }),
                (erro) => this.communicationSrv.showLoader.next(false);
  }

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    //var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    //var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    //return hDisplay + mDisplay + sDisplay;
    return hDisplay + mDisplay;
  }

}
