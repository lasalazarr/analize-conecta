import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'app/app.settings';

@Injectable({
  providedIn: 'root'
})
export class NewRegisterService {
  urlController = `${AppSettings.Global().API}/Admin`
  constructor(
    private httpClient: HttpClient
  ) { }

  register(model: any) {
    return this.httpClient.post(`${this.urlController}/RegistrarPreregis`, model);
  }
}
