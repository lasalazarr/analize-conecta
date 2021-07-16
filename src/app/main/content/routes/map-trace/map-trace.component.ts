import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { DeliveryService } from 'app/ApiServices/delivery.service';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { UserService } from 'app/ApiServices/UserService';
import { ModalPopUpComponent } from '../../ModalPopUp/modalpopup.component';
declare var google: any;

@Component({
  selector: 'app-map-trace',
  templateUrl: './map-trace.component.html',
  styleUrls: ['./map-trace.component.scss']
})
export class MapTraceComponent implements OnInit {

  map:any;
  cedula: string;
  phone:string;
  driver:any;
  currentMarker:any;
  requestNum:string;
  interval:any;
  duration:string;
  @ViewChild('searchCode') searchCodeFile: ElementRef;

  constructor(private communicationSrv: CommunicationService,
              private deliverySrv: DeliveryService,
              private userService: UserService,
              private pedidoService: PedidoService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.initMap();
    if (this.cedula !== undefined || this.cedula !== null || this.cedula !== '') {
      const user = this.userService.GetCurrentCurrentUserNow();
      this.cedula = user.Cedula;
      if (this.cedula !== undefined || this.cedula !== null || this.cedula !== '') {
        this.pedidoService.PedidosXEstado(this.cedula, '20').subscribe(peds => {
          if (peds !== undefined || peds != null && peds.length > 1){
            this.searchCodeFile.nativeElement.value = peds[0].pedido;
            this.addMarkerOnDriverPosition(peds[0].pedido);
          }
        });
      }
    }
  }

  addMarkerOnDriverPosition(request:string) {
    this.requestNum = request;
    if (this.requestNum !== undefined && this.requestNum !== '') {
      this.driver = undefined;
      if (this.interval != undefined)
        clearInterval(this.interval);

      this.setCoordinates(true);
      this.interval = setInterval(() => {
        if (window.location.pathname.includes('routes/delivery/map-trace'))
          this.setCoordinates(false);
        else
          clearInterval(this.interval);
      }, 30000);
    }
  }

  setCoordinates(showModal:boolean) {
    this.deliverySrv.getLastDriverCoordinates(this.requestNum).then(data => {
      if (data != undefined && data != null) {
        if (data.PedidoObj != undefined && data.PedidoObj.IdEstado == 20) {
          if (this.driver == undefined)
            this.driver = data.transportista;

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
            position: { lat: data.Latitud, lng: data.Longitud },
            map: this.map,
            title: "Posición del conductor",
            icon: icon
          });

          if (this.duration == undefined)
          {
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(this.map);

            this.communicationSrv.showLoader.next(false);
            this.calculateAndDisplayRoute(directionsService, directionsRenderer, [], { lat: data.Latitud, lng: data.Longitud }, { lat: data.PedidoObj.Latitud, lng: data.PedidoObj.Longitud });
          }

          if (showModal) {
            this.dialog.open(ModalPopUpComponent, {
              panelClass: "dialogInfocustom",
              width: "450px",
              data: {
                TipoMensaje: "",
                Titulo: "Atención",
                Mensaje: "Seguimiento de la ruta en curso",
              }
            });
          }
        } else {
          if (this.interval != undefined)
            clearInterval(this.interval);

          this.duration = undefined;
          this.driver = undefined;
          this.initMap();

          if (showModal) {
            this.dialog.open(ModalPopUpComponent, {
              panelClass: "dialogInfocustom",
              width: "450px",
              data: {
                TipoMensaje: "",
                Titulo: "Atención",
                Mensaje: "El pedido ingresado no se encuentra en ruta",
              }
            });
          }
        }
      } else {
        if (this.interval != undefined)
          clearInterval(this.interval);

        this.duration = undefined;
        this.driver = undefined;
        this.initMap();

        if (showModal) {
          this.dialog.open(ModalPopUpComponent, {
            panelClass: "dialogInfocustom",
            width: "450px",
            data: {
              TipoMensaje: "",
              Titulo: "Atención",
              Mensaje: "Número de pedido no encontrado",
            }
          });
        }
      }
    });
  }

  calculateAndDisplayRoute(directionsService: any,directionsRenderer: any, waypts: any[], startPoint:any, destinationPoint:any) {
    directionsService.route(
      {
        origin: { lat: startPoint.lat, lng: startPoint.lng },
        destination: destinationPoint,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          let route = response.routes[0];
          let totalTime: number = 0;
          for (let i = 0; i < route.legs.length; i++) {
            totalTime += route.legs[i].duration.value; // segundos
          }

          this.duration = this.secondsToHms(totalTime);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
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

  initMap() {
    this.communicationSrv.showLoader.next(true);
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

      new google.maps.Marker({
        position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        map: this.map,
        title: "Mi posición"
      });

      this.communicationSrv.showLoader.next(false);
    });
  }
}
