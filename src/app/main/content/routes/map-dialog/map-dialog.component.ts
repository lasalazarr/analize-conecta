import { Component, OnInit, AfterContentInit, Inject, Optional, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DeliveryService } from 'app/ApiServices/delivery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalPopUpComponent } from '../../ModalPopUp/modalpopup.component';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { DeliveryRouteDetail } from 'app/Models/DeliveryRouteDetailModel';
import { forkJoin } from 'rxjs';
import { E_Cliente } from 'app/Models/E_Cliente';
import { ConfirmAdressComponent } from '@fuse/components/confirm-adress/confirm-adress.component';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { DeliveryRoute } from 'app/Models/DeliveryRouteModel';
import { DeliveryPaymentComponent } from '../delivery-payment/delivery-payment.component';
import { DeliveryCoordinate } from 'app/Models/DeliveryCoordinateModel';
import { CameraDialogComponent } from '../camera-dialog/camera-dialog.component';
import { ReasonCancelationComponent } from './reason-cancelation/reason-cancelation.component';
import { CancellationReason } from 'app/Models/constants/CancellationReason';
import { PuntoRefComponent } from './punto-ref/punto-ref.component';
declare var google: any;
const kmValueParamId: number = 82;
const minDistanceParamId: number = 83;
const timeDeliveryParamId: number = 95;
const stopDeliveryParamId: number = 96;

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent implements OnInit, AfterContentInit {

  map:any;
  currentMarker:any;
  startPoint:any;
  waypoints:any[];
  update:boolean;
  create:boolean;
  distance:string;
  duration:string;
  value:string;
  destination:any;
  routeData: any;
  multiple:boolean = true;
  lat: number;
  lng: number;
  requestNum:string;
  routeId:number;
  request:E_PedidosCliente;
  client:E_Cliente;
  clients:E_Cliente[];
  phone:string;
  route:DeliveryRoute;
  driverId:string;
  interval:any;
  viewImage:boolean;
  nearDistance:number;
  currentPos:any;
  openedPanel:boolean = false;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private deliverySrv: DeliveryService,
              private routeMap: ActivatedRoute,
              private dialog: MatDialog,
              private communicationSrv: CommunicationService,
              private router: Router) 
  {
    if (data != undefined) {
      this.startPoint = data.startPoint;
      this.waypoints = data.waypoints;
      this.update = data.update;
      this.create = data.create;
    } else {
      this.multiple = false;
    }
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.initMap();
  }

  initMap() {
    if (this.multiple) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: this.startPoint.lat, lng: this.startPoint.lng },
          zoom: 13,
          mapTypeId: "roadmap",
          disableDefaultUI: true
        }
      );

      directionsRenderer.setMap(this.map);

      let waypts: any[] = [];
      let locations: any[] = [];
      locations.push({
        lat: this.startPoint.lat, 
        lng: this.startPoint.lng,
        id: null
      });

      this.waypoints.forEach(point => {
        locations.push({
          lat: point.lat, 
          lng: point.lng,
          id: point.id
        });
      });

      this.deliverySrv.getFarthestCoordinate(locations).then(response => {
        let destinationPoint = locations.find(x => x.id == response);
        locations = locations.filter(x => {
          return x.id != response;
        });

        locations.forEach(point => {
          if (point.id != null) {
            waypts.push({
              location: { lat: point.lat, lng: point.lng },
              stopover: true
            });
          }
        });

        this.calculateAndDisplayRoute(directionsService, directionsRenderer, waypts, destinationPoint);
      });
    } else {
      this.lat = +this.routeMap.snapshot.paramMap.get('lat');
      this.lng = +this.routeMap.snapshot.paramMap.get('lng');
      this.requestNum = this.routeMap.snapshot.paramMap.get('requestNum');
      this.routeId = +this.routeMap.snapshot.paramMap.get('routeId');
      this.driverId = this.routeMap.snapshot.paramMap.get('driver');

      let elem = document.getElementById('map-container');
      elem.style.width = '100%';
      elem.style.height = '100%';

      this.communicationSrv.showLoader.next(true);
      forkJoin([
        this.deliverySrv.getRouteById(this.routeId),
        this.deliverySrv.getRouteClients(this.routeId),
        this.deliverySrv.getParamValue(minDistanceParamId)
      ]).toPromise().then(data => {
        this.route = data[0][0];
        this.route.Detalle = this.route.Detalle.filter(det => {
          return det.PedidoObj.IdEstado != 21 && det.PedidoObj.IdEstado != 22 && det.PedidoObj.IdEstado != 24 && det.PedidoObj.IdEstado != 26
        });

        let request: DeliveryRouteDetail = this.route.Detalle.find(r => r.PedidoObj.Numero.trim() == this.requestNum);
        this.clients = data[1];
        this.client = this.clients.find(c => c.Nit.trim() == request.PedidoObj.Nit.trim());
        this.setMap(request);

        this.nearDistance = data[2];
      });
    }
  }

  calculateAndDisplayRoute(directionsService: any,directionsRenderer: any, waypts: any[], destinationPoint: any) {
    directionsService.route(
      {
        origin: { lat: this.startPoint.lat, lng: this.startPoint.lng },
        destination: destinationPoint,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        if (status === "OK") {
          forkJoin(
            this.deliverySrv.getParamValue(kmValueParamId),
            this.deliverySrv.getParamValue(timeDeliveryParamId),
            this.deliverySrv.getParamValue(stopDeliveryParamId)
          ).toPromise().then(paramResults => {
            directionsRenderer.setDirections(response);
            let route = response.routes[0];

            let totalDistance: number = 0;
            let totalTime: number = 0;
            for (let i = 0; i < route.legs.length; i++) {
              totalDistance += route.legs[i].distance.value; // metros
              totalTime += route.legs[i].duration.value; // segundos
            }

            let stops:number = 1;
            if (waypts.length > 0)
              stops = waypts.length;

            let distance = (totalDistance / 1000).toFixed(1);
            this.distance = distance.toString() + " km";
            this.duration = this.secondsToHms(totalTime);

            let value = ((totalDistance / 1000) * paramResults[0]) + ((totalTime / 60) * paramResults[1]) + (stops * paramResults[2]);
            this.value = '$ ' + value.toFixed(2);

            this.routeData = {
              distance: distance,
              duration: totalTime,
              value: value
            };

            if (!this.multiple) {
              this.dialog.open(ModalPopUpComponent, {
                panelClass: "dialogInfocustom",
                width: "450px",
                data: {
                  TipoMensaje: "",
                  Titulo: "Mensaje",
                  Mensaje: 'Tramo del pedido ' + this.requestNum + ' iniciado',
                },
              });

              this.interval = setInterval(() => {
                if (window.location.pathname.includes('routes/delivery/map'))
                  this.addMarkerOnMyPosition();
                else
                  clearInterval(this.interval);
              }, 30000);
            }
          });
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  addMarkerOnMyPosition() {
    navigator.geolocation.getCurrentPosition(pos => {
      let coordinates: DeliveryCoordinate = new DeliveryCoordinate();
      coordinates.IdRutaInfo = this.route.Id.toString();
      coordinates.IdSubRutaInfo = this.requestNum;
      coordinates.Longitud = pos.coords.longitude;
      coordinates.Latitud = pos.coords.latitude;
      coordinates.IdTransportista = this.route.IdTransportista;
      coordinates.FechaHora = new Date();
      this.currentPos = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      this.deliverySrv.addDriverCoordinates(coordinates).then(response => {
        if (this.currentMarker != undefined)
          this.currentMarker.setMap(null);

        let icon: any = {
          url: 'https://appsaved.lineadirectaec.com/assets/icons/map/ic_car_gps.png',
          // Tamaño
          size: new google.maps.Size(32, 32),
          // Origen
          origin: new google.maps.Point(0, 0),
          // Anclaje
          anchor: new google.maps.Point(16, 32)
        };

        this.currentMarker = new google.maps.Marker({
          position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          map: this.map,
          title: "Mi posición",
          icon: icon
        });

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(this.map);
        directionsService.route(
          {
            origin: { lat: this.startPoint.lat, lng: this.startPoint.lng },
            destination: { lat: this.lat, lng: this.lng },
            waypoints: [],
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
          },
          (response, status) => {
            if (status === "OK") {
              let totalTime: number = 0;
              let route = response.routes[0];

              for (let i = 0; i < route.legs.length; i++) {
                totalTime += route.legs[i].duration.value; // segundos
              }

              this.duration = this.secondsToHms(totalTime);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      });
    });
  }

  setMap(request:DeliveryRouteDetail) {
    this.request = request.PedidoObj;
    this.phone = this.client.Telefono1.trim();

    if (this.request.IdEstado != 20) {
      this.deliverySrv.changeRequestStatus(this.route.Id, this.requestNum, this.request.Nit, 20, "").then(response => {
        this.setMyPosition();
      });
    } else {
      this.setMyPosition();
    }
  }

  setMyPosition() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    navigator.geolocation.getCurrentPosition((pos) => {
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          zoom: 13,
          mapTypeId: "roadmap",
          disableDefaultUI: true
        }
      );

      directionsRenderer.setMap(this.map);
      this.startPoint = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      this.currentPos = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      this.communicationSrv.showLoader.next(false);
      this.calculateAndDisplayRoute(directionsService, directionsRenderer, [], { lat: this.lat, lng: this.lng });
    });
  }

  cancel() {
    const confirmDialogRef = this.dialog.open(ConfirmAdressComponent, {
      panelClass: "dialogInfocustom"
    });

    confirmDialogRef.componentInstance.confirmMessage = "¿Desea cancelar la entrega del pedido " + this.requestNum + '?';
    confirmDialogRef.afterClosed().subscribe(response => {
      if (response) {
        const reasonCancelationDialogRef = this.dialog.open(ReasonCancelationComponent, {
          panelClass: "dialogInfocustom",
          disableClose: true,
          hasBackdrop: true,
        });
        reasonCancelationDialogRef.afterClosed().subscribe(response => {
          if(response) {
            this.communicationSrv.showLoader.next(true);

            switch (response.value) {
              case CancellationReason.WrongAddress:
              case CancellationReason.GeoError:
                this.deliverySrv.markWrongAddress(this.requestNum).then(r => {
                  if (r)
                    this.cancelDelivery(response.text, CancellationReason.GeoError);
                  else
                  {
                    this.communicationSrv.showLoader.next(false);
                    this.dialog.open(ModalPopUpComponent, {
                      panelClass: "dialogInfocustom",
                      width: "450px",
                      data: {
                        TipoMensaje: "",
                        Titulo: "Mensaje",
                        Mensaje: 'Ocurrió un problema registrando la dirección incorrecta, por favor intenta de nuevo',
                      },
                    });
                  }
                }, error => {
                  this.communicationSrv.showLoader.next(false);
                  console.log('[ERROR]: ' + error);
                  this.dialog.open(ModalPopUpComponent, {
                    panelClass: "dialogInfocustom",
                    width: "450px",
                    data: {
                      TipoMensaje: "",
                      Titulo: "Mensaje",
                      Mensaje: 'Ocurrió un problema, por favor intenta de nuevo',
                    },
                  });
                });
                break;
            
              default:
                this.cancelDelivery(response.text, CancellationReason.ClientDontAnswer);
                break;
            }         
          }
        })

      }
    })
  }

  cancelDelivery(reason:string, type:number) {
    let status:number = 24;
    if (type == CancellationReason.WrongAddress || type == CancellationReason.GeoError || 
        type == CancellationReason.Wrongnumber
      )
      status = 24;
      else{
        if(type == CancellationReason.notwant || type == CancellationReason.wantdigital ||
          type == CancellationReason.withdrawinmatrix || type == CancellationReason.Alreadyreceived  )
          status = 26;
      }     
    
    this.deliverySrv.changeRequestStatus(this.route.Id, this.requestNum, this.request.Nit.trim(), status, reason).then(r => {
      this.communicationSrv.showLoader.next(false);
      let modal = this.dialog.open(ModalPopUpComponent, {
        panelClass: "dialogInfocustom",
        width: "450px",
        data: {
          TipoMensaje: "",
          Titulo: "Atención",
          Mensaje: "Pedido cancelado",
        }
      });

      setTimeout(() => {
        modal.close();
        this.finish();
      }, 1000);
    });
  }

  done() {
    let locations: any[] = [];

    locations.push({
      lat: this.currentPos.lat, 
      lng: this.currentPos.lng,
      id: null
    });

    locations.push({
      lat: this.lat, 
      lng: this.lng,
      id: null
    });

    this.deliverySrv.getDistanceBetweenCoordinates(locations).then(distance => {
      if (distance <= this.nearDistance) {
        const confirmDialogRef = this.dialog.open(ConfirmAdressComponent, {
          panelClass: "dialogInfocustom"
        });
    
        confirmDialogRef.componentInstance.confirmMessage = "¿Desea finalizar la entrega del pedido " + this.requestNum + '?';
        confirmDialogRef.afterClosed().subscribe(response => {
          if (response) {
            const confirmDialogRef = this.dialog.open(ConfirmAdressComponent, {
              panelClass: "dialogInfocustom"
            });
        
            confirmDialogRef.componentInstance.confirmMessage = '¿Desea actualizar el punto de referencia de la dirección?';
            confirmDialogRef.afterClosed().subscribe(confirm => {
              if (confirm) {
                this.communicationSrv.showLoader.next(true);
                this.deliverySrv.getRequestAddress(this.requestNum).then(address => {
                  this.dialog.open(PuntoRefComponent, {
                    panelClass: "dialogInfocustom",
                    width: "450px",
                    data: address.PuntoReferencia
                  }).afterClosed().toPromise().then(ref => {
                    this.deliverySrv.updateAddressReference(this.requestNum, ref).then(resp => {
                      this.communicationSrv.showLoader.next(false);
                      if (resp) {
                        this.takePhoto();
                      } else {
                        this.dialog.open(ModalPopUpComponent, {
                          panelClass: "dialogInfocustom",
                          width: "450px",
                          data: {
                            TipoMensaje: "",
                            Titulo: "Atención",
                            Mensaje: "Ocurrió un problema actualizando el punto de referencia",
                          }
                        }).afterClosed().toPromise().then(() => {
                          this.takePhoto();
                        });
                      }
                    });
                  });
                });
              } else {
                this.takePhoto();
              }
            });
          }
        });
      } else {
        this.dialog.open(ModalPopUpComponent, {
          panelClass: "dialogInfocustom",
          width: "450px",
          data: {
            TipoMensaje: "",
            Titulo: "Atención",
            Mensaje: "Debes estar a menos de " + this.nearDistance + "mts del punto de entrega para finalizar el pedido",
          }
        });
      }
    });
  }

  takePhoto() {
    this.dialog.open(CameraDialogComponent, {
      // panelClass: "dialogInfocustom",
      panelClass: 'bottomStyleSheet',
      hasBackdrop: true,
      data: null,
      disableClose: true
    }).afterClosed().subscribe(data => {
      console.log("data",data);
      if(data.ok){
          if (data != undefined && data != null && 
            data.receiver != null && data.receiver != '' 
            //&& data.photo != null
            )
          {
          if (this.request.Contraentrega == undefined)
            this.request.Contraentrega = false;
  
          if (this.request.Contraentrega) {
            this.dialog.open(DeliveryPaymentComponent, {
              panelClass: "custom-dialog-container",
              data: this.request
            }).afterClosed().subscribe(responseData => {
              this.communicationSrv.showLoader.next(true);
              this.deliverySrv.insertDeliveryPayment(this.routeId,this.requestNum,responseData.efecty,responseData.voucher).then(paymentResponse => {
                this.communicationSrv.showLoader.next(false);
                if( data.photo== undefined ) data.photo = "";
                this.requestDone(data.receiver, data.photo);
              }, (error) => {
                console.log(error);
                this.communicationSrv.showLoader.next(false);
                this.dialog.open(ModalPopUpComponent, {
                  panelClass: "dialogInfocustom",
                  width: "450px",
                  data: {
                      TipoMensaje: "",
                      Titulo: "Atención",
                      Mensaje: "Ocurrió un problema registrando los datos de contraentrega, por favor intenta de nuevo"
                  }
                });
              });
            });
          } else {
            this.requestDone(data.receiver, data.photo);
          }
        } 
        else {
          this.dialog.open(ModalPopUpComponent, {
            panelClass: "dialogInfocustom",
            width: "450px",
            data: {
              TipoMensaje: "",
              Titulo: "Atención",
              Mensaje: "Debes especificar el nombre de la persona que recibe y tomar una fotografía",
            }
          });
        }
      }
    });
  }

  requestDone(receiver:string, photo:any) {
    this.communicationSrv.showLoader.next(true);
    this.deliverySrv.finishRequest(this.requestNum, this.request.Nit.trim(), receiver, photo, this.routeId).then(r => {
      this.communicationSrv.showLoader.next(false);
      let modal = this.dialog.open(ModalPopUpComponent, {
        panelClass: "dialogInfocustom",
        width: "450px",
        data: {
          TipoMensaje: "",
          Titulo: "Atención",
          Mensaje: "Pedido entregado correctamente",
        }
      });

      setTimeout(() => {
        modal.close();
        this.finish();
      }, 1000);
    }, (error) => {
      console.log(error);
      this.communicationSrv.showLoader.next(false);
      this.dialog.open(ModalPopUpComponent, {
        panelClass: "dialogInfocustom",
        width: "450px",
        data: {
            TipoMensaje: "",
            Titulo: "Atención",
            Mensaje: "Ocurrió un problema finalizando el pedido, por favor intenta de nuevo"
        }
      });
    });
  }

  finish() {
    this.communicationSrv.showLoader.next(true);
    if (this.interval != undefined)
      clearInterval(this.interval);

    this.route.Detalle = this.route.Detalle.filter(x => {
      return x.PedidoObj.Numero.trim() != this.requestNum;
    });

    if (this.route.Detalle.length > 0) {
      navigator.geolocation.getCurrentPosition((pos) => {
        let locations: any[] = [];
        locations.push({
          lat: pos.coords.latitude, 
          lng: pos.coords.longitude,
          id: null
        });

        this.route.Detalle.forEach(detail => {
          locations.push({
            lat: detail.PedidoObj.Latitud, 
            lng: detail.PedidoObj.Longitud,
            id: detail.PedidoObj.Numero
          });
        });

        this.deliverySrv.getNearestCoordinate(locations).then(num => {
          let nearestPoint = locations.find(x => x.id == num);
          this.lat = nearestPoint.lat;
          this.lng = nearestPoint.lng;
          this.requestNum = nearestPoint.id.trim();
          let request: DeliveryRouteDetail = this.route.Detalle.find(r => r.PedidoObj.Numero.trim() == this.requestNum);
          this.client = this.clients.find(c => c.Nit.trim() == request.PedidoObj.Nit.trim());
          this.setMap(request);
        });
      });
    } else {
      this.deliverySrv.changeRouteStatus(this.route.Id, 3).then(response => {
        this.communicationSrv.showLoader.next(false);
        this.router.navigate(['/routes/delivery/list/' + this.driverId]);
      });
    }
  }

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
  }

}
