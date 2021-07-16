
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_ExceptionError } from 'app/Models/E_ExceptionError';
import { ExceptionErrorBuilder } from 'app/Builders/ExceptionError.model.builder';


@Injectable()
export class ExceptionErrorService {
    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
    private UrlNow: string = AppSettings.Global().API
    private textarea: HTMLTextAreaElement;



    RegistrarException(obj: E_ExceptionError): Observable<E_ExceptionError> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "ExceptionError/RegistrarException"
            , request, httpOptions).map(this.ExtractCliente)
    }

    ExtractCliente(res: Response): E_ExceptionError {
        var x: E_ExceptionError = new E_ExceptionError()
        if (res != null) { x = new ExceptionErrorBuilder().buildFromObject(res).Build() }
        return x
    }
}