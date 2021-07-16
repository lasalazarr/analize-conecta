import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PuntosService } from 'app/ApiServices/PuntosService';
import { E_Puntos } from 'app/Models/E_Puntos';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { UserService } from 'app/ApiServices/UserService';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Eventos } from 'app/Models/E_Eventos';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { MatTableDataSource } from '@angular/material';
import _ from 'lodash';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
import { E_Cliente } from 'app/Models/E_Cliente';

@Component({
  selector: 'fuse-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class FuseToolbarComponent implements OnInit {
  displayedColumns: string[] = ['PuntosTotal'];
  public SessionUser: E_SessionUser = new E_SessionUser()
  dataSource: MatTableDataSource<E_Puntos>;
  public ListPuntos: Array<E_Puntos> = new Array<E_Puntos>()
  userStatusOptions: any[];
  languages: any;
  viewImage
  selectedLanguage: any;
  showLoadingBar: boolean;
  horizontalNav: boolean;
  noNav: boolean;
  nombreT: string;
  rutaperfil: string;
  imagenperfil: string;
  ImageAvatar: string;
  Region: string;
  chat: string;
  constructor(
    private router: Router,
    private fuseConfig: FuseConfigService,
    private PuntosService: PuntosService,
    private sidebarService: FuseSidebarService,
    private translate: TranslateService, private UserService: UserService,
    private parameterService: ParameterService,
    private communicationService: CommunicationService,
    private clienteservice: ClienteService
  ) {
    this.userStatusOptions = [
      {
        'title': 'Online',
        'icon': 'icon-checkbox-marked-circle',
        'color': '#4CAF50'
      },
      {
        'title': 'Away',
        'icon': 'icon-clock',
        'color': '#FFC107'
      },
      {
        'title': 'Do not Disturb',
        'icon': 'icon-minus-circle',
        'color': '#F44336'
      },
      {
        'title': 'Invisible',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#BDBDBD'
      },
      {
        'title': 'Offline',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#616161'
      }
    ];

    this.languages = [

      {
        'id': 'ec',
        'title': 'Ecuador',
        'flag': 'ec'
      }
      /*{
          'id'   : 'en',
          'title': 'English',
          'flag' : 'us'
      },
      /*{
          'id'   : 'tr',
          'title': 'Turkish',
          'flag' : 'tr'
      }*/
    ];

    this.selectedLanguage = this.languages[0];

    router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.showLoadingBar = true;
        }
        if (event instanceof NavigationEnd) {
          this.showLoadingBar = false;
        }
      });

    this.fuseConfig.onConfigChanged.subscribe((settings) => {
      this.horizontalNav = settings.layout.navigation === 'top';
      this.noNav = settings.layout.navigation === 'none';
    });

  }

  ngOnInit(): void {
    var x = this.UserService.GetCurrentCurrentUserNow();
    this.SessionUser = x
    this.reloadImage();
    if (x != null) {
      this.nombreT = x.NombreUsuario;
      this.rutaperfil = "https://imagenesapp.lineadirectaec.com/assets/images/avatars/"
      if (x.Imagen != "") {
        this.imagenperfil = x.Imagen;
      }
      else {
        this.imagenperfil = "profile.jpg"
      }
    }
    this.communicationService.onReloadImage.subscribe(() => this.reloadImage())
    this.setWasap()
  }

  setWasap() {
    var objClienteResquest: E_Cliente = new E_Cliente()
    if (_.isNil(this.SessionUser.Cedula)) {
      this.SessionUser.Cedula = '1792451132001'
    }
    objClienteResquest.Nit = this.SessionUser.Cedula
    objClienteResquest.Vendedor = this.SessionUser.IdVendedor
    let numerocel = "";
    if (this.SessionUser.IdGrupo == '50' || this.SessionUser.IdGrupo == '80') {
      this.clienteservice.ValidaExisteEmpresariaNombre(objClienteResquest).subscribe((x: E_SessionEmpresaria) => {
        if (x.Error == undefined) {
          numerocel = x.Celular2;
          this.chat = "https://api.whatsapp.com/send?phone=593" + numerocel + "&text=&source=&data=";
        }
      })
    } else {
      this.parameterService.RegionxZona(this.SessionUser.IdVendedor).subscribe((x) => {
        //

        numerocel = x.Telefono;
        this.chat = "https://api.whatsapp.com/send?phone=593" + numerocel + "&text=&source=&data=";

      });
    }


  }
  private reloadImage() {
    if (!_.isNil(this.SessionUser)) {
      this.ImageAvatar = this.SessionUser.Cedula + ".png?" + Math.random();
    }
  }

  AbrirInfoUsuario() {
    this.router.navigate(['/perfil'])
  }
  toggleSidebarOpened(key) {
    this.sidebarService.getSidebar(key).toggleOpen();
  }

  CerrarSesion() {
    localStorage.removeItem("UserSaveRemember")
    this.router.navigate(['/login'])
  }
  AbrirPuntos() {
    this.router.navigate(['/mispuntos'])
  }
  search(value) {
    // Do your search here...
    console.log(value);
  }

  setLanguage(lang) {
    // Set the selected language for toolbar
    //MRG:Habilitar para idioma
    //*this.selectedLanguage = lang;

    // Use the selected language for translations
    //MRG:Habilitar para idioma
    //*this.translate.use(lang.id);
  }
  SearchNotifications() {
    let SessionUser = this.UserService.GetCurrentCurrentUserNow()
    var objEventos: E_Eventos = new E_Eventos()
    objEventos.Lider = SessionUser.IdLider;
    objEventos.Vendedor = SessionUser.IdVendedor;
    objEventos.Nit = SessionUser.Cedula;
    if (SessionUser.IdGrupo === '60') {
      this.parameterService.ListEventos(objEventos)
        .subscribe((response: Array<E_Eventos>) => {
          this.communicationService.ShowNewNotifications.next(response)
        })
    }
    else {
      if (SessionUser.IdGrupo === '52') {
        this.parameterService.ListEventosDirector(objEventos)
          .subscribe((response: Array<E_Eventos>) => {
            this.communicationService.ShowNewNotifications.next(response)
          })
      } else {
        this.parameterService.ListEventosNit(objEventos)
          .subscribe((response: Array<E_Eventos>) => {
            this.communicationService.ShowNewNotifications.next(response)
          })
      }
    }
  }
  AbrirCambioContrasena() {
    this.router.navigate(['/cambiocontrasena'])
  }
}
