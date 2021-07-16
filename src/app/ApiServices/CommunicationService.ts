
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Subject } from 'rxjs';
import { E_Eventos } from 'app/Models/E_Eventos';

@Injectable()
export class CommunicationService {

  constructor() { }
  generateCloseSearchProducts = new Subject<boolean>();
  public showLoader = new Subject<boolean>();
  public showLoaderArticulo = new Subject<boolean>();

  public ShowNewNotifications = new Subject<Array<E_Eventos>>();
  public validateUserAfterLogin = new Subject<boolean>();
  public onReloadImage = new Subject<boolean>();

}
