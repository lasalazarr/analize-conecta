import { E_PedidosCliente } from './E_PedidosCliente';

export class DeliveryCoordinate {
    IdRutaInfo:string;
    IdSubRutaInfo:string;
    Longitud:number;
    Latitud:number;
    IdTransportista:string;
    FechaHora:Date;
    transportista:any;
    PedidoObj: E_PedidosCliente;
}