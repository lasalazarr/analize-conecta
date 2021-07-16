
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_PLU } from 'app/Models/E_PLU';
import { PLUBuilder } from 'app/Builders/PLU.model.builder';
import { Subject } from 'rxjs';


@Injectable()
export class DetallePedidoService {
  constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
  PedidoNumberItems = new Subject<number>()
  GetCurrentDetallePedido(): Array<E_PLU> {
    var retrievedObject = sessionStorage.getItem('CurrentDetallePedido');
    var x: Array<E_PLU> = JSON.parse(retrievedObject)
    return x
  }

  ClearCurrentDetallePedido() {
    sessionStorage.removeItem("CurrentDetallePedido")
    this.PedidoNumberItems.next(0)
  }

  EliminarItemPedido(item: E_PLU): boolean {

    var retrievedObject = sessionStorage.getItem('CurrentDetallePedido');
    var lis: Array<E_PLU> = JSON.parse(retrievedObject)
    var lis2 = lis.filter(x => x.CodigoRapido !== item.CodigoRapido);
    /*lis.forEach((element) => {
        if(element.CodigoRapido==item.CodigoRapido){

        }
    });      */
    this.ClearCurrentDetallePedido();
    sessionStorage.setItem("CurrentDetallePedido", JSON.stringify(lis2))
    let numeroarticulos = 0
    this.GetCurrentDetallePedido().forEach(x => numeroarticulos += x.CantidadPedida)
    this.PedidoNumberItems.next(numeroarticulos)
    return true;
  }

  SetCurrentDetallePedido(res: any): Array<E_PLU> {

    var SessionDetallePedido: Array<E_PLU> = new Array<E_PLU>()

    SessionDetallePedido = this.GetCurrentDetallePedido();

    if (res != null) {
      if (SessionDetallePedido != null) {

        sessionStorage.removeItem("CurrentDetallePedido")
        //SessionDetallePedido.push(new PLUBuilder().buildFromObject(this.getArticuloxAgrupamiento(res, SessionDetallePedido)).Build())
        SessionDetallePedido = this.getArticuloxAgrupamiento(res, SessionDetallePedido)
        sessionStorage.setItem("CurrentDetallePedido", JSON.stringify(SessionDetallePedido))



      }
      else {

        var SessionDetallePedidoIniList: Array<E_PLU> = new Array<E_PLU>()
        SessionDetallePedidoIniList.push(res)

        sessionStorage.setItem("CurrentDetallePedido", JSON.stringify(SessionDetallePedidoIniList))
      }
    }

    let numeroarticulos = 0
    this.GetCurrentDetallePedido().forEach(x => numeroarticulos += x.CantidadPedida)
    this.PedidoNumberItems.next(numeroarticulos)
    return this.GetCurrentDetallePedido();
  }

  getArticuloxAgrupamiento(ArticuloAdicionar: E_PLU, SessionDetallePedidoGr: Array<E_PLU>): Array<E_PLU> {

    if (SessionDetallePedidoGr != null) {

      var count = 0

      var nuevo: E_PLU = new E_PLU()
      if (ArticuloAdicionar.CodigoRapido != null && ArticuloAdicionar.CodigoRapido != "") {
        var objeto = SessionDetallePedidoGr.find(x => x.CodigoRapido == ArticuloAdicionar.CodigoRapido);
        if (objeto == null) {
          SessionDetallePedidoGr.push(ArticuloAdicionar);
        } else {
          nuevo.Cantidad = objeto.Cantidad + ArticuloAdicionar.Cantidad;
          nuevo.PrecioCatalogoTotalConIVA = ArticuloAdicionar.PrecioCatalogoTotalConIVA;
          nuevo.CodigoRapido = ArticuloAdicionar.CodigoRapido;
          nuevo.NombreProducto = ArticuloAdicionar.NombreProducto;
          nuevo.PrecioConIVA = ArticuloAdicionar.PrecioConIVA;
          nuevo.PorcentajeDescuento = ArticuloAdicionar.PorcentajeDescuento;
          nuevo.PrecioEmpresaria = ArticuloAdicionar.PrecioEmpresariaCons * nuevo.Cantidad;
          nuevo.PrecioEmpresaria = +nuevo.PrecioEmpresaria.toFixed(2);
          nuevo.PrecioEmpresariaCons = ArticuloAdicionar.PrecioEmpresariaCons;
          nuevo.PrecioPuntos = ArticuloAdicionar.PrecioPuntos;
          nuevo.PLU = ArticuloAdicionar.PLU;

          nuevo.PrecioCatalogoSinIVA = ArticuloAdicionar.PrecioCatalogoSinIVA;
          nuevo.PrecioEmpresariaSinIVA = ArticuloAdicionar.PrecioEmpresariaSinIVA;
          nuevo.IVAPrecioCatalogo = ArticuloAdicionar.IVAPrecioCatalogoCons * nuevo.Cantidad;
          nuevo.IVAPrecioCatalogoCons = ArticuloAdicionar.IVAPrecioCatalogoCons;
          nuevo.IVAPrecioEmpresaria = ArticuloAdicionar.IVAPrecioEmpresaria;
          nuevo.PorcentajeIVA = ArticuloAdicionar.PorcentajeIVA;
          nuevo.ExcentoIVA = ArticuloAdicionar.ExcentoIVA;

          nuevo.PuntosGanados = ArticuloAdicionar.PuntosGanados;
          nuevo.CantidadPedida = objeto.CantidadPedida + ArticuloAdicionar.CantidadPedida;
          nuevo.Disponible = ArticuloAdicionar.Disponible;



          SessionDetallePedidoGr.splice(SessionDetallePedidoGr.indexOf(objeto), 1);
          SessionDetallePedidoGr.push(nuevo);
        }

        return SessionDetallePedidoGr;
      }
    }
    return SessionDetallePedidoGr;
  }
}
