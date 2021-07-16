import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_Ventas } from 'app/Models/E_Ventas';
import { VentasBuilder } from 'app/Builders/Ventas.model.builder';
import { E_VentasG } from 'app/Models/E_VentasG';
import { E_CxC } from 'app/Models/E_CxC';
import { VentasGBuilder } from 'app/Builders/VentasG.model.builder';
import { DatosSemana } from 'app/Models/DatosSemana';
import { E_DatosComision } from 'app/Models/DatosComision';
import { E_DetalleComision } from 'app/Models/DatosDetalleComision';


@Injectable()
export class VentasService {


    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
    private UrlNow: string = AppSettings.Global().API
    private textarea: HTMLTextAreaElement;


    VentaLiderMes(obj: E_Ventas): Observable<E_Ventas> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          })
      };
      var request = JSON.stringify(obj)
      return this.Http.post<E_Ventas>(this.UrlNow + "Ventas/VentaLiderMes"
          , request, httpOptions)
    }
    FacturasLiderMes(obj: E_Ventas): Observable<E_Ventas> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          })
      };
      var request = JSON.stringify(obj)
      return this.Http.post<E_Ventas>(this.UrlNow + "Ventas/FacturasLiderMes"
          , request, httpOptions)
    }
    VentaEmpresariaMes(obj: E_Ventas): Observable<E_Ventas> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          })
      };
      var request = JSON.stringify(obj)
      return this.Http.post<E_Ventas>(this.UrlNow + "Ventas/VentaEmpresariaMes"
          , request, httpOptions)
    }

    FacturasMesEmpresaria(obj: E_Ventas): Observable<E_Ventas> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          })
      };
      var request = JSON.stringify(obj)
      return this.Http.post<E_Ventas>(this.UrlNow + "Ventas/FacturasMesEmpresaria"
          , request, httpOptions)
    }
    VentaZonaMes(obj: E_Ventas): Observable<E_Ventas> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          })
      };
      var request = JSON.stringify(obj)
      return this.Http.post<E_Ventas>(this.UrlNow + "Ventas/VentaZonaMes"
          , request, httpOptions)
    }
    FacturasZonaMes(obj: E_Ventas): Observable<E_Ventas> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          })
      };
      var request = JSON.stringify(obj)
      return this.Http.post<E_Ventas>(this.UrlNow + "Ventas/FacturasZonaMes"
          , request, httpOptions)
    }


    VentasxLiderxMes(obj: E_Ventas): Observable<Array<E_Ventas>> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          })
      };
      var request = JSON.stringify(obj)
      return this.Http.post(this.UrlNow + "Ventas/ListxLiderxMes"
          , request, httpOptions).map(this.ExtractVentasLider)
  }

  VentasxZonaxMes(obj: E_Ventas): Observable<Array<E_Ventas>> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<Array<E_Ventas>>(this.UrlNow + "Ventas/ListxZonaxMes"
        , request, httpOptions)
}


VentaspromoJJ(obj: E_Ventas): Observable<Array<E_Ventas>> {
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
  };
  var request = JSON.stringify(obj)
  return this.Http.post<Array<E_Ventas>>(this.UrlNow + "Ventas/ListxLiderxJJ"
      , request, httpOptions)
}
VentasxZonaxAnio(obj: E_Ventas): Observable<Array<E_VentasG>> {
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
  };
  var request = JSON.stringify(obj)
  return this.Http.post<Array<E_VentasG>>(this.UrlNow + "Ventas/ListxZonaxAnio"
      , request, httpOptions)
}

  VentasxLiderxAnio(obj: E_Ventas): Observable<Array<E_VentasG>> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    var request = JSON.stringify(obj)
    return this.Http.post(this.UrlNow + "Ventas/ListxLiderxAnio"
        , request, httpOptions).map(this.ExtractVentasLiderAnio)
}








  ExtractVentasLider(res: any): Array<E_Ventas> {
    var x: Array<E_Ventas> = new Array<E_Ventas>()
    if (res != null) {
        res.forEach((element) => {
            x.push(new VentasBuilder().buildFromObject(element).Build())
        });

    }
    return x
  }
  ExtractVentasLiderAnio(res: any): Array<E_VentasG> {
    var x: Array<E_VentasG> = new Array<E_VentasG>()
    if (res != null) {
        res.forEach((element) => {
            x.push(new VentasGBuilder().buildFromObject(element).Build())
        });

    }
    return x
  }
  VentasxLiderxSemana(obj: DatosSemana): Observable<Array<DatosSemana>> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    var request = JSON.stringify(obj)
  return this.Http.post<Array<DatosSemana>>(this.UrlNow + "Ventas/VentaxLiderxSemanal"
      , request, httpOptions)
    }

    DetalleComisionLider(obj: E_DetalleComision): Observable<Array<E_DetalleComision>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
      return this.Http.post<Array<E_DetalleComision>>(this.UrlNow + "Ventas/ComisionDetallexLider"
          , request, httpOptions)
        }

        
    ComisionLider(obj: E_DatosComision): Observable<Array<E_DatosComision>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
      return this.Http.post<Array<E_DatosComision>>(this.UrlNow + "Ventas/ComisionxLider"
          , request, httpOptions)
        }
        ComisionDirector(obj: E_DatosComision): Observable<Array<E_DatosComision>> {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            };
            var request = JSON.stringify(obj)
          return this.Http.post<Array<E_DatosComision>>(this.UrlNow + "Ventas/ComisionxDirector"
              , request, httpOptions)
            }

    VentasxZonaxSemana(obj: DatosSemana): Observable<Array<DatosSemana>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
      return this.Http.post<Array<DatosSemana>>(this.UrlNow + "Ventas/VentaxZonaxSemanal"
          , request, httpOptions)
        }

        VentaxZonayLiderxSemanal(obj: DatosSemana): Observable<Array<DatosSemana>> {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            };
            var request = JSON.stringify(obj)
          return this.Http.post<Array<DatosSemana>>(this.UrlNow + "Ventas/VentaxZonayLiderxSemanal"
              , request, httpOptions)
            }
}
