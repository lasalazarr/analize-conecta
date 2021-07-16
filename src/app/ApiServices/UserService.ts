import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { E_Usuario } from '../Models/E_Usuario';
import { UsuarioBuilder } from '../Builders/Usuario.model.builder';

import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { SessionUserBuilder } from 'app/Builders/SessionUser.model.builder';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
import { PdfInscripcion } from 'app/Models/PdfInscripcion';
import { PdfContrato } from 'app/Models/PdfContrato';


@Injectable()
export class UserService {
  constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
  private UrlNow: string = AppSettings.Global().API
  private textarea: HTMLTextAreaElement;

  /** Copy the text value to the clipboard. */
  //
  Login(User: E_Usuario): Observable<E_SessionUser> {
    const httpOptions = this.HeaderBuilder.HeadNow()
    var request = JSON.stringify(User)
    return this.Http.post(this.UrlNow + "AutenticationUser/LoginUserPasword"
      , request, httpOptions).map(this.ExtractDataSessionUserValid)

  }



  validarEmail(User: E_Usuario): Observable<E_Usuario> {
    //var IdUser = this.GetCurrentCurrentUserNow().Id
    ;
    const httpOptions = this.HeaderBuilder.HeadNow()
    var request = JSON.stringify(User)
    return this.Http.post(this.UrlNow + "Usuario/UsuarioxEmail"
      , request, httpOptions).map(this.ExtractDataUserValid)
  }


  UsuarioxNombre(User: E_Usuario): Observable<E_Usuario> {
    //var IdUser = this.GetCurrentCurrentUserNow().Id
    ;
    const httpOptions = this.HeaderBuilder.HeadNow()
    var request = JSON.stringify(User)
    return this.Http.post(this.UrlNow + "Usuario/UsuarioxNombre"
      , request, httpOptions).map(this.ExtractDataUser)
  }


  cambiarClave(User: E_Usuario): Observable<boolean> {
    /*var IdUser = this.GetCurrentCurrentUserNow().Id
        ;
    const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
    var request = JSON.stringify(User)
    return this.Http.post(this.UrlNow + "Usuario/cambiarContrasena"
        , request, httpOptions).map(this.EvalBool)*/
    return null;
  }

  crearUsuario(User: E_Usuario): Observable<boolean> {
    const httpOptions = this.HeaderBuilder.HeadNow()
    var request = JSON.stringify(User)
    return this.Http.post(this.UrlNow + "Usuario/crearUsuario"
      , request, httpOptions).map(this.EvalBool)
  }



  EvalBool(res: any): boolean {
    var a: boolean = res
    return a
  }


  ExtractDataUser(res: Response): E_Usuario {

    var x: E_Usuario = new E_Usuario()
    if (res != null) { x = new UsuarioBuilder().buildFromObject(res).Build() }
    return x
  }
  ExtractDataUserValid(res: object): E_Usuario {

    var x: E_Usuario = new E_Usuario()

    if (res != null) { x = new UsuarioBuilder().buildFromObject(res).Build() }
    if (x.Error != undefined) {
      if (x.Error.Id == 1) {
        sessionStorage.removeItem("CurrentUser")
        sessionStorage.removeItem("CurrentEmpresaria")
        return x
      }
    }
    sessionStorage.setItem("CurrentUser", JSON.stringify(x))
    sessionStorage.removeItem("CurrentEmpresaria")
    return x
  }

  ExtractDataSessionUserValid(res: object): E_SessionUser {

    var x: E_SessionUser = new E_SessionUser()

    if (res != null) { x = new SessionUserBuilder().buildFromObject(res).Build() }
    if (x.Error != undefined) {
      if (x.Error.Id == 1) {
        sessionStorage.removeItem("CurrentUser")
        return x
      }
    }
    sessionStorage.setItem("CurrentUser", JSON.stringify(x))

    return x
  }

  GetCurrentCurrentUserNow(): E_SessionUser {
    var retrievedObject = sessionStorage.getItem('CurrentUser');
    var x: E_SessionUser = JSON.parse(retrievedObject)
    return x
  }
  ClearCurrentCurrentUserNow() {
    sessionStorage.removeItem("CurrentUser")
  }

  GetCurrentCurrentEmpresariaNow(): E_SessionEmpresaria {
    var retrievedObject = sessionStorage.getItem('CurrentEmpresaria');
    var x: E_SessionEmpresaria = JSON.parse(retrievedObject)
    return x
  }
  ClearCurrentCurrentEmpresariaNow() {
    sessionStorage.removeItem("CurrentEmpresaria")
  }

  ImprimirIncripcion(input: PdfInscripcion): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType': 'blob'
      })
    };
    return this.Http.post(this.UrlNow + "Pdf/ImprimirIncripcion", JSON.stringify(input), {
      responseType: 'blob', headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Userid': UserId == undefined ? btoa("0") : btoa(UserId.toString()),
      })
    })


  }

  ImprimirContrato(input: PdfContrato): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType': 'blob'
      })
    };
    return this.Http.post(this.UrlNow + "Pdf/ImprimirContrato", JSON.stringify(input), {
      responseType: 'blob', headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Userid': UserId == undefined ? btoa("0") : btoa(UserId.toString()),
      })
    })


  }


}



