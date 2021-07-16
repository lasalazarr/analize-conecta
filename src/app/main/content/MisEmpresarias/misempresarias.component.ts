import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatTable } from '@angular/material';
import { DetalleClienteComponent } from '../DetalleCliente/detallecliente.component';
import { E_Cliente } from 'app/Models/E_Cliente';
import { E_ClientesL } from 'app/Models/E_ClientesL';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { Router } from '@angular/router';
import { getLocations,SeleccionDireccionComponent } from '../Ubicacion/seleccion-direccion/seleccion-direccion.component';
import { DireccionXUsuario } from 'app/Models/DireccionXUsuario';
import _ from 'lodash';
import { E_Ciudad } from 'app/Models/E_Ciudad';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';
import moment from 'moment';



@Component({
    moduleId: module.id,
    selector: 'misempresarias',
    templateUrl: 'misempresarias.component.html',
    styleUrls: ['misempresarias.component.scss']
})
export class MisEmpresariasComponent implements OnInit {
    displayedColumns = [ 'RazonSocial','Zona','Nit','imagenEmpresaria','Clasificacion','Contactada'];
    dataSource: MatTableDataSource<E_ClientesL>;
    

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild('tableEmpresaria') tableEmpresaria: MatTable<E_ClientesL>;
    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListClientes: Array<E_Cliente> = new Array<E_Cliente>()
    public ListClientesL: Array<E_ClientesL> = new Array<E_ClientesL>()
    public mensageDireccion: string;
    public NitEnvio: string;
    public listaDirecciones: DireccionXUsuario[];
    public visibleGuardar = false;
    public tieneubicacion = false;
    public TipoSelected: any;
    public DireccionSeleccionado = '';
    public ValorLatitud: number = 0;
    public ValorLongitud: number = 0;
    public CantonSeleccionado = ''; 
    public ProvinciaSeleccionado = '';
    public ParroquiaSeleccionado = ''; 
    public IdDireccionXUsuario: number;
    public NombreParroquiaSeleccionado: string;
    public ValorFleteFinal = 0;
    renderRows
    constructor(public dialog: MatDialog,
        private ClienteService: ClienteService,
        private UserService: UserService,
        private ngZone: NgZone,
        private communicationService: CommunicationService,
        private ExceptionErrorService: ExceptionErrorService,
        private ParameterService: ParameterService,
        private router: Router) {
    }
    ngOnInit() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        var objCliente: E_Cliente = new E_Cliente()
        objCliente.Vendedor = this.SessionUser.IdVendedor;
        objCliente.Lider = this.SessionUser.IdLider;
        objCliente.CodEstado = "'%%'";
        this.communicationService.showLoader.next(true);

        if (this.SessionUser.IdGrupo == "52") {
            this.ClienteService.ObtenerMisClientesDirector(objCliente.Vendedor)
                .subscribe((x: Array<E_ClientesL>) => {
                    _.forEach(x, (eventos) => {
                        var a = moment(new Date());
                        var b = moment(eventos.UltimaCompra);
                        eventos.RemainingDays = a.diff(b, "days");
                        if (eventos.Geolocalizado >0){
                            eventos.Contactada= true
                        }else
                        {
                            eventos.Contactada= false   
                        }
                    });
                    this.ListClientesL = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientesL);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.communicationService.showLoader.next(false);

                })
        }
        else if (this.SessionUser.IdGrupo == "60") {
            this.ClienteService.ObtenerMisClientesLider(objCliente.Lider)
                .subscribe((x: Array<E_ClientesL>) => {
              
                        _.forEach(x, (eventos) => {
                            var a = moment(new Date());
                            var b = moment(eventos.UltimaCompra);
                            eventos.RemainingDays = a.diff(b, "days");
                            if (eventos.Geolocalizado ==1){
                                eventos.Contactada= true
                            }else
                            {
                                eventos.Contactada= false
                            }
                        });
             
                        this.ListClientesL= x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientesL);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.communicationService.showLoader.next(false);

                })
        }
    }
    Pedir(nit:string){
            this.NitEnvio = nit;
            let dialogref = this.dialog.open(SeleccionDireccionComponent, {
                data: { showSave: true, cedula:this.NitEnvio,pedCat:true }, panelClass: "bottomStyleSheet", width: "60vw"
            })
            dialogref.afterClosed().subscribe((x) => {
                if(x){
                    this.GetInfoLocation()
                    const dialogRef = this.dialog.open(ModalPopUpComponent, {
                        width: '450px',
                        data: { TipoMensaje: "Info", Titulo: "Peticíon de catalogo", Mensaje: "Se ha pedido el catalogo con exito." }
                    });
                }
               
    
            })
        
    }
    public GetInfoLocation() {
        this.mensageDireccion = "";
        this.ClienteService.ObtenerDireccionesXUsuario(this.NitEnvio)
            .subscribe((x: Array<DireccionXUsuario>) => {
                this.ngZone.run(() => {
                    if (x.length > 0) {
                        x.forEach(item => {
                            let typefind = getLocations().find(type => type.Tipo == item.Tipo);
                            item.Texto = typefind.Texto;
                            item.icono = typefind.icono;
                        }

                        )
                        this.selectDireccion(x[0])
                        this.listaDirecciones = x;
                        this.visibleGuardar = true;
                    } else {
                        this.listaDirecciones = [];
                        this.mensageDireccion = "No tienes una dirección Asignada para este tipo";
                        this.visibleGuardar = false;
                    }
                    setTimeout(() => {
                        let refresh = document.getElementById("localtionContainerObject")
                        if (!_.isNil(refresh)) refresh.click();
                    }, 300);
                })
            });
    }
    selectDireccion(dirreccion: DireccionXUsuario) {
        this.ngZone.run(() => {
             this.TipoSelected = dirreccion.Tipo
             this.DireccionSeleccionado = dirreccion.Direccion
             this.ValorLatitud = dirreccion.Latitud;
             this.ValorLongitud = dirreccion.Longitud;
             this.CantonSeleccionado = dirreccion.Ciudad
             this.ProvinciaSeleccionado = dirreccion.Provincia.trim()
             this.ParroquiaSeleccionado = dirreccion.Parroquia
             this.NombreParroquiaSeleccionado = dirreccion.NombreParroquia
             this.IdDireccionXUsuario = dirreccion.Id
             var objCiudad: E_Ciudad = new E_Ciudad()
             objCiudad.CodCiudad = dirreccion.Ciudad
             this.ParameterService.ListarCiudad(objCiudad).subscribe((x: E_Ciudad) => {
                     if (x.Error == undefined) {
            //             this.data.ValorFlete = Number(x.ValorFlete.toFixed(2));
                         this.ValorFleteFinal = Number(x.ValorFlete.toFixed(2));
                     }
                     else {
                        throw new ErrorLogExcepcion("DatosEnvioComponent", "SelectedCanton()", "No se pudo cargar el valor del flete. CodCiudad:" + objCiudad.CodCiudad, this.SessionUser.Cedula, this.ExceptionErrorService)
                     }
                 })

        })
    }



    openDetalleCliente(row: E_Cliente): void {
        this.communicationService.showLoader.next(true);
        this.ClienteService.ObtenerClientexNit(row.Nit.trim())
            .subscribe((x: E_Cliente) => {
               
                    var a = moment(new Date());
                    var b = moment(x.UltimaCompra);
                    x.RemainingDays = a.diff(b, "days");
               

                const dialogRef = this.dialog.open(DetalleClienteComponent, {
                    panelClass: 'knowledgebase-article-dialog',
                    data: x
                });

                dialogRef.afterClosed().subscribe(result => {
                });
                this.communicationService.showLoader.next(false);

            })


    }


    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    irNuevaEmpresaria() {
        this.router.navigate(['/registroempresariaec'])
    }

  
      
    

}