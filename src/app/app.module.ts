import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { AgGridModule } from 'ag-grid-angular';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSampleModule } from './main/content/sample/sample.module';

import { UserService } from './ApiServices/UserService';
import { HeaderBuilder } from './Tools/HeaderBuilder';
import { LoginModule } from './main/content/AutenticationComponents/login/login.module';
import { ParameterService } from './ApiServices/ParametersServices';
import { ClienteService } from './ApiServices/ClienteService';
import { CxCService } from './ApiServices/CxCService';
import { VentasService } from './ApiServices/VentasService';
import { PuntosService } from './ApiServices/PuntosService';

import { UbicacionGeneralModule } from './main/content/Ubicacion/UbicacionGeneral/ubicaciongeneral.module';
import { PrincipalModule } from './main/content/Principal/principal.module';
import { RegistroEmpresariaEcModule } from './main/content/RegistroEmpresariaEc/registroempresariaec.module';
import { RegistroClienteFinalModule } from './main/content/RegistroClienteFinal/registroclientefinal.module';
import { RegistroEmpresariaModule } from './main/content/RegistroEmpresaria/registroempresaria.module';
import { ActualizaEmpresariaEcModule } from './main/content/ActualizaEmpresariaEc/actualizaempresariaec.module';
import { EdicionEmpresariaModule } from './main/content/EdicionEmpresaria/edicionempresaria.module';
import { RecuperarClaveModule } from './main/content/recuperarclave/recuperarclave.module';
import { MisEmpresariasModule } from './main/content/MisEmpresarias/misempresarias.module';
import { MisCreditosModule } from './main/content/MisCreditos/miscreditos.module';
import { MisClientesFModule } from './main/content/MisClientesF/misclientesf.module';
import { MisActivasModule } from './main/content/MisActivas/misactivas.module';
import { MisPosiblesEgresosModule } from './main/content/MisPosiblesEgresos/misposiblesegresos.module';
import { MisPosiblesReingresosModule } from './main/content/MisPosiblesReingresos/misposiblesreingresos.module';
import { MisPosiblesIngresosModule } from './main/content/MisPosiblesIngresos/misposiblesingresos.module';
import { MisEgresosModule } from './main/content/MisEgresos/misegresos.module';
import { MisProspectosModule } from './main/content/MisProspectos/misprospectos.module';
import { MisInactivasModule } from './main/content/MisInactivas/misinactivas.module';
import { DetallePedidosModule } from './main/content/DetallePedidos/detallepedidos.module';
import { ModalPopUpModule } from './main/content/ModalPopUp/modalpopup.module';
import { ModalPopUppreModule } from './main/content/ModalPopUppre/modalpopuppre.module';
import { DatosEnvioModule } from './main/content/DatosEnvio/datosenvio.module';
import { ExceptionErrorService } from './ApiServices/ExceptionErrorService';
import { RecepcionVposModule } from './main/content/recepcionvpos/recepcionvpos.module';
//MRG: Agregar modulos de funcionalidad aqui y en .module de cada componente.
import { CdkTableModule } from '@angular/cdk/table';

//MRG: Google Maps
import { AgmCoreModule } from '@agm/core';
 import { AgmDirectionModule } from 'agm-direction'; // agm-direction

import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule
} from "@angular/material";

import { DetalleClienteModule } from './main/content/DetalleCliente/detallecliente.module';
import { detallepfactuModule } from './main/content/detallepfactu/detallepfactu.module';
import { PedidosPrincipalModule } from './main/content/PedidosPrincipal/pedidosprincipal.module';
import { DetalleArticuloModule } from './main/content/DetalleArticulo/detallearticulo.module';
import { ImagenArticuloModule } from './main/content/ImagenArticulo/imagenarticulo.module';
import { DetallePedidoModule } from './main/content/DetallePedido/detallepedido.module';
import { ResumenPedidoModule } from './main/content/ResumenPedido/resumenpedido.module';
import { MisPuntosModule } from './main/content/MisPuntos/mispuntos.module';
import { MisPuntosDetalleModule } from './main/content/MisPuntosDetalle/mispuntosdetalle.module';
import { UbicacionPedidoModule } from './main/content/UbicacionPedido/ubicacionpedido.module';

import { DetallePedidoService } from './ApiServices/DetallePedidoService';
import { PedidoService } from './ApiServices/PedidoService';
import { MisPedidosModule } from './main/content/MisPedidos/mispedidos.module';
import { CierreInventarioModule } from './main/content/CierreInventario/cierreinventario.module';
import { RegistroPagoModule } from './main/content/RegistroPago/registropago.module';
import { MisPedidosAnuladosModule } from './main/content/MisPedidosAnulados/mispedidosanulados.module';
import { VentasMesModule } from './main/content/VentasMes/ventasmes.module';
import { VentasJohnsonModule } from './main/content/VentasJohnsons/ventasj.module';
import { pedidosfacturadosModule } from './main/content/pedidosfacturados/pedidosfacturados.module';
import { PerfilModule } from './main/content/perfil/perfil.module';
import { micarteraModule } from './main/content/micartera/micartera.module';
import { micarteraliderModule } from './main/content/micarteralider/micarteralider.module';
import { MiCarteraDetalleModule } from './main/content/micarteradetalle/micarteradetalle.module';
import { MiCarteraEmpresariaModule } from './main/content/micarteraempresaria/micarteraempresaria.module';
import { DetalleCarteraLiderModule } from './main/content/DetalleMiCarteraLider/detallecarteralider.module';
import { ModalPopUpPedidoModule } from './main/content/ModalPopUpPedido/modalpopuppedido.module';
import { CommunicationService } from './ApiServices/CommunicationService';
import { ArticulosComponent } from './main/content/articulos/articulos.component';
import { ArticulosModule } from './main/content/articulos/articulos.module';
import { PedidosPrincipalComponent } from './main/content/PedidosPrincipal/pedidosprincipal.component';
import { CambiarClaveModule } from './main/content/AutenticationComponents/cambiar-clave/cambiar-clave.module';
import { RoutesModule } from './main/content/routes/routes.module';
import { ModalPopUpAnulaModule } from './main/content/ModalPopUpanula/modalpopupanula.module';
import { AdminService } from './ApiServices/AdminService';
import { NewRouteComponent } from './main/content/routes/new-route/new-route.component';
import { EditRouteComponent } from './main/content/routes/edit-route/edit-route.component';
import { DeliveryListComponent } from './main/content/routes/delivery-list/delivery-list.component';
import { MapDialogComponent } from './main/content/routes/map-dialog/map-dialog.component';
import { MapTraceComponent } from './main/content/routes/map-trace/map-trace.component';

import { VentasSemanaModule } from './main/content/VentasSemana/ventassemana.module';
import { DatosComisionModule } from './main/content/DatosComision/datoscomision.module';
import { ModalPopUpBodegaModule } from './main/content/ModalPopUpBodega/modalpopupbodega.module';
import { LiberaLiderModule } from './main/content/LiberaLider/liberalider.module';
import { SubirCatalogoModule } from './main/content/subircatalogo/subircatalogo.module';
import { ReportesModule } from './main/content/Reportes/reportes.module';
import { ReportePedidosModule } from './main/content/ReportePedidos/ReportePedidos.module';
import { VarConfigComponent } from './main/content/routes/var-config/var-config.component';
import { ZoneAdminComponent } from './main/content/routes/zones/zone-admin/zone-admin.component';
import { UbicacionGeneralComponent } from './main/content/Ubicacion/UbicacionGeneral/ubicaciongeneral.component';
import { RegisterComponent } from './main/content/new-register/register.component';

const appRoutes: Routes = [
  /*{
      path      : '**',
      redirectTo: 'sample'


  }*/
  { path: 'reportes', redirectTo: '/reportes', pathMatch: 'full' },
  { path: 'principal', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'ubicaciongeneral/:idPedido', component: UbicacionGeneralComponent },
  { path: 'registroempresariaec', redirectTo: '/registroempresariaec', pathMatch: 'full' },
  { path: 'registroempresaria', redirectTo: '/registroempresaria', pathMatch: 'full' },
  { path: 'registroclientefinal', redirectTo: '/registroclientefinal', pathMatch: 'full' },
  { path: 'misempresarias', redirectTo: '/misempresarias', pathMatch: 'full' },
  { path: 'miscreditos', redirectTo: '/miscreditos', pathMatch: 'full' },
  { path: 'misclientesf', redirectTo: '/misclientesf', pathMatch: 'full' },
  { path: 'misactivas', redirectTo: '/misactivas', pathMatch: 'full' },
  { path: 'misprospectos', redirectTo: '/misprospectos', pathMatch: 'full' },
  { path: 'misposiblesegresos', redirectTo: '/misposiblesegresos', pathMatch: 'full' },
  { path: 'misposiblesingresos', redirectTo: '/misposiblesingresos', pathMatch: 'full' },
  { path: 'misposiblesreingresos', redirectTo: '/misposiblesreingresos', pathMatch: 'full' },
  { path: 'misegresos', redirectTo: '/misegresos', pathMatch: 'full' },
  { path: 'misinactivas', redirectTo: '/misinactivas', pathMatch: 'full' },
  { path: 'pedidosprincipal', redirectTo: '/pedidosprincipal', pathMatch: 'full' },
  { path: 'modalpopup', redirectTo: '/modalpopup', pathMatch: 'full' },
  { path: 'modalpopupanula', redirectTo: '/modalpopupanula', pathMatch: 'full' },
  { path: 'mispedidos', redirectTo: '/mispedidos', pathMatch: 'full' },
  { path: 'cierreinventario', redirectTo: '/cierreinventario', pathMatch: 'full' },
  { path: 'mispuntos', redirectTo: '/mispuntos', pathMatch: 'full' },
  { path: 'mispuntosdetalle', redirectTo: '/mispuntosdetalle', pathMatch: 'full' },
  { path: 'mispedidosanulados', redirectTo: '/mispedidosanulados', pathMatch: 'full' },
  { path: 'pedidosfacturados', redirectTo: '/pedidosfacturados', pathMatch: 'full' },
  { path: 'recepcionvpos', redirectTo: '/recepcionvpos', pathMatch: 'full' },
  { path: 'perfil', redirectTo: '/perfil', pathMatch: 'full' },
  { path: 'micartera', redirectTo: '/micartera', pathMatch: 'full' },
  { path: 'ventasmes', redirectTo: '/ventasmes', pathMatch: 'full' },
  { path: 'ventasj', redirectTo: '/ventasj', pathMatch: 'full' },
  { path: 'micarteralider', redirectTo: '/micarteralider', pathMatch: 'full' },
  { path: 'micarteradetalle', redirectTo: '/micarteradetalle', pathMatch: 'full' },
  { path: 'micarteraempresaria', redirectTo: '/micarteraempresaria', pathMatch: 'full' },
  { path: 'modalpopuppedido', redirectTo: '/modalpopuppedido', pathMatch: 'full' },
  { path: 'actualizaempresariaec', redirectTo: '/actualizaempresariaec', pathMatch: 'full' },
  { path: 'edicionempresaria', redirectTo: '/edicionempresaria', pathMatch: 'full' },
  { path: 'recuperarclave', redirectTo: '/recuperarclave', pathMatch: 'full' },
  { path: 'ventassemana', redirectTo: '/ventassemana', pathMatch: 'full' },
  { path: 'datoscomision', redirectTo: '/datoscomision', pathMatch: 'full' },
  { path: 'modalpopupbodega', redirectTo: '/modalpopupbodega', pathMatch: 'full' },
  { path: 'liberalider', redirectTo: '/liberalider', pathMatch: 'full' },
  { path: 'detallecliente', redirectTo: '/detallecliente', pathMatch: 'full' },
  { path: "new-registro", component: RegisterComponent, },
  { path: 'articulos/:envi', component: PedidosPrincipalComponent },
  { path: 'routes/new-route', component: NewRouteComponent },
  { path: 'routes/edit-route', component: EditRouteComponent },
  { path: 'routes/edit-route/:id', component: NewRouteComponent },
  { path: 'routes/delivery/list/:driver', component: DeliveryListComponent },
  { path: 'routes/delivery/map', component: MapDialogComponent },
  { path: 'routes/delivery/map/:lat/:lng/:requestNum/:routeId/:driver', component: MapDialogComponent },
  { path: 'routes/delivery/map-trace', component: MapTraceComponent },
  { path: 'routes/var-config', component: VarConfigComponent },
  { path: 'routes/zones', component: ZoneAdminComponent },
  { path: 'creditos', loadChildren:"./main/content/credito/formulario-incripcion-creditos.module#FormularioIncripcionCreditosModule" },
  { path: 'cambiocontrasena', loadChildren:"./main/content/cambio-contrasena/cambio-contrasena.module#CambioContrasenaModule" },
  { path: 'admin', loadChildren:"./main/content/admin/admin.module#AdminModule" },
  { path: 'popupcredito', loadChildren:"./main/content/popupcredito/popupcredito.module#PopupcreditoModule"},
  { path: 'ReportePedidos', loadChildren:"./main/content/ReportePedidos/ReportePedidos.module#ReportePedidosModule"},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },

];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
    //MispedidosFactuComponent
    //MisEmpresariasComponent,
    //MisEmpresariasModule,

  ],
  exports: [RouterModule],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgGridModule,
    CdkTableModule,
    ArticulosModule,
    FuseSharedModule,
    FuseMainModule,
    FuseSampleModule,
    LoginModule,
    UbicacionGeneralModule,
    SubirCatalogoModule,
    PrincipalModule,
    RegistroEmpresariaEcModule,
    RegistroEmpresariaModule,
    RegistroClienteFinalModule,
    MisEmpresariasModule,
    MisCreditosModule,
    ModalPopUpAnulaModule,
    MisClientesFModule,
    MisActivasModule,
    CierreInventarioModule,
    RegistroPagoModule,
    MisProspectosModule,
    MisPosiblesEgresosModule,
    MisPosiblesIngresosModule,
    MisPosiblesReingresosModule,
    MisEgresosModule,
    MisInactivasModule,
    ModalPopUpModule,
    ModalPopUppreModule,
    DatosEnvioModule,
    DetalleArticuloModule,
        ImagenArticuloModule,
    DetalleClienteModule,
    PedidosPrincipalModule,
    DetallePedidoModule,
    DetallePedidosModule,
    ResumenPedidoModule,
    MisPedidosModule,
    ModalPopUpBodegaModule,
    MisPedidosAnuladosModule,
    pedidosfacturadosModule,
    PerfilModule,
    RecepcionVposModule,
    VentasSemanaModule,
    detallepfactuModule,
    micarteraModule,
    MiCarteraDetalleModule,
    micarteraliderModule,
    MiCarteraEmpresariaModule,
    DetalleCarteraLiderModule,
    ModalPopUpPedidoModule,
    ActualizaEmpresariaEcModule,
    EdicionEmpresariaModule,
    RecuperarClaveModule,
    MisPuntosModule,
    MisPuntosDetalleModule,
    DatosComisionModule,
    UbicacionPedidoModule,
    VentasMesModule,
    VentasJohnsonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    LiberaLiderModule,
    RoutesModule,
    ReportePedidosModule,
    ReportesModule,
    // Fuse Main and Shared modules
    FuseModule.forRoot(fuseConfig),
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDz6bK_0AWlf4XXBhyaEPaxVVyBRPDu5lM'

    }),
    AgmDirectionModule, //agm-direction




  ],
  entryComponents:[
    RegisterComponent
  ],
  providers: [
    UserService,
    ParameterService,
    HeaderBuilder,
    ClienteService,
    ExceptionErrorService,
    DetallePedidoService,
    PedidoService,
    CxCService,
    PuntosService,
    VentasService,
    CommunicationService,
    AdminService

  ]
  ,
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
