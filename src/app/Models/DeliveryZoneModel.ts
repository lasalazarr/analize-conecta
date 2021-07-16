import { DeliverySector } from './DeliverySectorModel';

export class DeliveryZone {
    Id:number;
    Nombre:string;
    Activo:boolean;
    Latitud:number;
    Longitud:number;
    Radio:number;
    ProvinciaId:any;
    CantonId:any;
    Sectores:any[];
}