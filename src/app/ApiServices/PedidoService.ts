import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { E_Wallet } from 'app/Models/E_Wallet';
import { PedidosClienteBuilder } from 'app/Builders/PedidosCliente.model.builder';
import { E_PedidosDetalleCliente } from 'app/Models/E_PedidosDetalleCliente';
import { PedidosDetalleClienteBuilder } from 'app/Builders/PedidosDetalleCliente.model.builder';
import { E_PLU } from 'app/Models/E_PLU';
import { LiderLiberacion } from 'app/Models/LiderLiberacion';
import { PedidoXEstadoInfo } from 'app/Models/PedidoXEstadoInfo';


@Injectable()
export class PedidoService {

  PedidosListFacturados: any;
  constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
  private UrlNow: string = AppSettings.Global().API
  //private UrlNow: string = 'http://localhost/Application.Enterprise.Services/api/';
  private textarea: HTMLTextAreaElement;

  GuardarEncabezadoPedido(obj: E_PedidosCliente): Observable<E_PedidosCliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Pedido/GuardarEncabezadoPedido"
      , request, httpOptions).map(this.ExtractPedidosCliente)
  }

  GuardarDetallePedido(obj: Array<E_PedidosDetalleCliente>): Observable<E_PedidosCliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Pedido/GuardarDetallePedido"
      , request, httpOptions).map(this.ExtractPedidosCliente)
  }


  LiderLiberacion(obj: Array<LiderLiberacion>): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow + "Lider/LiderLiberacion", request, httpOptions)

  }

  GuardarReservaEnLinea(obj: Array<E_PedidosDetalleCliente>): Observable<E_PedidosCliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Pedido/ValidarPedidoReserva"
      , request, httpOptions).map(this.ExtractPedidosCliente)
  }

  PedidosList(obj: E_PedidosCliente): Observable<Array<E_PedidosCliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Pedido/PedidosList"
      , request, httpOptions).map(this.ExtractPedidosList)
  }

  PedidosListEmpresarias(obj: E_PedidosCliente): Observable<Array<E_PedidosCliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Pedido/PedidosListEmpresaria"
      , request, httpOptions).map(this.ExtractPedidosListEmpresarias)
  }
  PedidosListLider(obj: E_PedidosCliente): Observable<Array<E_PedidosCliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Pedido/PedidosListLider"
      , request, httpOptions).map(this.ExtractPedidosListLider)
  }

  PedidosListLiderB(obj: E_PedidosCliente): Observable<Array<E_PedidosCliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Pedido/PedidosListLiderB"
      , request, httpOptions).map(this.ExtractPedidosListLider)
  }

  PedidosAnuladosListLider(obj: E_PedidosCliente): Observable<Array<E_PedidosCliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Pedido/PedidosAnuladosListLider"
      , request, httpOptions).map(this.ExtractPedidosAnuladosListLider)
  }

  PedidosAnuladosListDirector(obj: E_PedidosCliente): Observable<Array<E_PedidosCliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Pedido/PedidosAnuladosListDirector"
      , request, httpOptions).map(this.ExtractPedidosAnuladosListDirector)
  }
  PedidosAnuladosListEmpresaria(obj: E_PedidosCliente): Observable<Array<E_PedidosCliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Pedido/PedidosAnuladosListEmpresaria"
      , request, httpOptions).map(this.ExtractPedidosAnuladosListEmpresaria)
  }

  ConsumoWallet(obj: E_Wallet): Observable<E_Wallet> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<E_Wallet>(
      this.UrlNow + "Pedido/ConsumoWallet",
      request,
      httpOptions
    );
  }


  AnulacionPedido(obj: E_PedidosCliente): Observable<E_PedidosCliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<E_PedidosCliente>(
      this.UrlNow + "Pedido/UpdateAnularPedidoReserva",
      request,
      httpOptions
    );
  }

  ListxGerenteZonaFacturados(obj: E_PedidosCliente): Observable<Array<E_PedidosCliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<Array<E_PedidosCliente>>(this.UrlNow + "Pedido/ListxGerenteZonaFacturados"
      , request, httpOptions) //.map(this.ExtractListxGerenteZonaFacturados)
  }

  ObtenerPedidoxId(numero: string): Observable<E_PedidosCliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.Http.get<E_PedidosCliente>(this.UrlNow + "Pedido/ObtenerPedidoxId?numeroPedido=" + numero
      , httpOptions)
  }


  ListDetallePedidoCambio(numero: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.Http.get<Array<E_PedidosDetalleCliente>>(this.UrlNow + "Pedido/ListDetallePedidoCambio?numeroPedido=" + numero
      , httpOptions)
  }


  ListDetallePedidoReservaGYG(obj: E_PedidosCliente): Observable<Array<E_PedidosDetalleCliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Pedido/ListDetallePedidoReservaGYG"
      , request, httpOptions).map(this.ExtractPedidosDetalleList)

  }
  ConsultarEstadoCredito(
    nit: string,
    saldoPagar: number
  ): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.Http.get<boolean>(
      this.UrlNow + "Cliente/EstadoCredito?nit=" + nit + "&saldoPagar=" + saldoPagar,
      httpOptions
    );
  }

  NotificaPedido(
    numero: string,
    valorpedido: number
  ): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.Http.get<boolean>(
      this.UrlNow + "Pedido/NotificaPedido?numero=" + numero + "&valorpedido=" + valorpedido,
      httpOptions
    );
  }

  ConsultarSaldoAPagarxNit(obj: E_PedidosCliente): Observable<E_PedidosCliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Pedido/ConsultarSaldoAPagarxNit"
      , request, httpOptions).map(this.ExtractPedidosCliente)
  }

  ExtractPedidosCliente(res: Response): E_PedidosCliente {
    var x: E_PedidosCliente = new E_PedidosCliente()
    if (res != null) { x = new PedidosClienteBuilder().buildFromObject(res).Build() }
    return x
  }

  ExtractPedidosDetalleCliente(res: Response): E_PedidosDetalleCliente {
    var x: E_PedidosDetalleCliente = new E_PedidosDetalleCliente()
    if (res != null) { x = new PedidosDetalleClienteBuilder().buildFromObject(res).Build() }
    return x
  }

  ExtractPedidosList(res: any): Array<E_PedidosCliente> {
    var x: Array<E_PedidosCliente> = new Array<E_PedidosCliente>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new PedidosClienteBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }

  ExtractPedidosListEmpresarias(res: any): Array<E_PedidosCliente> {
    var x: Array<E_PedidosCliente> = new Array<E_PedidosCliente>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new PedidosClienteBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }
  ExtractPedidosListLider(res: any): Array<E_PedidosCliente> {
    var x: Array<E_PedidosCliente> = new Array<E_PedidosCliente>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new PedidosClienteBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }
  ExtractPedidosAnuladosListLider(res: any): Array<E_PedidosCliente> {
    var x: Array<E_PedidosCliente> = new Array<E_PedidosCliente>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new PedidosClienteBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }

  ExtractPedidosAnuladosListDirector(res: any): Array<E_PedidosCliente> {
    var x: Array<E_PedidosCliente> = new Array<E_PedidosCliente>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new PedidosClienteBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }
  ExtractPedidosAnuladosListEmpresaria(res: any): Array<E_PedidosCliente> {
    var x: Array<E_PedidosCliente> = new Array<E_PedidosCliente>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new PedidosClienteBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }
  ExtractListxGerenteZonaFacturados(res: any): Array<E_PedidosCliente> {
    var x: Array<E_PedidosCliente> = new Array<E_PedidosCliente>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new PedidosClienteBuilder().buildFromObject(element).Build())
      });

    }
    return x

  }


  ExtractPedidosDetalleList(res: any): Array<E_PedidosDetalleCliente> {
    var x: Array<E_PedidosDetalleCliente> = new Array<E_PedidosDetalleCliente>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new PedidosDetalleClienteBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }


  ListCatalogoxCambio(obj: E_PLU): Observable<Array<E_PLU>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<Array<E_PLU>>(this.UrlNow + "PLU/ListCatalogoxCambio"
      , request, httpOptions)

  }

  CreacionPedidoCambio(Usuario: string, Numero: string, Plu: number, Bodega: string, IdDireccionXUsuario: number, TipoEnvio: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.Http.get<any>(this.UrlNow + "Pedido/CreacionPedidoCambio?Usuario=" + Usuario + "&Numero=" + Numero + "&Plu=" + Plu + "&Bodega=" + Bodega + "&IdDireccionXUsuario=" + IdDireccionXUsuario + "&TipoEnvio=" + TipoEnvio
      , httpOptions)
  }


  GetPurchaseCode(obj: E_Wallet): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.Http.get<string>(this.UrlNow + "Pedido/GetPurchaseCode", httpOptions)

  }
  ActualizarPedido(obj: E_PedidosCliente): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Pedido/ActualizarPedido", request, httpOptions)
  }


  ChartPedidos(obj: string, tipo: number): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.Http.get<any[]>(this.UrlNow + "Pedido/ChartPedidos?usuario=" + obj + "&tipo=" + tipo, httpOptions)

  }

  GroupPedidos(obj: string, tipo: number): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.Http.get<any[]>(this.UrlNow + "Pedido/GroupPedidos?usuario=" + obj + "&tipo=" + tipo, httpOptions)

  }

  PedidosXEstado(usuario: string , estado: string): Observable<PedidoXEstadoInfo[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.Http.get<PedidoXEstadoInfo[]>(this.UrlNow + `Pedido/PedidosXUsuarioXEstado?usuario=${usuario}&estado=${estado}`, httpOptions)

  }
  LogisticaXPedido(obj: string): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.Http.get<any[]>(this.UrlNow + "Pedido/LogisticaXPedido?pedido=" + obj, httpOptions)

  }


}
