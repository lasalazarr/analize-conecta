import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_CxC } from 'app/Models/E_CxC';
import { CxCBuilder } from 'app/Builders/CxC.model.builder';
import { E_VentasG } from 'app/Models/E_VentasG';
import { HomeConfiguration } from 'app/Models/HomeConfiguration';
import { SolicitudCredito } from 'app/Models/SolicitudCredito';
import { DtoCredito } from 'app/main/content/credito/credito-list/credito-list.component';
import { InformacionCreditos } from 'app/Models/InformacionCreditos';
import { E_CatalogoFile } from 'app/Models/E_CatalogoFile';
import { CarteraReporteInfo } from 'app/Models/CarteraReporteInfo';
import { CarteraReportePrimeNG } from 'app/Models/CarteraReportePrimeNG';
import { CarteraReportePerfil } from 'app/Models/CarteraReportePerfil';
import { EquisfaxM } from 'app/Models/equisfax';
import { ValidarCredito } from 'app/Models/ValidarCredito';
import { E_Cliente } from 'app/Models/E_Cliente';
import { E_SaldosB } from 'app/Models/E_SaldosB';
import { E_CorteInventario } from 'app/Models/E_CorteInventario';



@Injectable()
export class AdminService {



  constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
  private UrlNow: string = AppSettings.Global().API
  private textarea: HTMLTextAreaElement;






  RegistrarConfiguracion(obj: HomeConfiguration): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow + "Admin/RegistrarConfiguracion"
      , request, httpOptions)
  }

  ObtenerHomeConfig(): Observable<Array<HomeConfiguration>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.Http.get<Array<HomeConfiguration>>(this.UrlNow + "Admin/ObtenerHomeConfig"
      , httpOptions)
  }
  ActualizarHomeConfig(obj: HomeConfiguration): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow + "Admin/ActualizarHomeConfig"
      , request, httpOptions)
  }


  BorrarConfiguracion(obj: HomeConfiguration): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow + "Admin/BorrarConfiguracion"
      , request, httpOptions)
  }


  ListGenero(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.Http.get<any>(this.UrlNow + "PLU/ListGenero"
      , httpOptions)
  }

  ListCategoriaXGenero(genero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify({ Genero: genero })
    return this.Http.post<any>(this.UrlNow + "PLU/ListCategoriaXGenero"
      , request, httpOptions)
  }

  ListGruposXGeneroXCategoria(genero, categoria): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify({ Genero: genero, Categoria: categoria })
    return this.Http.post<any>(this.UrlNow + "PLU/ListGruposXGeneroXCategoria"
      , request, httpOptions)
  }


  GuardarImagenHome(item, file: File): Observable<any> {
    const extension = file.name.split(".")[1].toLowerCase();
    return new Observable((result) => {
      let formData = new FormData();
      formData.append("File", file, item);

      const options = {
        method: "POST",
        body: formData,
      };

      fetch(`${this.UrlNow + "Admin/GuardarImagenHome"}`, options).then(
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


  ObtenerDatosPDF(obj: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.get<any>(this.UrlNow + "Admin/ObtenerDatosPDF?nit=" + obj
      , httpOptions)
  }

  RegistrarSolicitudCredito(SolicitudCredito: SolicitudCredito): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(SolicitudCredito)
    return this.Http.post<any>(this.UrlNow + "Admin/RegistrarSolicitudCredito"
      , request, httpOptions)
  }

  equisfax(entrada: EquisfaxM): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(entrada)
    return this.Http.post<any>(this.UrlNow + "Admin/EquisFax"
      , request, httpOptions)
  }

  ValidarCreditos(entrada: ValidarCredito): Observable<E_Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(entrada)
    return this.Http.post<any>(this.UrlNow + "Admin/ValidarCredito"
      , request, httpOptions)
  }


  ActualizarDocumentoCredito(inputSolicitud: SolicitudCredito): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(inputSolicitud)
    return this.Http.post<any>(this.UrlNow + "Admin/ActualizarDocumentoCredito"
      , request, httpOptions)
  }
  ActualizarCalificacionCredito(SolicitudCredito: SolicitudCredito): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(SolicitudCredito)
    return this.Http.post<any>(this.UrlNow + "Admin/ActualizarCalificacionCredito"
      , request, httpOptions)
  }



  ValidarSolicitudCredito(obj: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.get<boolean>(this.UrlNow + "Admin/ValidarSolicitudCredito?cedula=" + obj
      , httpOptions)
  }

  ObtenerSolicitudesCredito(input: DtoCredito): Observable<Array<InformacionCreditos>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(input)
    return this.Http.post<Array<InformacionCreditos>>(this.UrlNow + "Admin/ObtenerSolicitudesCredito"
      , request, httpOptions)
  }

  SubirCatalogo(input: Array<E_CatalogoFile>): Observable<boolean> {
    debugger
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(input)
    return this.Http.post<boolean>(this.UrlNow + "Catalogo/InsertCatalogoMasivo"
      , request, httpOptions)
  }

  GetCarteraGeneral(entrada:string): Observable<Array<CarteraReporteInfo>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
   
    return this.Http.get<Array<CarteraReporteInfo>>(this.UrlNow+"CxC/GetReporteCareta?Id="+entrada,httpOptions)
  
  }

  GetReporteCaretaCoordinador(entrada:string): Observable<Array<CarteraReportePerfil>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
   
    return this.Http.get<Array<CarteraReportePerfil>>(this.UrlNow+"CxC/GetReporteCaretaCoordinador?Id="+entrada,httpOptions)
  
  }

  ObtenerSaldoBodega(bodega: string, mes: string): Observable<Array<E_SaldosB>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.Http.get<Array<E_SaldosB>>(this.UrlNow + "Admin/ObtenerSaldosxBodega?bodega=" + bodega + "&mes=" + mes
      , httpOptions)
  }

  RegistrarCorteInventario(obj: E_CorteInventario): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var request = JSON.stringify(obj)
    return this.Http.post<boolean>(this.UrlNow + "Admin/RegistrarCorteInventario"
      , request, httpOptions)
  }
  ObtenerCorteInventario(): Observable<Array<E_CorteInventario>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.Http.get<Array<E_CorteInventario>>(this.UrlNow + "Admin/ObtenerCorteInventario"
      , httpOptions)
  }
}
