import { Component, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

/*import { navigation } from 'app/navigation/navigation';*/
import { navigation,navigationAdmin, navigationGeneral, navigationGeneralEmpre, navigationClienteFinal, navigationGeneralSac, navigationGeneralLider, navigationDelivery } from 'app/navigation/navigation';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { UserService } from 'app/ApiServices/UserService';
import { VentasService } from 'app/ApiServices/VentasService';
import { E_Ventas } from 'app/Models/E_Ventas';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'fuse-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FuseNavbarComponent implements OnDestroy {
  private fusePerfectScrollbar: FusePerfectScrollbarDirective;
  userInfo: E_SessionUser;
  ObjVentas: E_Ventas;
  NombreCliente: string;
  ValorVentas: number;
  CantidadFacturas: number;

  @ViewChild(FusePerfectScrollbarDirective) set directive(theDirective: FusePerfectScrollbarDirective) {
    if (!theDirective) {
      return;
    }

    this.fusePerfectScrollbar = theDirective;

    this.navigationServiceWatcher =
      this.navigationService.onItemCollapseToggled.subscribe(() => {
        this.fusePerfectScrollbarUpdateTimeout = setTimeout(() => {
          this.fusePerfectScrollbar.update();
        }, 310);
      });
  }

  @Input() layout;
  navigation: any;
  navigationServiceWatcher: Subscription;
  fusePerfectScrollbarUpdateTimeout;

  constructor(
    private sidebarService: FuseSidebarService,
    private VentasService: VentasService,
    private navigationService: FuseNavigationService,
    private userService: UserService,
    public router: Router
  ) {


    this.navigation = navigation;

    const x = this.userService.GetCurrentCurrentUserNow();
    this.userInfo = x;
    this.NombreCliente = !_.isNil(x) ? x.NombreUsuario : "";
    this.ValorVentas = 0;
    var objVentas: E_Ventas = new E_Ventas();
    //debugger
    if (x != null) {
      if (this.userService.GetCurrentCurrentUserNow().IdGrupo === '50') {
        this.navigation = navigationGeneralEmpre(this.router);
        objVentas.Nit = this.userService.GetCurrentCurrentUserNow().Cedula;
        this.VentasService.VentaEmpresariaMes(objVentas).subscribe((x: E_Ventas) => {
          this.ValorVentas = x.Venta;
        });
        this.VentasService.FacturasMesEmpresaria(objVentas).subscribe((x: E_Ventas) => {
          this.CantidadFacturas = x.Venta;
        });

      } else {
        if (this.userService.GetCurrentCurrentUserNow().IdGrupo === '15') {
          this.navigation = navigationGeneralSac(this.router);
        }
        else {
          if (this.userService.GetCurrentCurrentUserNow().IdGrupo === '60') {
            this.navigation = navigationGeneralLider(this.router);

            objVentas.Lider = this.userService.GetCurrentCurrentUserNow().IdLider;
            this.VentasService.VentaLiderMes(objVentas).subscribe((x: E_Ventas) => {
              this.ValorVentas = x.Venta;
            });
            this.VentasService.FacturasLiderMes(objVentas).subscribe((x: E_Ventas) => {
              this.CantidadFacturas = x.Venta;
            });
          }
          else {
            if (this.userService.GetCurrentCurrentUserNow().IdGrupo === '80') {
              this.navigation = navigationClienteFinal(this.router);
            }else
            if (this.userService.GetCurrentCurrentUserNow().IdGrupo === '99') {
              this.navigation = navigationAdmin(this.router);
              objVentas.Nit = this.userService.GetCurrentCurrentUserNow().Cedula;
             this.VentasService.VentaEmpresariaMes(objVentas).subscribe((x: E_Ventas) => {
             this.ValorVentas = x.Venta;
        });
              this.VentasService.FacturasMesEmpresaria(objVentas).subscribe((x: E_Ventas) => {
              this.CantidadFacturas = x.Venta;
        });
            }
            else {
              if (this.userService.GetCurrentCurrentUserNow().IdGrupo === '59') 
                {
                  this.navigation = navigationDelivery(this.router);
              objVentas.Nit = this.userService.GetCurrentCurrentUserNow().Cedula;
             this.VentasService.VentaEmpresariaMes(objVentas).subscribe((x: E_Ventas) => {
             this.ValorVentas = x.Venta;
        });
              this.VentasService.FacturasMesEmpresaria(objVentas).subscribe((x: E_Ventas) => {
              this.CantidadFacturas = x.Venta;
        });

                }else
                {
              this.navigation = navigationGeneral(this.router);
              objVentas.Vendedor = this.userService.GetCurrentCurrentUserNow().IdVendedor;
              this.VentasService.VentaZonaMes(objVentas).subscribe((x: E_Ventas) => {
                this.ValorVentas = x.Venta;
              });
              this.VentasService.FacturasZonaMes(objVentas).subscribe((x: E_Ventas) => {
                this.CantidadFacturas = x.Venta;
              });
            }
            }
          }
        }

      }
    } else {
      this.navigation = navigationGeneral(this.router);
    }



    // Default layout
    this.layout = 'vertical';
  }

  ngOnDestroy() {
    if (this.fusePerfectScrollbarUpdateTimeout) {
      clearTimeout(this.fusePerfectScrollbarUpdateTimeout);
    }

    if (this.navigationServiceWatcher) {
      this.navigationServiceWatcher.unsubscribe();
    }
  }

  toggleSidebarOpened(key) {
    this.sidebarService.getSidebar(key).toggleOpen();
  }

  toggleSidebarFolded(key) {
    this.sidebarService.getSidebar(key).toggleFold();
  }
}
