import { DeliveryRouteDetail } from './DeliveryRouteDetailModel';
import { DeliveryRouteWarehouse } from './DeliveryRouteWarehouseModel';

export class DeliveryRoute {
    Id:number;
    Fecha:any;
    IdBodegaInicio:string;
    IdTransportista:string;
    Valor:number;
    Tiempo:number;
    Distancia:string;
    Estado:any;
    NombreEstado:string;
    Detalle: DeliveryRouteDetail[];
    Paradas: DeliveryRouteWarehouse[];

    PedidosPendientes:number;
    PedidosEnRuta:number;
    PedidosEntregados:number;
    PedidosDevueltos:number;
}