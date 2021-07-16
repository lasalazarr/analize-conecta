import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../ApiServices/UserService';
import { ParameterService } from '../../ApiServices/ParametersServices';
import { E_Eventos } from 'app/Models/E_Eventos';
import { E_Vendedor } from 'app/Models/E_Vendedor';
import { forkJoin } from 'rxjs';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import _ from 'lodash';
import moment from 'moment';

@Component({
  selector: 'fuse-quick-panel',
  templateUrl: './quick-panel.component.html',
  styleUrls: ['./quick-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FuseQuickPanelComponent implements OnInit {
  date: Date;
  settings: any;
  notes = [];
  events = [];
  public SessionUser: E_SessionUser = new E_SessionUser();
  public ListEventos: Array<E_Eventos> = new Array<E_Eventos>();

  constructor(
    private UserService: UserService,
    private communication: CommunicationService
  ) {
    this.date = new Date();
    this.settings = {
      notify: true,
      cloud: false,
      retro: true
    };
  }

  ngOnInit() {

    this.communication.ShowNewNotifications.subscribe(event => {
      _.forEach(event, eventos => {
        var a = moment(new Date());
        var b = moment(eventos.Fecha);
        eventos.RemainingDays = a.diff(b, 'days')
      })
      this.ListEventos = event
    })
  }



}
