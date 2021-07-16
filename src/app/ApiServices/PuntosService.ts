import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_Puntos } from 'app/Models/E_Puntos';
import { PuntosBuilder } from 'app/Builders/Puntos.model.builder';
import { E_PuntosConceptos } from 'app/Models/E_PuntosConceptos';
import { EstadosClienteInfo } from 'app/Models/EstadosClienteInfo';


@Injectable()
export class PuntosService {


    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
    private UrlNow: string = AppSettings.Global().API
    private textarea: HTMLTextAreaElement;






    ListPuntosEmpresarias(obj: E_Puntos): Observable<Array<E_Puntos>> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          })
      };
      var request = JSON.stringify(obj)
      return this.Http.post(this.UrlNow + "Puntos/ListPuntosEmpresarias"
          , request, httpOptions).map(this.ExtractPuntosEmpresarias)
  }


  ListDetallePuntosEmpresarias(obj: E_Puntos): Observable<Array<E_Puntos>> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Puntos/ListDetallePuntosEmpresarias"
        , request, httpOptions).map(this.ExtractDetallePuntosEmpresarias)
}

ListarConceptosPuntos(): Observable<Array<E_PuntosConceptos>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
   
    return this.Http.get<Array<E_PuntosConceptos>>(this.UrlNow+"Puntos/ListConceptoPuntos",httpOptions)

}

getNivelesPuntos(): Observable<Array<E_Puntos>> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
 
  return this.Http.get<Array<E_Puntos>>(this.UrlNow+"Puntos/getNivelesPuntos",httpOptions)

}

ListEstadoCliente(): Observable<Array<EstadosClienteInfo>> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
 
  return this.Http.get<Array<EstadosClienteInfo>>(this.UrlNow+"Puntos/ListEstadoCliente",httpOptions)

}

AgregarConcepto(obj: E_PuntosConceptos): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow+"Puntos/AgregarConcepto",request,httpOptions)

  }

  agregarNivelPuntos(obj: E_Puntos): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow+"Puntos/agregarNivelPuntos",request,httpOptions)

  }

  actualizarConcepto(obj: E_PuntosConceptos): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow+"Puntos/actualizarConcepto",request,httpOptions)

  }

  eliminarNivelPuntos(obj: E_Puntos): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow+"Puntos/eliminarNivelPuntos",request,httpOptions)

  }


  agregarNivelPuntosCantidad(obj: E_Puntos): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow+"Puntos/agregarNivelPuntosCantidad",request,httpOptions)

  }

  eliminarNivelPuntosCantidad(obj: E_Puntos): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow+"Puntos/eliminarNivelPuntosCantidad",request,httpOptions)

  }

  getNivelesPuntosCantidad(): Observable<Array<E_Puntos>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
   
    return this.Http.get<Array<E_Puntos>>(this.UrlNow+"Puntos/getNivelesPuntosCantidad",httpOptions)
  
  }

  getTodaslasreglasPuntosporCategoria(): Observable<Array<E_Puntos>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
   
    return this.Http.get<Array<E_Puntos>>(this.UrlNow+"Puntos/getTodaslasreglasPuntosporCategoria",httpOptions)
  
  }

  getTodosMovimientoPuntosPorEmpresaria(Id:string): Observable<Array<E_Puntos>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
   
    return this.Http.get<Array<E_Puntos>>(this.UrlNow+"Puntos/getTodosMovimientoPuntosPorEmpresaria?Id="+Id,httpOptions)
  
  }

  getTotalPuntosPorEmpresaria(Id:string): Observable<E_Puntos> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
   
    return this.Http.get<E_Puntos>(this.UrlNow+"Puntos/getTotalPuntosPorEmpresaria2?Id="+Id,httpOptions)
  
  }

  actualizarRegla2(obj: E_Puntos): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow+"Puntos/actualizarRegla2",request,httpOptions)

  }

  insertarMovimientoPuntosGenerico(obj: E_Puntos): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow+"Puntos/insertarMovimientoPuntosGenerico",request,httpOptions)

  }

  insertarMovimientoPuntosGenericoList(obj: Array<E_Puntos>): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow+"Puntos/insertarMovimientoPuntosGenericoList",request,httpOptions)

  }

  HacerPuntos(obj: E_Puntos): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow+"Puntos/HacerPuntos",request,httpOptions)

  }


  ExtractPuntosEmpresarias(res: any): Array<E_Puntos> {
    var x: Array<E_Puntos> = new Array<E_Puntos>()
    if (res != null) {
        res.forEach((element) => {
            x.push(new PuntosBuilder().buildFromObject(element).Build())
        });

    }
    return x
  }
  ExtractDetallePuntosEmpresarias(res: any): Array<E_Puntos> {
    var x: Array<E_Puntos> = new Array<E_Puntos>()
    if (res != null) {
        res.forEach((element) => {
            x.push(new PuntosBuilder().buildFromObject(element).Build())
        });

    }
    return x
  }
}
