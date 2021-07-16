import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'app/ApiServices/delivery.service';
import { UserService } from "app/ApiServices/UserService";
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { MatDialog } from '@angular/material';
import { DeliveryRoute } from 'app/Models/DeliveryRouteModel';
import { DeliveryRouteDetail } from 'app/Models/DeliveryRouteDetailModel';
import { ConfirmAdressComponent } from '@fuse/components/confirm-adress/confirm-adress.component';
import { ModalPopUpComponent } from '../../ModalPopUp/modalpopup.component';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { forkJoin } from 'rxjs';
import { E_Bodegas } from 'app/Models/E_Bodegas';
import { RouteStatus } from 'app/Models/constants/RouteStatus';
import { E_SessionUser } from 'app/Models/E_SessionUser';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  public SessionUser: E_SessionUser = new E_SessionUser();
  filteredData:DeliveryRoute[] = [];
  routes:DeliveryRoute[] = [];
  warehouses: E_Bodegas[] = [];
  driver:string;
  currentRoute: boolean = false;

  constructor(private deliverySrv:DeliveryService,
              private routeMap: ActivatedRoute,
              private UserService: UserService,
              private communicationSrv: CommunicationService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    
    this.SessionUser = this.UserService.GetCurrentCurrentUserNow();

    this.communicationSrv.showLoader.next(true);
    //this.routeMap.snapshot.paramMap.get('driver');
    this.driver = this.SessionUser.Persona;
    forkJoin([
      this.deliverySrv.getWarehouses(),
      this.deliverySrv.getRoutesByDriver(this.driver)
    ]).toPromise().then(data => {
      this.warehouses = data[0];
      this.routes = data[1];
      this.filteredData = this.routes;

      if (this.routes.length > 0)
      {
        this.routes.forEach(route => {
          route.PedidosDevueltos = 0;
          route.PedidosEnRuta = 0;
          route.PedidosEntregados = 0;
          route.PedidosPendientes = 0;
          route.Detalle.forEach(item => {
            switch (item.PedidoObj.IdEstado) {
              case 19:
                route.PedidosPendientes++;
                break;

              case 20:
                route.PedidosEnRuta++;
                break;

              case 21:
                route.PedidosEntregados++;
                break;

              case 21:
                route.PedidosDevueltos++;
                break;
            }
          });
        });

        if (this.routes.find(x => x.Estado == 2) != undefined)
          this.currentRoute = true;
      } else {
        this.dialog.open(ModalPopUpComponent, {
          panelClass: "dialogInfocustom",
          width: "450px",
          data: {
            TipoMensaje: "",
            Titulo: "Atención",
            Mensaje: "No tienes rutas programadas",
          }
        });
      }

      this.communicationSrv.showLoader.next(false);
    });
  }

  filter(text:string) {
    this.filteredData = this.routes;
    if (text != null && text.trim() != '') {
      let filter: string = text.trim().toLowerCase();
      
      this.filteredData = this.filteredData.filter(item => {
        return (item.Id.toString() == filter)
      });
    }
  }

  onRouteClick(route:DeliveryRoute) {
    if (this.currentRoute && route.Estado != 2)
    {
      this.dialog.open(ModalPopUpComponent, {
        panelClass: "dialogInfocustom",
        width: "450px",
        data: {
          TipoMensaje: "",
          Titulo: "Atención",
          Mensaje: "Tienes una ruta en curso, debes finalizar la entrega de todos los pedidos de la ruta en curso antes de comenzar otra ruta",
        }
      });

      return;
    }

    if (this.currentRoute) {
      let currentRequest: DeliveryRouteDetail = route.Detalle.find(x => x.PedidoObj.IdEstado == 20);
      if (currentRequest == undefined){
        navigator.geolocation.getCurrentPosition((pos) => {
          let waypoints: any[] = [];
          if (route.Paradas != undefined && route.Paradas != null && route.Paradas.length > 0 )  {
            route.Paradas.forEach(item => {
              
              waypoints.push({ id: 0, lat: item.BodegaInfo.Latitud, lng: item.BodegaInfo.Longitud });
            });
          }
    
          let startWarehouse = this.warehouses.find(x => x.Bodega.trim() == route.IdBodegaInicio);
          let startPoint: any = { lat: startWarehouse.Latitud, lng: startWarehouse.Longitud };
          route.Detalle.forEach(item => {
            if (item.PedidoObj.IdEstado == 19){ 
            waypoints.push({ id: item.PedidoObj.Numero, lat: item.PedidoObj.Latitud, lng: item.PedidoObj.Longitud });
          }
          });
    
          this.dialog.open(MapDialogComponent, {
            panelClass: "custom-dialog-container",
            data: {
              startPoint: startPoint,
              waypoints: waypoints,
              update: false,
              create: false
            }
          }).afterClosed().subscribe(result => {
            if (result) {
              const confirmDialogRef = this.dialog.open(ConfirmAdressComponent, {
                panelClass: "dialogInfocustom"
              });
          
              confirmDialogRef.componentInstance.confirmMessage = "¿Desea iniciar la ruta " + route.Id + '?';
              confirmDialogRef.afterClosed().subscribe((response) => {
                              if (response) {
                                let locations: any[] = [];
                                locations.push({
                                  lat: pos.coords.latitude, 
                                  lng: pos.coords.longitude,
                                  id: null
                                });
    
                                waypoints.forEach(point => {
                                  locations.push({
                                    lat: point.lat, 
                                    lng: point.lng,
                                    id: point.id
                                  });
                                });
    
                                this.communicationSrv.showLoader.next(true);
                                forkJoin([
                                  this.deliverySrv.getNearestCoordinate(locations),
                                  this.deliverySrv.changeRouteStatus(route.Id, 2)
                                ]).toPromise().then(response => {
                                  let nearestPoint = locations.find(x => x.id == response[0]);
                                  this.router.navigate(['/routes/delivery/map/' + nearestPoint.lat + '/' + nearestPoint.lng + '/' + nearestPoint.id.trim() + '/' + route.Id + '/' + this.driver]);
                                  this.communicationSrv.showLoader.next(false);
                                });
                              }
                          });
            }
          });
        });  

      }else{
        this.router.navigate(['/routes/delivery/map/' + currentRequest.PedidoObj.Latitud + '/' + currentRequest.PedidoObj.Longitud + '/' + currentRequest.PedidoObj.Numero.trim() + '/' + route.Id + '/' + this.driver]);
      }
      
    } else {
      navigator.geolocation.getCurrentPosition((pos) => {
        let waypoints: any[] = [];
        if (route.Paradas != undefined && route.Paradas != null && route.Paradas.length > 0) {
          route.Paradas.forEach(item => {
            waypoints.push({ id: 0, lat: item.BodegaInfo.Latitud, lng: item.BodegaInfo.Longitud });
          });
        }
  
        let startWarehouse = this.warehouses.find(x => x.Bodega.trim() == route.IdBodegaInicio);
        let startPoint: any = { lat: startWarehouse.Latitud, lng: startWarehouse.Longitud };
        route.Detalle.forEach(item => {
          waypoints.push({ id: item.PedidoObj.Numero, lat: item.PedidoObj.Latitud, lng: item.PedidoObj.Longitud });
        });
  
        this.dialog.open(MapDialogComponent, {
          panelClass: "custom-dialog-container",
          data: {
            startPoint: startPoint,
            waypoints: waypoints,
            update: false,
            create: false
          }
        }).afterClosed().subscribe(result => {
          if (result) {
            const confirmDialogRef = this.dialog.open(ConfirmAdressComponent, {
              panelClass: "dialogInfocustom"
            });
        
            confirmDialogRef.componentInstance.confirmMessage = "¿Desea iniciar la ruta " + route.Id + '?';
            confirmDialogRef.afterClosed().subscribe((response) => {
                            if (response) {
                              let locations: any[] = [];
                              locations.push({
                                lat: pos.coords.latitude, 
                                lng: pos.coords.longitude,
                                id: null
                              });
  
                              waypoints.forEach(point => {
                                locations.push({
                                  lat: point.lat, 
                                  lng: point.lng,
                                  id: point.id
                                });
                              });
  
                              this.communicationSrv.showLoader.next(true);
                              forkJoin([
                                this.deliverySrv.getNearestCoordinate(locations),
                                this.deliverySrv.changeRouteStatus(route.Id, 2)
                              ]).toPromise().then(response => {
                                let nearestPoint = locations.find(x => x.id == response[0]);
                                this.router.navigate(['/routes/delivery/map/' + nearestPoint.lat + '/' + nearestPoint.lng + '/' + nearestPoint.id.trim() + '/' + route.Id + '/' + this.driver]);
                                this.communicationSrv.showLoader.next(false);
                              });
                            }
                        });
          }
        });
      });
    }
  }
}
