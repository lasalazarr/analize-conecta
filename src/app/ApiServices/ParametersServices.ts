
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { E_Usuario } from '../Models/E_Usuario';
import { UsuarioBuilder } from '../Builders/Usuario.model.builder';

import { E_Regional } from '../Models/E_Regional';
import { RegionalBuilder } from '../Builders/Regional.model.builder';


import { UserService } from 'app/ApiServices/UserService';
import { HeaderBuilder } from 'app/Tools/HeaderBuilder';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { E_Eventos } from 'app/Models/E_Eventos';
import { EventosBuilder } from 'app/Builders/Eventos.model.builder';
import { E_Vendedor } from 'app/Models/E_Vendedor';
import { VendedorBuilder } from 'app/Builders/Vendedor.model.builder';
import { E_Lider } from 'app/Models/E_Lider';
import { LiderBuilder } from 'app/Builders/Lider.model.builder';
import { E_TipoDocumento } from 'app/Models/E_TipoDocumento';
import { TipoDocumentoBuilder } from 'app/Builders/TipoDocumento.model.builder';
import { E_Provincia } from 'app/Models/E_Provincia';
import { ProvinciaBuilder } from 'app/Builders/Provincia.model.builder';
import { E_Canton } from 'app/Models/E_Canton';
import { CantonBuilder } from 'app/Builders/Canton.model.builder';
import { E_Parroquia } from 'app/Models/E_Parroquia';
import { ParroquiaBuilder } from 'app/Builders/Parroquia.model.builder';
import { E_Parametros } from 'app/Models/E_Parametros';
import { ParametrosBuilder } from 'app/Builders/Parametros.model.builder';
import { E_Catalogo } from 'app/Models/E_Catalogo';
import { CatalogoBuilder } from 'app/Builders/Catalogo.model.builder';
import { E_Ciudad } from 'app/Models/E_Ciudad';
import { CiudadBuilder } from 'app/Builders/Ciudad.model.builder';
import { E_PLU } from 'app/Models/E_PLU';
import { PLUBuilder } from 'app/Builders/PLU.model.builder';
import { ResponseBase } from 'app/Models/ResponseBase';
import { E_Zona } from 'app/Models/Zona';
import { E_PuntosEnvio } from 'app/Models/E_PuntosEnvio';
import { E_Puntos } from 'app/Models/E_Puntos';
import { E_Bodegas } from 'app/Models/E_Bodegas';

@Injectable()
export class ParameterService {

  constructor(private Http: HttpClient, private UserService: UserService, private HeaderBuilder: HeaderBuilder) { }
  private UrlNow: string = AppSettings.Global().API
  //private UrlNow: string = 'http://localhost/Application.Enterprise.Services/api/';
  private textarea: HTMLTextAreaElement;


  //-------------------------------------------------------------------------
  //List Methods

  listarRegional(obj: E_SessionUser): Observable<Array<E_Regional>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Regional/ListarRegional"
      , request, httpOptions).map(this.ExtractRegional)
  }
  listarRegionalxzona(obj: E_SessionUser): Observable<Array<E_Regional>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Regional/ListadoRegionalxZona"
      , request, httpOptions).map(this.ExtractRegional)
  }
  listarVendedor(obj: E_SessionUser): Observable<Array<E_Vendedor>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Vendedor/LoadZonasxRegion"
      , request, httpOptions).map(this.ExtractVendedor)
  }

  listarLider(obj: E_SessionUser): Observable<Array<E_Lider>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Lider/ListarLider"
      , request, httpOptions).map(this.ExtractLider)
  }

  listarLideres(): Observable<Array<E_Lider>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.Http.get(this.UrlNow + 'Lider/listar', httpOptions).map(this.ExtractLider)
  }

  listarLideresXIds(idsLeaders: string[]): Observable<Array<E_Lider>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.Http.post(this.UrlNow + 'Lider/ListarXIds', idsLeaders,  httpOptions).map(this.ExtractLider);
  }

  listarTipoDocumento(obj: E_SessionUser): Observable<Array<E_TipoDocumento>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "TipoDocumento/ListarTipoDocumento"
      , request, httpOptions).map(this.ExtractTipoDocumento)
  }


  listarProvincia(): Observable<Array<E_Provincia>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.Http.get(this.UrlNow + "Provincia/ListarProvincia"
      , httpOptions).map(this.ExtractProvincia)
  }

  listarCanton(obj: E_Provincia): Observable<Array<E_Canton>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Canton/ListarCanton"
      , request, httpOptions).map(this.ExtractCanton)
  }

  listarParroquia(obj: E_Canton): Observable<Array<E_Parroquia>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Parroquia/ListarParroquia"
      , request, httpOptions).map(this.ExtractParroquia)
  }


  listarParametrosxId(obj: E_Parametros): Observable<E_Parametros> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Parametros/ListarParametrosxId"
      , request, httpOptions).map(this.ExtractParametros)
  }

  UpdateParametro(obj: E_Parametros): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow+"Parametros/UpdateParametro",request,httpOptions)

  }

  listarParametros(): Observable<Array<E_Parametros>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    
    return this.Http.get(this.UrlNow + "Parametros/ListarParametros"
      , httpOptions).map(this.ExtractParametrosList)
  }

  //Pueden usar este metodo para no usar BUILDERS porque eso es muy mamon xD att. Juta
  public RegionxId(id: number): Observable<E_Regional> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const httpOptions = this.HeaderBuilder.HeadNow()
    return this.Http.get<E_Regional>(this.UrlNow + '/Regional/RegionalxId?id=' + id
      , httpOptions).map(x => { return x });
  }

  public RegionxZona(zona: string): Observable<E_Regional> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const httpOptions = this.HeaderBuilder.HeadNow()
    return this.Http.get<E_Regional>(this.UrlNow + '/Regional/RegionalxZona?Zona=' + zona
      , httpOptions).map(x => { return x });
  }
  public ZonaxId(id: string): Observable<E_Zona> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const httpOptions = this.HeaderBuilder.HeadNow()
    return this.Http.get<E_Zona>(this.UrlNow + '/Parametros/ZonaxId?id=' + id
      , httpOptions).map(x => { return x });
  }

  public VendedorxId(id: string): Observable<E_Vendedor> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const httpOptions = this.HeaderBuilder.HeadNow()
    return this.Http.get<E_Vendedor>(this.UrlNow + '/Vendedor/VendedorxId?id=' + id
      , httpOptions).map(x => { return x });
  }

  listarCatalogo(obj: E_SessionUser): Observable<Array<E_Catalogo>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Catalogo/ListarCatalogo"
      , request, httpOptions).map(this.ExtractCatalogo)
  }


  ListarCiudad(obj: E_Ciudad): Observable<E_Ciudad> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Ciudad/ListarCiudad"
      , request, httpOptions).map(this.ExtractCiudad)
  }


  ListarxCodigoRapido(obj: E_PLU): Observable<E_PLU> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "PLU/ListarxCodigoRapido"
      , request, httpOptions).map(this.ExtractPLU)
  }

  ListarPlu(obj: E_PLU): Observable<E_PLU> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<E_PLU>(this.UrlNow + "PLU/ListarPlu"
        , request, httpOptions)
}

listarBodegaReserva(obj: E_Bodegas): Observable<Array<E_Bodegas>> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  var request = JSON.stringify(obj)
  return this.Http.post<Array<E_Bodegas>>(this.UrlNow + "Cliente/ListBodegasReserva"
    , request, httpOptions)
}



  ActualizarLider(obj: E_Lider): Observable<E_Lider> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Parametros/ActualizaPerfilLider"
      , request, httpOptions).map(this.ExtractLideres)
  }

  ActualizarDirector(obj: E_Vendedor): Observable<E_Vendedor> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Parametros/ActualizaPerfilVendedor"
      , request, httpOptions).map(this.ExtractDirector)
  }

  ListEventos(obj: E_Eventos): Observable<Array<E_Eventos>> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<Array<E_Eventos>>(this.UrlNow + "Eventos/ListEventosLider"
        , request, httpOptions)
}

ListEventosNit(obj: E_Eventos): Observable<Array<E_Eventos>> {
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
  };
  var request = JSON.stringify(obj)
  return this.Http.post<Array<E_Eventos>>(this.UrlNow + "Eventos/ListEventosNit"
      , request, httpOptions)
}
ListEventosDirector(obj: E_Eventos): Observable<Array<E_Eventos>> {
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
  };
  var request = JSON.stringify(obj)
  return this.Http.post<Array<E_Eventos>>(this.UrlNow + "Eventos/ListEventosDirector"
      , request, httpOptions)
}

ListPuntosEnvio(obj: E_SessionUser): Observable<Array<E_PuntosEnvio>> {
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
  };
  var request = JSON.stringify(obj)
  return this.Http.post<Array<E_PuntosEnvio>>(this.UrlNow + "Parametros/ListPuntosEnvio"
      , request, httpOptions)
}
  ExtractLideres(res: Response): E_Lider {
    var x: E_Lider = new E_Lider()
    if (res != null) { x = new LiderBuilder().buildFromObject(res).Build() }
    return x
  }

  ExtractDirector(res: Response): E_Vendedor {
    var x: E_Vendedor = new E_Vendedor()
    if (res != null) { x = new VendedorBuilder().buildFromObject(res).Build() }
    return x
  }

  ExtractRegional(res: any): Array<E_Regional> {
    var x: Array<E_Regional> = new Array<E_Regional>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new RegionalBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }


  ExtractVendedor(res: any): Array<E_Vendedor> {
    var x: Array<E_Vendedor> = new Array<E_Vendedor>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new VendedorBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }

  ExtractLider(res: any): Array<E_Lider> {
    var x: Array<E_Lider> = new Array<E_Lider>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new LiderBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }

  ExtractTipoDocumento(res: any): Array<E_TipoDocumento> {
    var x: Array<E_TipoDocumento> = new Array<E_TipoDocumento>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new TipoDocumentoBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }

  ExtractProvincia(res: any): Array<E_Provincia> {
    var x: Array<E_Provincia> = new Array<E_Provincia>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new ProvinciaBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }

  ExtractCanton(res: any): Array<E_Canton> {
    var x: Array<E_Canton> = new Array<E_Canton>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new CantonBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }


  ExtractParroquia(res: any): Array<E_Parroquia> {
    var x: Array<E_Parroquia> = new Array<E_Parroquia>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new ParroquiaBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }

  ExtractParametrosList(res: any): Array<E_Parametros> {
    var x: Array<E_Parametros> = new Array<E_Parametros>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new ParametrosBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }

  ExtractParametros(res: Response): E_Parametros {
    var x: E_Parametros = new E_Parametros()
    if (res != null) { x = new ParametrosBuilder().buildFromObject(res).Build() }
    return x
  }

  ExtractCatalogo(res: any): Array<E_Catalogo> {
    var x: Array<E_Catalogo> = new Array<E_Catalogo>()
    if (res != null) {
      res.forEach((element) => {
        x.push(new CatalogoBuilder().buildFromObject(element).Build())
      });

    }
    return x
  }

  ExtractCiudad(res: Response): E_Ciudad {
    var x: E_Ciudad = new E_Ciudad()
    if (res != null) { x = new CiudadBuilder().buildFromObject(res).Build() }
    return x
  }

  ExtractPLU(res: Response): E_PLU {
    var x: E_PLU = new E_PLU()
    if (res != null) { x = new PLUBuilder().buildFromObject(res).Build() }
    return x
  }

  ListCatalogoActual(obj: E_PLU): Observable<Array<E_PLU>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<Array<E_PLU>>(this.UrlNow + "PLU/ListCatalogoActual"
      , request, httpOptions)
  }

  AddParameter(param:E_Parametros) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.Http.post<any>(this.UrlNow + 'Parametros/CreateParametro', param, httpOptions)
                    .toPromise().then(response => {
      return response;
    });
  }

}


