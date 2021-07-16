import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_CxC } from 'app/Models/E_CxC';
import { CxCBuilder } from 'app/Builders/CxC.model.builder';
import { E_VentasG } from 'app/Models/E_VentasG';


@Injectable()
export class CxCService {


    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
    private UrlNow: string = AppSettings.Global().API
    private textarea: HTMLTextAreaElement;






    ListCxCDirector(obj: E_CxC): Observable<Array<E_CxC>> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          })
      };
      var request = JSON.stringify(obj)
      return this.Http.post(this.UrlNow + "CxC/ListCxCDirector"
          , request, httpOptions).map(this.ExtractCarteraList)
  }

  ListCxCLider(obj: E_CxC): Observable<Array<E_CxC>> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "CxC/ListCxCLider"
        , request, httpOptions).map(this.ExtractCarteraListLider)
}

ListCxCEmpresarias(obj: E_CxC): Observable<Array<E_CxC>> {
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
  };
  var request = JSON.stringify(obj)
  return this.Http.post<Array<E_CxC>>(this.UrlNow + "CxC/ListCxCEmpresaria"
      , request, httpOptions)
}

ListCarteraEdad(obj: E_CxC): Observable<Array<E_VentasG>> {
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
  };
  var request = JSON.stringify(obj)
  return this.Http.post<Array<E_VentasG>>(this.UrlNow + "CxC/EdadCartera"
      , request, httpOptions)
}

CarteraNit(obj: E_CxC): Observable<E_CxC> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<E_CxC>(
      this.UrlNow + "CxC/CarteraNit",
      request,
      httpOptions
    );
  }

  ExtractCarteraList(res: any): Array<E_CxC> {
    var x: Array<E_CxC> = new Array<E_CxC>()
    if (res != null) {
        res.forEach((element) => {
            x.push(new CxCBuilder().buildFromObject(element).Build())
        });

    }
    return x
  }
  ExtractCarteraListLider(res: any): Array<E_CxC> {
    var x: Array<E_CxC> = new Array<E_CxC>()
    if (res != null) {
        res.forEach((element) => {
            x.push(new CxCBuilder().buildFromObject(element).Build())
        });

    }
    return x
  }

  CarteraCliente(obj: E_CxC): Observable<E_CxC> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    var request = JSON.stringify(obj);
    return this.Http.post<E_CxC>(
      this.UrlNow + "CxC/CarteraNit",
      request,
      httpOptions
    );
  }
}
