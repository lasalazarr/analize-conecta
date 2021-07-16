import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { AppSettings } from '../app.settings';
import { E_Bodegas } from 'app/Models/E_Bodegas';
import { DeliveryRoute } from 'app/Models/DeliveryRouteModel';
import { E_Cliente } from 'app/Models/E_Cliente';
import { DeliveryCoordinate } from 'app/Models/DeliveryCoordinateModel';
import { DeliveryZone } from 'app/Models/DeliveryZoneModel';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private UrlNow: string = AppSettings.Global().API;
  //private UrlNow: string = 'http://localhost/Application.Enterprise.Services/api/';

  constructor(private http:HttpClient) { }

  getPendingRequests() : Promise<E_PedidosCliente[]> {
    return this.http.get<E_PedidosCliente[]>(this.UrlNow + 'Delivery/PedidosPendientesPorEntregar', httpOptions).toPromise().then(data => {
      return data;
    });
  }

  getWarehouses() : Promise<E_Bodegas[]> {
    return this.http.get<E_Bodegas[]>(this.UrlNow + 'Delivery/ListaBodega', httpOptions).toPromise().then(data => {
      return data;
    });
  }

  getDrivers() : Promise<any[]> {
    return this.http.get<any[]>(this.UrlNow + 'Delivery/ListaDomiciliario', httpOptions).toPromise().then(data => {
      return data;
    });
  }

  getDomiciliario(Nit: string) : Promise<any> {
    return this.http.get<any>(this.UrlNow + 'Delivery/Domiciliario?Nit='+Nit, httpOptions).toPromise().then(data => {
      return data;
    });
  }
  getFarthestCoordinate(coordinates:any[]) : Promise<number> {
    return this.http.post<number>(this.UrlNow + 'Delivery/GetFarthestCoordinate', coordinates, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

  getNearestCoordinate(coordinates:any[]) : Promise<number> {
    return this.http.post<number>(this.UrlNow + 'Delivery/GetNearestCoordinate', coordinates, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

  createRoute(route:DeliveryRoute) : Promise<boolean> {
    return this.http.post<boolean>(this.UrlNow + 'Delivery/CrearRuta', route, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

  updateRoute(route:DeliveryRoute) : Promise<boolean> {
    return this.http.post<boolean>(this.UrlNow + 'Delivery/ActualizarRuta', route, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

  changeRouteStatus(routeId:number, status:number) {
    return this.http.put<boolean>(this.UrlNow + 'Delivery/ActualizarEstadoRuta?id=' + routeId + '&estado=' + status, null, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

  changeRequestStatus(idRoute: number, requestNumber:string, clientNit:string, status:number, reason: string ) {
    return this.http.put<boolean>(this.UrlNow + 'Delivery/ActualizarEstadoSubRuta?idRuote='+idRoute+' +&IdPedido=' + requestNumber + '&nit=' + clientNit + '&estado=' + status + '&razondeCambio=' +reason, null, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

  finishRequest(requestNumber:string, clientNit:string, receiver:string, photo:any, routeId:number) {
    let data: any = {
      IdPedido:requestNumber,
      Nit:clientNit,
      NombrePersonaEntregada:receiver,
      Foto:photo,
      IdRutaInfo:routeId
    };

    return this.http.post<boolean>(this.UrlNow + 'Delivery/FinalizarPedido', data, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

  getRoutesByStatus(status:any = '', date:Date = null, routeId:any = '') : Promise<DeliveryRoute[]> {
    let strDate:string = null;
    if (date != null)
      strDate = date.toISOString().slice(0,10);

    return this.http.get<DeliveryRoute[]>(this.UrlNow + 'Delivery/ConsultarRutasxEstado?estado=' + status + '&Fecha=' + strDate + '&idRuta=' + routeId, httpOptions)
                    .toPromise().then(data => {
      return data;
    });
  }

  getRouteById(id:number) : Promise<DeliveryRoute[]> {
    return this.http.get<DeliveryRoute[]>(this.UrlNow + 'Delivery/ConsultarRutasxId?id=' + id, httpOptions)
        .toPromise().then(data => {
      return data;
    });
  }

  getRoutesByDriver(driverId:string) : Promise<DeliveryRoute[]> {
    return this.http.get<DeliveryRoute[]>(this.UrlNow + 'Delivery/ConsultarRutasxTransportista?transportista=' + driverId, httpOptions)
                    .toPromise().then(data => {
      return data;
    });
  }

  getRouteClients(id:number) : Promise<E_Cliente[]> {
    return this.http.get<E_Cliente[]>(this.UrlNow + 'Delivery/ConsultarClientexRuta?idRutaInfo=' + id, httpOptions)
        .toPromise().then(data => {
      return data;
    });
  }

  addDriverCoordinates(coordinates:DeliveryCoordinate) : Promise<boolean> {
    return this.http.post<boolean>(this.UrlNow + 'Delivery/GuardarCoordenadasTrasportista', coordinates, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

  getLastDriverCoordinates(requestNumber:string) : Promise<DeliveryCoordinate>  {
    return this.http.get<DeliveryCoordinate>(this.UrlNow + 'Delivery/ConsultarUltimaCoordenadaxPedido?idSubRutaInfo=' + requestNumber, httpOptions)
        .toPromise().then(data => {
      return data;
    });
  }

  getParamValue(parameterId:number) : Promise<any> {
    let param: any = {
      Id:parameterId
    };

    return this.http.post<any>(this.UrlNow + 'Parametros/ListarParametrosxId', param, httpOptions).toPromise().then(data => {
      return data.Valor;
    });
  }

  getDistanceBetweenCoordinates(coordinates:any[]) : Promise<number> {
    return this.http.post<number>(this.UrlNow + 'Delivery/GetDistanceBetweenCoordinates', coordinates, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

  insertDeliveryPayment(routeId:number,detailNr:string,efecty:boolean,voucher:string) : Promise<boolean> {
    return this.http.post<boolean>(this.UrlNow + 'Delivery/InsertDeliveryPayment?routeId=' + routeId + '&detailNr=' + detailNr + '&efecty=' + efecty + '&voucher=' + voucher, null, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

  // TODO: Cambiar por el método correcto
  getDeliveryZones() : Promise<any> {
    return this.http.get<any[]>(this.UrlNow + 'Delivery/GetZones', httpOptions).toPromise().then(data => {
      return data;
    });
  }

  getZoneSectors(zoneId:number) : Promise<any> {
    return this.http.get<any[]>(this.UrlNow + 'Delivery/GetSectors?zoneId=' + zoneId, httpOptions).toPromise().then(data => {
      return data;
    });
  }

  createZone(zone:DeliveryZone) {
    return this.http.post<number>(this.UrlNow + 'Delivery/CreateZone', zone, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

  updateZone(zone:DeliveryZone) {
    return this.http.put<boolean>(this.UrlNow + 'Delivery/UpdateZone', zone, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

  getRouteStatus() : any[] {
    return [
      { value: 1, text: 'Creada' },
      { value: 2, text: 'En proceso' },
      { value: 3, text: 'Completada' },
      { value: 0, text: 'Cancelada' }
    ]
  }

  markWrongAddress(IdPedido:string) {
    return this.http.put<boolean>(this.UrlNow + 'Delivery/MarkWrongAddress?IdPedido=' + IdPedido, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

  getRequestAddress(IdPedido:string) {
    return this.http.get<any>(this.UrlNow + 'Delivery/GetRequestAddress?IdPedido=' + IdPedido, httpOptions)
      .toPromise().then(response => {
    return response;
    });
  }

  updateAddressReference(IdPedido:string, NewReference:string) {
    return this.http.put<boolean>(this.UrlNow + 'Delivery/UpdateAddressReference?IdPedido=' + IdPedido + '&newReference=' + NewReference, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }
}
