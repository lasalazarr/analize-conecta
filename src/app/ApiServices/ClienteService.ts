import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { E_Cliente } from "../Models/E_Cliente";
import { E_ClientesL } from "../Models/E_ClientesL";
import { E_DepositoP } from "../Models/E_DepositoP";
import { ClienteBuilder } from "../Builders/Cliente.model.builder";

import { HeaderBuilder } from "../Tools/HeaderBuilder";
import { E_SessionEmpresaria } from "app/Models/E_SessionEmpresaria";
import { SessionEmpresariaBuilder } from "app/Builders/SessionEmpresaria.model.builder";
import { DireccionXUsuario } from "app/Models/DireccionXUsuario";
import { E_SessionUser } from "app/Models/E_SessionUser";

@Injectable()
export class ClienteService {

  constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
  private UrlNow: string = AppSettings.Global().API;
  private textarea: HTMLTextAreaElement;

  /** Copy the text value to the clipboard. */
  ListClienteSVDNxNit(obj: E_Cliente): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ListClienteSVDNxNit",
      request,
      httpOptions
    ).map(this.ExtractCliente);
  }


  ValidarToken(token: string, nit: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.Http.get<any>(
      this.UrlNow + "OTPToken/ValidarToken?token=" + token + "&nit=" + nit,
      httpOptions
    );
  }

  RecuperarClave(obj: E_Cliente): Observable<E_SessionUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<E_SessionUser>(
      this.UrlNow + "Cliente/RecuperaClaveEmpresaria",
      request,
      httpOptions
    );
  }

  ListEstadoxNit(obj: E_Cliente): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ListEstadoxNit",
      request,
      httpOptions
    ).map(this.ExtractCliente);
  }

  ListxEmail(obj: E_Cliente): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ListxEmail",
      request,
      httpOptions
    ).map(this.ExtractCliente);
  }

  ListxCel(obj: E_Cliente): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ListxCel",
      request,
      httpOptions
    ).map(this.ExtractCliente);
  }

  ListxEmaillNoPropio(obj: E_Cliente): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ListxEmaillNoPropio",
      request,
      httpOptions
    ).map(this.ExtractCliente);
  }

  ListxCelNoPropio(obj: E_Cliente): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ListxCelNoPropio",
      request,
      httpOptions
    ).map(this.ExtractCliente);
  }


  CrearUsuarioyClave(obj: E_Cliente): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/CrearUsuarioyClave",
      request,
      httpOptions
    ).map(this.ExtractCliente);
  }

  ListEmpresariasxGerenteSimple(obj: E_Cliente): Observable<Array<E_Cliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<Array<E_Cliente>>(
      this.UrlNow + "Cliente/ListEmpresariasxGerenteSimple",
      request,
      httpOptions
    );
  }

  ListEmpresariasxGerenteSimpleP(obj: E_Cliente): Observable<Array<E_Cliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),   
    };
    var request = JSON.stringify(obj);
    return this.Http.post<Array<E_Cliente>>(
      this.UrlNow + "Cliente/ListEmpresariasxGerenteSimpleP",
      request,
      httpOptions
    );
  }

  SolicitarToken(nit: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.Http.get<any>(
      this.UrlNow + "OTPToken/SolicitarToken?nit=" + nit,
      httpOptions
    );
  }


  //ListEmpresariasxGerenteSimple(obj: E_Cliente): Observable<Array<E_Cliente>> {
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   })
  // };
  // var request = JSON.stringify(obj)
  // return this.Http.post(this.UrlNow + "Cliente/ListEmpresariasxGerenteSimple"
  //   , request, httpOptions).map(this.ExtractClienteList)
  //}
  ListEmpresariasxGerentexEstado(obj: E_Cliente): Observable<Array<E_Cliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ListEmpresariasxGerentexEstado",
      request,
      httpOptions
    ).map(this.ExtractClienteEstadoList);
  }

  ListEmpresariasActivasxGerenteSimple(
    obj: E_Cliente
  ): Observable<Array<E_Cliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ListEmpresariasActivasxGerenteSimple",
      request,
      httpOptions
    ).map(this.ExtractClienteActivasList);
  }
  ListEmpresariasxLider(obj: E_Cliente): Observable<Array<E_Cliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ListEmpresariasxLider",
      request,
      httpOptions
    ).map(this.ExtractClienteLiderList);
  }


  ObtenerClientexNit(nit: string): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.Http.get<E_Cliente>(this.UrlNow + "Cliente/ObtenerClientexNit?nit=" + nit
      , httpOptions)
  }


  ObtenerMisClientesDirector(zona: string): Observable<Array<E_ClientesL>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.Http.get<Array<E_ClientesL>>(this.UrlNow + "Cliente/ObtenerMisClientesDirector?zona=" + zona
      , httpOptions)
  }

  ObtenerMisClientesLider(lider: string): Observable<Array<E_ClientesL>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.Http.get<Array<E_ClientesL>>(this.UrlNow + "Cliente/ObtenerMisClientesLider?lider=" + lider
      , httpOptions)
  }

  ListadoClientes(obj: E_Cliente): Observable<Array<E_Cliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<Array<E_Cliente>>(
      this.UrlNow + "Cliente/ListadoClientes",
      request,
      httpOptions
    );
  }
  ListadoClientesCredito(obj: E_Cliente): Observable<Array<E_Cliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<Array<E_Cliente>>(
      this.UrlNow + "Cliente/ListadoClientesCredito",
      request,
      httpOptions
    );
  }

  ListadoClientesCreditoLider(obj: E_Cliente): Observable<Array<E_Cliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<Array<E_Cliente>>(
      this.UrlNow + "Cliente/ListadoClientesCreditoLider",
      request,
      httpOptions
    );
  }

  ListEmpresariasxLiderLessInfo(obj: E_Cliente): Observable<Array<E_Cliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<Array<E_Cliente>>(
      this.UrlNow + "Cliente/ListEmpresariasxLiderLessInfo",
      request,
      httpOptions
    );
  }
  ListClientexEmpresaria(obj: E_Cliente): Observable<Array<E_Cliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<Array<E_Cliente>>(
      this.UrlNow + "Cliente/ListClientexEmp",
      request,
      httpOptions
    );
  }

  ListEmpresariasxLiderEstado(obj: E_Cliente): Observable<Array<E_Cliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ListEmpresariasxLiderEstado",
      request,
      httpOptions
    ).map(this.ExtractClienteLiderListEstado);
  }

  ListEmpresariasxLiderActivas(obj: E_Cliente): Observable<Array<E_Cliente>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ListEmpresariasxLiderActivas",
      request,
      httpOptions
    ).map(this.ExtractClienteLiderListActivas);
  }

  RegistrarEmpresaria(obj: E_Cliente): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/RegistrarEmpresaria",
      request,
      httpOptions
    ).map(this.ExtractCliente);
  }

  RegistrarPago(obj: E_DepositoP): Observable<E_DepositoP> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<E_DepositoP>(
      this.UrlNow + "DocumentoP/RegistrarDeposito",
      request,
      httpOptions
    );
  }

  ValidaDeposito(obj: E_DepositoP): Observable<E_DepositoP> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<E_DepositoP>(
      this.UrlNow + "DocumentoP/ConsultaDeposito",
      request,
      httpOptions
    );
  }
  //MRG: Carga la empresaria buscada en session con los parametros para hacer pedidos.
  ValidaExisteEmpresariaNombre(
    obj: E_Cliente
  ): Observable<E_SessionEmpresaria> {
    const httpOptions = this.HeaderBuilder.HeadNow();
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ValidaExisteEmpresariaNombre",
      request,
      httpOptions
    ).map(this.ExtractDataSessionEmpresariaValid);
  }

  ConsultaExisteEmpresariaNombre(obj: E_Cliente): Observable<E_Cliente> {
    const httpOptions = this.HeaderBuilder.HeadNow();
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ConsultaClientexNit",
      request,
      httpOptions
    ).map(this.ExtractDataSessionConsultaEmpresariaValid);
  }

  CargarDireccionTelefono(obj: E_Cliente): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<E_Cliente>(
      this.UrlNow + "Cliente/CargarDireccionTelefono",
      request,
      httpOptions
    );
  }

  CargarDireccionTelefonoPedido(pedido: string): Observable<DireccionXUsuario> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };  
    return this.Http.get<DireccionXUsuario>(
      this.UrlNow + `/Cliente/ObtenerDireccionXPedido?pedido=${pedido}`,
      httpOptions
    );
  }

  ObtenerDireccionesXUsuario(
    cedula: string
  ): Observable<Array<DireccionXUsuario>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.Http.get<Array<DireccionXUsuario>>(
      this.UrlNow + "Cliente/ObtenerDireccionesXUsuario?cedula=" + cedula,
      httpOptions
    );
  }

  ActualizarDireccion(obj: DireccionXUsuario): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<boolean>(
      this.UrlNow + "Cliente/ActualizarDireccion",
      request,
      httpOptions
    );
  }

  RegistrarDireccion(obj: DireccionXUsuario): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<boolean>(
      this.UrlNow + "Cliente/RegistrarDireccion",
      request,
      httpOptions
    );
  }

  ValidarTipoEnvioPedido(obj: E_Cliente): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ValidarTipoEnvioPedido",
      request,
      httpOptions
    ).map(this.ExtractCliente);
  }

  ActualizarDireccionTelefono(obj: E_Cliente): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ActualizarDireccionTelefono",
      request,
      httpOptions
    ).map(this.ExtractCliente);
  }

  ActualizarEmpresariaL(obj: E_Cliente): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post(
      this.UrlNow + "Cliente/ActualizarEmpresaria",
      request,
      httpOptions
    ).map(this.ExtractCliente);
  }

  ExtractCliente(res: Response): E_Cliente {
    var x: E_Cliente = new E_Cliente();
    if (res != null) {
      x = new ClienteBuilder().buildFromObject(res).Build();
    }
    return x;
  }

  ExtractClienteList(res: any): Array<E_Cliente> {
    var x: Array<E_Cliente> = new Array<E_Cliente>();
    if (res != null) {
      res.forEach((element) => {
        x.push(new ClienteBuilder().buildFromObject(element).Build());
      });
    }
    return x;
  }
  ExtractClienteEstadoList(res: any): Array<E_Cliente> {
    var x: Array<E_Cliente> = new Array<E_Cliente>();
    if (res != null) {
      res.forEach((element) => {
        x.push(new ClienteBuilder().buildFromObject(element).Build());
      });
    }
    return x;
  }

  ExtractClienteActivasList(res: any): Array<E_Cliente> {
    var x: Array<E_Cliente> = new Array<E_Cliente>();
    if (res != null) {
      res.forEach((element) => {
        x.push(new ClienteBuilder().buildFromObject(element).Build());
      });
    }
    return x;
  }
  ExtractClienteLiderList(res: any): Array<E_Cliente> {
    var x: Array<E_Cliente> = new Array<E_Cliente>();
    if (res != null) {
      res.forEach((element) => {
        x.push(new ClienteBuilder().buildFromObject(element).Build());
      });
    }
    return x;
  }
  ExtractClienteLiderListActivas(res: any): Array<E_Cliente> {
    var x: Array<E_Cliente> = new Array<E_Cliente>();
    if (res != null) {
      res.forEach((element) => {
        x.push(new ClienteBuilder().buildFromObject(element).Build());
      });
    }
    return x;
  }
  ExtractClienteLiderListEstado(res: any): Array<E_Cliente> {
    var x: Array<E_Cliente> = new Array<E_Cliente>();
    if (res != null) {
      res.forEach((element) => {
        x.push(new ClienteBuilder().buildFromObject(element).Build());
      });
    }
    return x;
  }

  ExtractDataSessionEmpresariaValid(res: object): E_SessionEmpresaria {
    var x: E_SessionEmpresaria = new E_SessionEmpresaria();

    if (res != null) {
      x = new SessionEmpresariaBuilder().buildFromObject(res).Build();
    }
    if (x.Error != undefined) {
      if (x.Error.Id == 1) {
        sessionStorage.removeItem("CurrentEmpresaria");
        return x;
      }
    }
    sessionStorage.setItem("CurrentEmpresaria", JSON.stringify(x));

    return x;
  }

  ExtractDataSessionConsultaEmpresariaValid(res: object): E_Cliente {
    var x: E_Cliente = new E_Cliente();
    if (res != null) {
      x = new ClienteBuilder().buildFromObject(res).Build();
    }
    return x;
  }

  GuardarImagenCliente(value, file: File): Observable<E_Cliente> {
    const extension = file.name.split(".")[1].toLowerCase();
    return new Observable((result) => {
      let formData = new FormData();
      formData.append("File", file, value + ".png");

      const options = {
        method: "POST",
        body: formData,
      };

      fetch(`${this.UrlNow + "Cliente/GuardarImagenCliente"}`, options).then(
        async (res) => {
          if (res.status === 200) {
            let data = await res.json();
            result.next(data);
          } else {
            result.error(res);
          }
        }
      );
    });
  }
  ActualizaClaveEmpresaria(obj: E_SessionUser): Observable<E_SessionUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<E_SessionUser>(
      this.UrlNow + "Cliente/ActualizaClaveEmpresaria",
      request,
      httpOptions
    );
  }
  ActualizaClaveDirectorLider(obj: E_SessionUser): Observable<E_SessionUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<E_SessionUser>(
      this.UrlNow + "Cliente/ActualizaClaveDirectorLider",
      request,
      httpOptions
    );
  }

  GuardarArchivoFTP(value, file: File): Observable<boolean> {
    const extension = file.name.split(".")[1].toLowerCase();
    return new Observable((result) => {
      let formData = new FormData();
      formData.append("File", file, value + "." + extension);

      const options = {
        method: "POST",
        body: formData,
      };

      fetch(`${this.UrlNow + "Cliente/GuardarArchivoFTP"}`, options).then(
        async (res) => {
          if (res.status === 200) {
            let data = await res.json();
            result.next(data);
          } else {
            result.error(res);
          }
        }
      );
    }).map(x => {return x as boolean});
  }
  CedulaValida(nit: string): Observable<boolean> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    return this.Http.get<boolean>(this.UrlNow + "Cliente/CedulaValida?nit=" + nit
        , httpOptions)
}

}
