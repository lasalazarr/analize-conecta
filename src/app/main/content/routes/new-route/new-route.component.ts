import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatGridList, PageEvent, MatDialog, MatSelect, MatOption } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { DeliveryService } from 'app/ApiServices/delivery.service';
import { forkJoin } from 'rxjs';
import * as XLSX from "xlsx";
import { E_Bodegas } from 'app/Models/E_Bodegas';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { DeliveryRoute } from 'app/Models/DeliveryRouteModel';
import { DeliveryRouteWarehouse } from 'app/Models/DeliveryRouteWarehouseModel';
import { DeliveryRouteDetail } from 'app/Models/DeliveryRouteDetailModel';
import { ModalPopUpComponent } from '../../ModalPopUp/modalpopup.component';
import { ActivatedRoute } from '@angular/router';
import { RouteStatus } from 'app/Models/constants/RouteStatus';
import { DeliveryZone } from 'app/Models/DeliveryZoneModel';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
declare var google: any;
import { UserService } from 'app/ApiServices/UserService';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { E_Lider } from 'app/Models/E_Lider';
@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.scss']
})
export class NewRouteComponent implements OnInit {

  SessionUser: E_SessionUser;
  displayedColumns: string[] = ['Numero', 'Factura','NombreEmpresaria', 'Fecha', 'NombreCiudad','GeoZona'
  //, 'Valor', 'DireccionEntregaPedido'
  , 'selected'];
  drivers: any[] = [];
  warehouses: E_Bodegas[] = [];
  dataSource: E_PedidosCliente[] = [];
  filteredData: any[] = [];
  temporalData: any[];

  routeForm: FormGroup;
  route: DeliveryRoute = new DeliveryRoute();
  listaPedidos: DeliveryRouteDetail[] = [];
  selectedItemsReport: E_PedidosCliente[]= [];
  warehouseStop: string;
  IdLiderSelect: string;
  filterApplyed:boolean = false;

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
  dataLength:number = 0;
  update:boolean = false;
  create:boolean = true;
  editable:boolean = true;
  zones:DeliveryZone[] = [];
  selectedZones: any[] = [];
  lideres:E_Lider[] = [];
  @ViewChild('zonesSelect') zonesSelect: MatSelect;
  @ViewChild('liderSelect') liderSelect: MatSelect;
  @ViewChild('cbxAll') cbxAll: ElementRef;

  constructor(private observableMedia: ObservableMedia,
              private dialog: MatDialog,
              private deliverySrv: DeliveryService,
              private communicationSrv: CommunicationService,
              private formBuilder: FormBuilder,
              private routeMap: ActivatedRoute,
              private UserService: UserService,
              private ParameterService: ParameterService) 
              {
                this.routeForm = this.formBuilder.group({
                  Fecha: null,
                  IdBodegaInicio: null,
                  IdTransportista: null
                });
              }

  ngOnInit() {
    let id = +this.routeMap.snapshot.paramMap.get('id');
    this.communicationSrv.showLoader.next(true);
    this.SessionUser = this.UserService.GetCurrentCurrentUserNow();

    forkJoin([
      this.deliverySrv.getDrivers(),
      this.deliverySrv.getWarehouses(),
      this.deliverySrv.getPendingRequests(),
      this.deliverySrv.getDeliveryZones(),    
    ]).toPromise().then(results => {
      this.drivers = results[0];
      this.warehouses = results[1];
      this.dataSource = results[2];
      this.zones = results[3];
   //   const idsLidersWithRequests = this.dataSource.map(rq => rq.IdLider);
   //   this.ParameterService.listarLideresXIds(idsLidersWithRequests).subscribe(ldrs => {
   //     this.lideres = ldrs;
        this.zones = this.zones.filter(x => x.Activo === true);
  
        if (id !== null && id !== 0) {
          this.create = false;
          this.update = true;
          this.deliverySrv.getRouteById(id).then(data => {
            this.route = data[0];
  
            if (this.route.Estado !== 1) {
              this.editable = false;
            }
  
            this.route.Detalle.forEach(detail => {
              const selectedRoute = this.dataSource.find(x => x.Numero === detail.PedidoObj.Numero);
              if (selectedRoute != null && selectedRoute !== undefined) {
                selectedRoute.selected = true;
              } else {
                detail.PedidoObj.selected = true;
                this.dataSource.push(detail.PedidoObj);
              }
            });
  
            if (this.route.Estado !== 1) {
              this.dataSource = this.dataSource.filter(x => x.selected === true);
              this.dataLength = this.dataSource.length;
            }
  
            const selectedItems = this.dataSource.filter(x => x.selected === true);
  
            this.setOrderZones(selectedItems);
            this.getData(null, selectedItems);
            this.communicationSrv.showLoader.next(false);
          });
        } else {
          const now = new Date();
          now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  
          this.route.Fecha = now.toISOString().slice(0,16);
          this.routeForm.controls.Fecha.setValue(this.route.Fecha);
          this.communicationSrv.showLoader.next(false);
        }
   //   });

      
    }, (error) => {
      console.log(error);
      this.communicationSrv.showLoader.next(false);
      this.dialog.open(ModalPopUpComponent, {
        panelClass: "dialogInfocustom",
        width: "450px",
        data: {
            TipoMensaje: "",
            Titulo: "Atención",
            Mensaje: "Ocurrió un problema creando la ruta, por favor intenta de nuevo"
        }
      });
    });
  }

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
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

  selectAll(checked: boolean) {
    let filtered: E_PedidosCliente[] = [];
    if (this.filterApplyed) {
      this.temporalData.forEach(item => {
        item.selected = checked;
      });
    } else {
      const selectedZones: MatOption[] = this.zonesSelect.options.filter((zone: MatOption) => zone.selected);
      if (selectedZones.length > 0) {
        this.dataSource.forEach(item => {
          if (selectedZones.find(x => x.viewValue === item.GeoZona) !== undefined) {
            if (this.IdLiderSelect !== undefined && this.IdLiderSelect != null) {
              if (item.IdLider == this.IdLiderSelect)
              {
                item.selected = checked;
                filtered.push(item);
              }
            } else {
              item.selected = checked;
              filtered.push(item);
            }
          }
        });
  
        this.getData(null, filtered);
      } else if (this.IdLiderSelect !== undefined && this.IdLiderSelect != null) {
        this.dataSource.forEach(item => {
          if (item.IdLider == this.IdLiderSelect)
            item.selected = checked;
        });
  
        this.getData(null, this.dataSource.filter(x => { return x.IdLider == this.IdLiderSelect }));
      } else {
        this.dataSource.forEach(item => {
          item.selected = checked;
        });
  
        this.getData(null, this.dataSource);
      }
    }
  }

  selectItem(event:any, item:E_PedidosCliente) {
    this.dataSource.find(x => x.Numero == item.Numero).selected = event.srcElement.checked;
  }

  multiselect(selection:number) {
    let filtered: E_PedidosCliente[] = [];
    if (this.filterApplyed) {
      filtered = this.temporalData;
    } else {
      const selectedZones: MatOption[] = this.zonesSelect.options.filter((zone: MatOption) => zone.selected);
      if (selectedZones.length > 0) {
        this.dataSource.forEach(item => {
          if (selectedZones.find(x => x.viewValue === item.GeoZona) !== undefined) {
            if (this.IdLiderSelect !== undefined && this.IdLiderSelect != null) {
              if (item.IdLider == this.IdLiderSelect)
                filtered.push(item);
            } else {
              filtered.push(item);
            }
          }
        });
      } else if (this.IdLiderSelect !== undefined && this.IdLiderSelect != null) {
        this.dataSource.forEach(item => {
          if (item.IdLider == this.IdLiderSelect)
            filtered.push(item);
        });
      } else {
        filtered = this.dataSource;
      }
    }

    if (selection != 0) {
      for (let index = 0; index < selection; index++) {
        if (filtered[index] != undefined) {
          filtered[index].selected = true;
        } else {
          break;
        }
      }
    }

    this.getData(null, filtered);
  }

  filter(text:string) {
    this.filterApplyed = true;
    this.zonesSelect.options.forEach( (item : MatOption) => { item.deselect() });
    this.zonesSelect.close();

    this.liderSelect.options.forEach( (item : MatOption) => { item.deselect() });
    this.liderSelect.close();

    if (text != null && text.trim() != '') {
      let tmpData = this.dataSource;
      let filter: string = text.trim().toLowerCase();
      tmpData = tmpData.filter(item => {
        return (item.Factura.includes(filter) || item.Nit.includes(filter) || item.Numero.toLowerCase().includes(filter) || item.NombreEmpresaria.toLowerCase().includes(filter) || item.Fecha.toString().includes(filter))
      });

      this.getData(null, tmpData);
    } else {
      this.getData(null, this.dataSource);
    }
  }

  calc() {
    let selectedItems = this.dataSource.filter(item => {
      return item.selected == true;
    });
    this.selectedItemsReport = selectedItems;
    if (selectedItems.length > 0 && this.routeForm.valid) {
      let waypoints: any[] = [];
      this.route.Paradas = [];
      if (this.warehouseStop != undefined && this.warehouseStop != null && this.warehouseStop != '') {
        let stop: DeliveryRouteWarehouse = new DeliveryRouteWarehouse();
        stop.IdBodega = this.warehouseStop;
        this.route.Paradas.push(stop);

        let stopWarehouse = this.warehouses.find(x => x.Bodega == stop.IdBodega);
        waypoints.push({ id: 0, lat: stopWarehouse.Latitud, lng: stopWarehouse.Longitud });
      }
      
      if ((selectedItems.length + this.route.Paradas.length) <= 25) {
        this.route.Fecha = this.routeForm.controls.Fecha.value;
        this.route.IdBodegaInicio = this.routeForm.controls.IdBodegaInicio.value;
        this.route.IdTransportista = this.routeForm.controls.IdTransportista.value;
        this.route.Estado = 1;
  
        let startWarehouse = this.warehouses.find(x => x.Bodega == this.route.IdBodegaInicio);
        let startPoint: any = { lat: startWarehouse.Latitud, lng: startWarehouse.Longitud };
        this.route.Detalle = [];
        selectedItems.forEach(item => {
          let detail: DeliveryRouteDetail = new DeliveryRouteDetail();
          detail.IdPedido = item.Numero;
          this.route.Detalle.push(detail);
          
          waypoints.push({ id: item.Numero, lat: item.Latitud, lng: item.Longitud });
        });
        this.dialog.open(MapDialogComponent, {
          panelClass: "custom-dialog-container",
          data: {
            startPoint: startPoint,
            waypoints: waypoints,
            update: this.update,
            create: this.create
          }
        }).afterClosed().subscribe((result) => {
          if (result) {
            this.route.Tiempo = result.duration;
            this.route.Valor = result.value;
            this.route.Distancia = result.distance;
            this.listaPedidos = this.route.Detalle;
            this.communicationSrv.showLoader.next(true);
            if (!this.update) {
              this.deliverySrv.createRoute(this.route).then(response => {
                let message: string = '';
                if (response) {
                  message = 'Ruta creada correctamente';
                  this.createPDF();
                } else {
                  message = 'Ocurrió un problema creando la ruta, por favor intenta de nuevo';
                }
    
                this.communicationSrv.showLoader.next(false);
                this.dialog.open(ModalPopUpComponent, {
                  panelClass: "dialogInfocustom",
                  width: "450px",
                  data: {
                      TipoMensaje: "",
                      Titulo: "Atención",
                      Mensaje: message
                  }
                });
    
                if (response) {
                  setTimeout(() => {
                    this.clean();
                  }, 2500);
                }
              }, (error) => {
                console.log(error);
                this.communicationSrv.showLoader.next(false);
                this.dialog.open(ModalPopUpComponent, {
                  panelClass: "dialogInfocustom",
                  width: "450px",
                  data: {
                      TipoMensaje: "",
                      Titulo: "Atención",
                      Mensaje: "Ocurrió un problema creando la ruta, por favor intenta de nuevo"
                  }
                });
              });
            } else {
              this.deliverySrv.updateRoute(this.route).then(response => {
                let message: string = '';
                if (response) {
                  message = 'Ruta actualizada correctamente';
                } else {
                  message = 'Ocurrió un problema creando la ruta, por favor intenta de nuevo';
                }
    
                this.communicationSrv.showLoader.next(false);
                this.dialog.open(ModalPopUpComponent, {
                  panelClass: "dialogInfocustom",
                  width: "450px",
                  data: {
                      TipoMensaje: "",
                      Titulo: "Atención",
                      Mensaje: message
                  }
                });
    
                if (response) {
                  setTimeout(() => {
                    this.clean();
                  }, 2500);
                }
              }, (error) => {
                console.log(error);
                this.communicationSrv.showLoader.next(false);
                this.dialog.open(ModalPopUpComponent, {
                  panelClass: "dialogInfocustom",
                  width: "450px",
                  data: {
                      TipoMensaje: "",
                      Titulo: "Atención",
                      Mensaje: "Ocurrió un problema creando la ruta, por favor intenta de nuevo"
                  }
                });
              });
            }
          }
        });
      } else {
        this.dialog.open(ModalPopUpComponent, {
          panelClass: "dialogInfocustom",
          width: "450px",
          data: {
              TipoMensaje: "",
              Titulo: "Atención",
              Mensaje: "El nro máximo de pedidos seleccionados es 25 (incluyendo la parada en bodega adicional), tienes " + (selectedItems.length + this.route.Paradas.length) + " selecciones"
          }
        });
      }
    }
  }

  setOrderZones(routeOrders:E_PedidosCliente[]) {
    this.zones.forEach(zone => {
      var zoneCoor = new google.maps.LatLng(zone.Latitud, zone.Longitud);
      this.dataSource.filter(item => {
        var orderCoor = new google.maps.LatLng(item.Latitud, item.Longitud);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(zoneCoor, orderCoor);
        distance = Math.round(distance / 1000);

        if (distance <= zone.Radio) {
          if (item.GeoZona != undefined && item.GeoZona != zone.Nombre)
            return;

          item.NombreEmpresaria = item.NombreEmpresaria.slice(0,15) + "...";
          item.GeoZona = zone.Nombre;
          /*
          if (routeOrders.find(x => x.Numero == item.Numero) != undefined)
          {
            let opt = this.zonesSelect.options.find((item : MatOption) => item.value == zone.Id);
            if (!opt.selected)
              opt.select();
          }
          */
        }
      });
    });
  }

  onSelectZone(zones:DeliveryZone[]) {
    this.filterApplyed = false;

    this.dataSource = this.dataSource.map(item => {        
      return { ...item, selected : false};
    });
    this.cbxAll.nativeElement.checked = false;

    this.selectedZones = zones;
    let zonesOrders: E_PedidosCliente[] = [];
    this.selectedZones.forEach(auxZone => {
      var zoneCoor = new google.maps.LatLng(auxZone.Latitud, auxZone.Longitud);
      this.dataSource.filter(item => {
        var orderCoor = new google.maps.LatLng(item.Latitud, item.Longitud);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(zoneCoor, orderCoor);
        distance = Math.round(distance / 1000);

        if (distance <= auxZone.Radio) {
          if (item.GeoZona != undefined && item.GeoZona != auxZone.Nombre)
            return;

          item.NombreEmpresaria = item.NombreEmpresaria.slice(0,35) + "...";
          item.GeoZona = auxZone.Nombre;
          zonesOrders.push(item);
        }
      });
    });
    if (this.IdLiderSelect !== undefined && this.IdLiderSelect != null) {
      zonesOrders = zonesOrders.filter(item => item.IdLider === this.IdLiderSelect);
    }

    this.getData(null, zonesOrders);    
  }

  onSelectLider(liderId:string) {
    this.filterApplyed = false;
    
    this.dataSource = this.dataSource.map(item => {        
      return { ...item, selected : false};
    });
    this.cbxAll.nativeElement.checked = false;

    let orders: E_PedidosCliente[] = [];

    if (liderId != undefined && liderId != null) {
      orders = this.dataSource.filter(item => {
        return item.IdLider == liderId;
      });
    }
    else  {
      orders = this.dataSource.filter(item => item.IdLider === liderId);
    }

    this.selectedZones.forEach(auxZone => {
      const zoneCoor = new google.maps.LatLng(auxZone.Latitud, auxZone.Longitud);
      const orderForFilterZonas = orders.map(ord => {
        return {...ord};
      });
      orders = [];
      orderForFilterZonas.forEach(item => {
        const orderCoor = new google.maps.LatLng(item.Latitud, item.Longitud);
        let distance = google.maps.geometry.spherical.computeDistanceBetween(zoneCoor, orderCoor);
        distance = Math.round(distance / 1000);

        if (distance <= auxZone.Radio) {
          if (item.GeoZona !== undefined && item.GeoZona !== auxZone.Nombre) {
            return false;
          }

          item.NombreEmpresaria = item.NombreEmpresaria.slice(0, 15) + '...';
          item.GeoZona = auxZone.Nombre;
          orders.push(item);
        }
      });
    });

    this.getData(null, orders);   
  }

  setZoneRadio() {
    this.onSelectZone(this.selectedZones);
  }

  clean() {
    this.deliverySrv.getPendingRequests().then(requests => {
      this.dataSource = requests;
      var now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

      this.route.Fecha = now.toISOString().slice(0,16);
      this.routeForm.controls.Fecha.setValue(this.route.Fecha);
      this.routeForm.controls.IdBodegaInicio.setValue(null);
      this.routeForm.controls.IdTransportista.setValue(null);
      this.filteredData = [];
      this.temporalData = [];
      this.selectedZones = [];

      this.zonesSelect.options.forEach( (item : MatOption) => { item.deselect() });
      this.zonesSelect.close();

      this.communicationSrv.showLoader.next(false);
    });
  }

  createPDF(){
    let doc = new jsPDF("l");
    autoTable(doc, { html: '#tableNewRoute' })
    doc.save('ruta.pdf');
  }

  createXLS(){
    let doc = new jsPDF("l");
    autoTable(doc, { html: '#tableNewRoute' })
    doc.save('ruta.pdf');
  }

  exportToExcel() {
    const fileName = "test.xlsx";

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.temporalData,
        { header: ['Numero', 'Factura','NombreEmpresaria'] }
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "test");

    XLSX.writeFile(wb, fileName);
}
}
