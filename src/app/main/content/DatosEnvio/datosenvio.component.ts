import { Component, Inject, ViewEncapsulation, OnInit, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { E_PuntosEnvio } from 'app/Models/E_PuntosEnvio';
import { E_Provincia } from 'app/Models/E_Provincia';
import { E_Canton } from 'app/Models/E_Canton';
import { E_Parroquia } from 'app/Models/E_Parroquia';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { UserService } from 'app/ApiServices/UserService';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import { E_Ciudad } from 'app/Models/E_Ciudad';
import { E_Bodegas } from 'app/Models/E_Bodegas';
import { UbicacionPedidoComponent } from '../UbicacionPedido/ubicacionpedido.component';
import { DireccionXUsuario } from 'app/Models/DireccionXUsuario';
import { getLocations, SeleccionDireccionComponent } from '../Ubicacion/seleccion-direccion/seleccion-direccion.component';
import _ from 'lodash';

export interface DialogData {
    Titulo: string;
    Mensaje: string;
    TipoMensaje: string;
    Nit: string;
    Zona: string;
    EmpresariaLider: string;
    ValorFlete: number;
    ListBodega: E_Bodegas[];
    Ciudad: string;
    Departamento: string;
    Parroquia: string;

}

export interface ReturnsData {
    IdDireccionXUsuario?: number;
    IdTipoEnvio: string;
    DireccionEnvio: string;
    CodCiudadDespacho: string;
    ValorFleteCobrar: number;
    Bodega: string;
    ClienteF: string;
    PuntoEnvio: string;
    Latitud: number;
    Longitud: number
}

@Component({

    selector: 'datosenvio',
    templateUrl: 'datosenvio.component.html',
    styleUrls: ['datosenvio.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class DatosEnvioComponent implements OnInit {
    TextColor: any
    form: FormGroup;
    SaveInProgress: any
    public ListDespachar: Array<any> = [
        { IdTipoEnvio: "1", Nombre: 'MIS DIRECCIONES' },
        //{ IdTipoEnvio: "3", Nombre: 'LIDER' },
        { IdTipoEnvio: "4", Nombre: 'RETIRAR EN PUNTO' },
        { IdTipoEnvio: "5", Nombre: 'CLIENTE FINAL' },

    ];
    DireccionEnvio = "";
    public CiudadCliente: string = "";
    public ProvinciaCliente: string = "";
    public TelefonoSeleccionado: string = "";
    public DireccionSeleccionado: string = "";
    public EmailSeleccionado: string = "";
    public ClienteSeleccionado: string = "";
    public Email: string = "";

    public TelefonoComparar: string = "";
    public DireccionComparar: string = "";

    public visibleLocalizacion: boolean = false;
    public visibleLocalizacionC: boolean = false;
    public visiblePuntos: boolean = false;
    public visibleMensajeError: boolean = false;
    public visibleGuardar: boolean = false;
    public BodegaSeleccionado: string = ""

    formErrors: any;
    public SessionUser: E_SessionUser = new E_SessionUser()

    public PuntoSeleccionado: string = ""; //PROVINCIA = DEPARTAMENTO
    public PuntoDescripcion: string = "";
    public ListPuntoEnvio: Array<E_PuntosEnvio> = new Array<E_PuntosEnvio>()

    public ProvinciaSeleccionado: string = ""; //PROVINCIA = DEPARTAMENTO
    public ListProvincia: Array<E_Provincia> = new Array<E_Provincia>()
    public ListClientes: Array<E_Cliente> = new Array<E_Cliente>()

    public CantonSeleccionado: string = ""; //CANTON = MUNICIPIO
    public ListCanton: Array<E_Canton> = new Array<E_Canton>()

    public ParroquiaSeleccionado: string = ""; //PARROQUIA = CORREGIMIENTO
    public ListParroquia: Array<E_Parroquia> = new Array<E_Parroquia>()

    public DespacharASeleccionado: string = "";

    public ValorFleteFinal: number = 0;
    public ValorLatitud: number = 0;
    public ValorLongitud: number = 0;
    public ReturnData: ReturnsData;
    listaDirecciones: DireccionXUsuario[];
    mensageDireccion: string;
    TipoSelected
    NombreParroquiaSeleccionado: string;
    IdDireccionXUsuario: number;
    NitEnvio: string;
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private UserService: UserService,
        public dialog: MatDialog,
        private ClienteService: ClienteService,
        private ExceptionErrorService: ExceptionErrorService,
        private ngZone: NgZone,

        //public dialogRef: MatDialogRef<DatosEnvioComponent>,
        private bottomSheetRef: MatBottomSheetRef<DatosEnvioComponent>,
        // @Inject(MAT_DIALOG_DATA) public data: DialogData,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData) {

        this.formErrors = {
            DespacharA: {},
            Provincia: {},
            Canton: {},
            Parroquia: {},
            ClienteF: {},
            CorreoElectronico: {},
            Bodega: {}
        };

    }


    ngOnInit() {

        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()

        //Si viene un documento de identidad valido.
        if (this.data.Nit != undefined) {

            if (this.SessionUser.IdGrupo != '50') {
                this.ListDespachar = [
                    { IdTipoEnvio: "1", Nombre: 'MI CASA' },
                    { IdTipoEnvio: "3", Nombre: 'LIDER' },
                    { IdTipoEnvio: "4", Nombre: 'RETIRAR EN PUNTO' },

                ];
            }


            this.ParameterService.ListPuntosEnvio(this.SessionUser)
                .subscribe((x: Array<E_PuntosEnvio>) => {
                    this.ListPuntoEnvio = x

                    //Para que ponga por defecto el que trae sin poderlo modificar.
                    //this.ProvinciaSeleccionado = x[0].CodEstado;
                })



            var objCliente: E_Cliente = new E_Cliente()
            var objClienteResp: E_Cliente = new E_Cliente()
            objCliente.Nit = this.data.Nit;

            this.NitEnvio = _.cloneDeep(this.data.Nit)


            this.ClienteService.ListClientexEmpresaria(objCliente)
                .subscribe((x: Array<E_Cliente>) => {
                    this.ListClientes = x
                })


            this.ClienteService.CargarDireccionTelefono(objCliente)
                .subscribe((x: E_Cliente) => {
                    objClienteResp = x

                    if (x.Error == undefined) {
                        //Mensaje de OK
                        this.TelefonoSeleccionado = x.Telefono1;
                        this.BodegaSeleccionado = x.Bodega;
                        this.TelefonoComparar = this.TelefonoSeleccionado;
                        this.DireccionComparar = this.DireccionSeleccionado;
                        this.ParroquiaSeleccionado = x.CodigoParroquia;
                        this.EmailSeleccionado = x.Email;
                    }
                    else {
                        //---------------------------------------------------------------------------------------------------------------
                        //Mensaje de Error. 

                        throw new ErrorLogExcepcion("DatosEnvioComponent", "ngOnInit()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)
                        //---------------------------------------------------------------------------------------------------------------
                    }

                })
        }
        else {

            this.visibleMensajeError = true;
        }


        this.form = this.formBuilder.group({
            DespacharA: [undefined, [Validators.required]],
            Direccion: [undefined, undefined],
            ClienteF: [undefined, undefined],
            Telefono: [undefined, [Validators.required]],
            CorreoElectronico: [undefined, undefined],
            Bodega: [undefined, [Validators.required]],

        });



        this.GetInfoLocation()

    }


    openDetalleCliente(): void {
        const dialogRef = this.dialog.open(UbicacionPedidoComponent, {
            //width: '550px',
            panelClass: 'knowledgebase-article-dialog',
            data: {
                Nit: this.data.Nit
            }

        });

        dialogRef.afterClosed().subscribe((result) => {

            this.ValorLatitud = result.Latitud;
            this.ValorLongitud = result.Longitud;
            this.DireccionEnvio = result.Direccion;
            this.DireccionComparar = result.Direccion;
            this.DireccionSeleccionado = result.Direccion;

        });

    }
    //Llama a los cantones en cascada. Canton = CIUDAD
    SelectedProvincia(y) {

        if (y.value != undefined && y.value != "-1") {

            var objProvincia: E_Provincia = new E_Provincia()
            objProvincia.CodEstado = y.value.CodEstado
            this.ProvinciaSeleccionado = y.value.CodEstado
            this.ParameterService.listarCanton(objProvincia)
                .subscribe((x: Array<E_Canton>) => {
                    this.ListCanton = x
                })
        }
    }

    SelectedPunto(y) {

        if (y.value != undefined && y.value != "-1") {
            this.PuntoSeleccionado = y.value.Codigo;
            this.PuntoDescripcion = y.value.Descripcion;
            this.TelefonoSeleccionado = y.value.Telefono;
            this.form.value.Telefono = y.value.Telefono;
            this.DireccionSeleccionado = y.value.Direccion;
            this.form.value.Direccion = y.value.Telefono;
            this.CantonSeleccionado = y.value.CiudadDespacho;
            
        }
        this.visibleGuardar = true;
    }


    SelectClienteFinal(y) {
        var objCliente: E_Cliente = new E_Cliente()
        var objClienteResp: E_Cliente = new E_Cliente()
        objCliente.Nit = y.value;
        this.ClienteSeleccionado = y.value;
        this.NitEnvio = y.value
        this.visibleGuardar = true
        this.ClienteService.CargarDireccionTelefono(objCliente)
            .subscribe((x: E_Cliente) => {
                objClienteResp = x

                if (x.Error == undefined) {
                    //Mensaje de OK
                    this.TelefonoSeleccionado = x.Telefono1;
                    this.CiudadCliente = x.CodCiudadDespacho;
                    //   this.DireccionSeleccionado = x.DireccionPedidos.trim();
                    this.BodegaSeleccionado = x.Bodega
                    this.TelefonoComparar = this.TelefonoSeleccionado;
                    this.DireccionComparar = this.DireccionSeleccionado;
                    this.EmailSeleccionado = x.Email;
                    this.GetInfoLocation()
                    //const toSelect = this.ListProvincia.find(c => c.CodEstado == x.CodCiudadDespacho.substr(0, 3));
                    //this.form.get('Provincia').setValue(toSelect);
                    //this.ProvinciaSeleccionado = toSelect.CodEstado;
                    //this.ParameterService.listarCanton(toSelect)
                    //    .subscribe((x: Array<E_Canton>) => {
                    //        this.ListCanton = x;
                    //        const toSelectC = this.ListCanton.find(c => c.CodCiudad == this.CiudadCliente);
                    //        this.form.get('Canton').setValue(toSelectC);
                    //        this.CantonSeleccionado = toSelectC.CodCiudad;
                    //        var objCanton: E_Canton = new E_Canton();
                    //        objCanton.CodCiudad = toSelectC.CodCiudad.substring(3);
                    //        objCanton.CodEstado = this.ProvinciaSeleccionado.substring(1);

                    //        this.ParameterService.listarParroquia(objCanton)
                    //            .subscribe((x: Array<E_Parroquia>) => {
                    //                this.ListParroquia = x;
                    //                const toSelectP = this.ListParroquia.find(c => c.Codigo == this.data.Parroquia);
                    //                this.form.get('Parroquia').setValue(toSelectP);
                    //                this.ParroquiaSeleccionado = toSelectP.Codigo;
                    //            });
                    //    })
                }
                else {
                    //---------------------------------------------------------------------------------------------------------------
                    //Mensaje de Error. 

                    throw new ErrorLogExcepcion("DatosEnvioComponent", "ngOnInit()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)
                    //---------------------------------------------------------------------------------------------------------------
                }

            })
    }

    //Llama a las parroquias en cascada. Parroquias = CORREGIMIENTOS
    SelectedCanton(y) {

        this.CantonSeleccionado = "";
        if (y.value != undefined && y.value != "-1") {

            var objCiudad: E_Ciudad = new E_Ciudad()
            objCiudad.CodCiudad = y.value.CodCiudad
            this.ProvinciaSeleccionado = y.value.CodEstado.trim()
            this.ParameterService.ListarCiudad(objCiudad)
                .subscribe((x: E_Ciudad) => {

                    if (x.Error == undefined) {
                        //Mensaje de OK
                        this.data.ValorFlete = Number(x.ValorFlete.toFixed(2));
                        this.ValorFleteFinal = Number(x.ValorFlete.toFixed(2));
                    }
                    else {
                        //---------------------------------------------------------------------------------------------------------------
                        //Mensaje de Error. 

                        throw new ErrorLogExcepcion("DatosEnvioComponent", "SelectedCanton()", "No se pudo cargar el valor del flete. CodCiudad:" + objCiudad.CodCiudad, this.SessionUser.Cedula, this.ExceptionErrorService)
                        //---------------------------------------------------------------------------------------------------------------
                    }

                    //Para que ponga por defecto el que trae sin poderlo modificar.
                    //this.ProvinciaSeleccionado = x[0].CodEstado;
                })

            this.CantonSeleccionado = y.value.CodCiudad;

            var objCanton: E_Canton = new E_Canton()
            objCanton.CodCiudad = y.value.CodCiudad.substring(3)
            objCanton.CodEstado = this.ProvinciaSeleccionado.substring(1)

            this.ParameterService.listarParroquia(objCanton)
                .subscribe((x: Array<E_Parroquia>) => {
                    this.ListParroquia = x

                })
        }
    }

    SelectedParroquia(y) {

        //var depObj = this.ListParroquia.find(x => x.CodigoParroquia == y.value)
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
        this.visibleGuardar = true;
    }


    SelectedDespacharA(y) {

        this.DespacharASeleccionado = y.value;
        this.NitEnvio = this.data.Nit
        if (y.value == "1") {
            this.visibleLocalizacion = true;
          //  this.visibleGuardar = false;
            this.visibleLocalizacionC = false;
            this.visiblePuntos = false;
            this.GetInfoLocation()
        }
        else if (y.value == "2") {
            this.visibleLocalizacion = false;
            this.visibleGuardar = true;
            this.visibleLocalizacionC = false;
            this.visiblePuntos = false;
        }
        else if (y.value == "3") {
            this.visibleLocalizacion = false;
            this.visibleGuardar = true;
            this.visibleLocalizacionC = false;
            this.visiblePuntos = false;
        }
        else if (y.value == "4") {
            this.visibleLocalizacion = false;
            this.visibleGuardar = false;
            this.visibleLocalizacionC = false;
            this.visiblePuntos = true;
        }
        else if (y.value == "5") {
            this.visibleLocalizacion = true;
            this.visibleLocalizacionC = true;
            this.visibleGuardar = false;
            this.visiblePuntos = false;
        }
        else {
            this.visibleLocalizacion = true;
            this.visibleGuardar = true;
            this.visibleLocalizacionC = false;
        }


        var objCliente: E_Cliente = new E_Cliente()
        var objClienteResp: E_Cliente = new E_Cliente()
        objCliente.Nit = this.data.Nit;
        objCliente.TipoEnvio = Number(this.DespacharASeleccionado)
        objCliente.Zona = this.data.Zona;
        objCliente.EmpresariaLider = Number(this.data.EmpresariaLider);
        this.DespacharASeleccionado
        this.ClienteService.ValidarTipoEnvioPedido(objCliente)
            .subscribe((x: E_Cliente) => {
                objClienteResp = x

                if (x.Error == undefined) {
                    //Mensaje de OK
                    this.data.ValorFlete = Number(x.ValorFlete.toFixed(2));
                    this.ValorFleteFinal = Number(x.ValorFlete.toFixed(2));
                }
                else {
                    //---------------------------------------------------------------------------------------------------------------
                    //Mensaje de Error. 

                    throw new ErrorLogExcepcion("DatosEnvioComponent", "SelectedDespacharA()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)
                    //---------------------------------------------------------------------------------------------------------------
                }

            })

        var depObj = this.ListParroquia.find(x => x.CodigoParroquia == this.data.Parroquia)
        //this.visibleGuardar = true;
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
       
    }

    onClose(): void {
        this.GuardarInformacion();

        if (this.DespacharASeleccionado == "1") {
            this.ReturnData = {
                IdTipoEnvio: "1", DireccionEnvio: this.form.value.Direccion + ", $" + this.ValorFleteFinal, CodCiudadDespacho: this.CantonSeleccionado, ValorFleteCobrar: this.ValorFleteFinal, Bodega: this.BodegaSeleccionado, ClienteF: this.ClienteSeleccionado,
                PuntoEnvio: this.PuntoSeleccionado, Latitud: this.ValorLatitud, Longitud: this.ValorLongitud
            }
        }
        else if (this.DespacharASeleccionado == "2") {
            this.ReturnData = {
                IdTipoEnvio: "2", DireccionEnvio: "ENVIAR A DIRECTOR: $" + this.ValorFleteFinal, CodCiudadDespacho: "", ValorFleteCobrar: this.ValorFleteFinal, Bodega: this.BodegaSeleccionado, ClienteF: this.ClienteSeleccionado,
                PuntoEnvio: this.PuntoSeleccionado, Latitud: this.ValorLatitud, Longitud: this.ValorLongitud
            }
        }
        else if (this.DespacharASeleccionado == "3") {

            this.ReturnData = {
                IdTipoEnvio: "3", DireccionEnvio: "ENVIAR A LIDER: $" + this.ValorFleteFinal, CodCiudadDespacho: "", ValorFleteCobrar: this.ValorFleteFinal, Bodega: this.BodegaSeleccionado, ClienteF: this.ClienteSeleccionado,
                PuntoEnvio: this.PuntoSeleccionado, Latitud: this.ValorLatitud, Longitud: this.ValorLongitud
            }
        }
        else if (this.DespacharASeleccionado == "4") {
            this.ReturnData = {
                IdTipoEnvio: this.PuntoSeleccionado, DireccionEnvio: "ENVIAR A " + this.PuntoDescripcion + ": $ " + this.ValorFleteFinal, CodCiudadDespacho: this.CantonSeleccionado, ValorFleteCobrar: this.ValorFleteFinal,
                Bodega: this.BodegaSeleccionado, ClienteF: this.ClienteSeleccionado, PuntoEnvio: this.PuntoSeleccionado, Latitud: this.ValorLatitud, Longitud: this.ValorLongitud
            }
        } else if (this.DespacharASeleccionado == "5") {
            this.ReturnData = {
                IdTipoEnvio: "5", DireccionEnvio: this.form.value.Direccion + ", $" + this.ValorFleteFinal, CodCiudadDespacho: this.CantonSeleccionado, ValorFleteCobrar: this.ValorFleteFinal,
                Bodega: this.BodegaSeleccionado, ClienteF: this.ClienteSeleccionado, PuntoEnvio: this.PuntoSeleccionado, Latitud: this.ValorLatitud, Longitud: this.ValorLongitud
            }
        }
        else {
            this.ReturnData = {
                IdTipoEnvio: "1", DireccionEnvio: this.form.value.Direccion + ", $" + this.ValorFleteFinal, CodCiudadDespacho: this.CantonSeleccionado, ValorFleteCobrar: this.ValorFleteFinal,
                Bodega: this.BodegaSeleccionado, ClienteF: this.ClienteSeleccionado, PuntoEnvio: this.PuntoSeleccionado, Latitud: this.ValorLatitud, Longitud: this.ValorLongitud
            }
        }
        this.ReturnData.IdDireccionXUsuario = this.IdDireccionXUsuario
        this.bottomSheetRef.dismiss(this.ReturnData);
    }

    onNoClick(): void {
        this.bottomSheetRef.dismiss();
    }

    GuardarInformacion(): void {

        var objCliente: E_Cliente = new E_Cliente()
        var objClienteResp: E_Cliente = new E_Cliente()

        var DireccionGuardar: string = this.DireccionComparar

        if (this.DireccionComparar != this.form.value.Direccion || this.TelefonoComparar != this.form.value.Telefono) {
            if (this.form.value.Direccion != null && this.form.value.Telefono != null) {
                objCliente.GuardarAuditoria = true;
            }
        }

        if (this.form.value.Direccion == null || this.form.value.Direccion == undefined) {
            DireccionGuardar = this.DireccionComparar;
        }
        else {
            DireccionGuardar = this.form.value.Direccion;
        }
        objCliente.Nit = this.data.Nit;
        if (this.DespacharASeleccionado == "5") {
            objCliente.Nit = this.form.value.ClienteF;
        }
        objCliente.Usuario = this.SessionUser.Cedula.trim() + ' ' + this.SessionUser.NombreUsuario.trim();
        objCliente.Telefono1 = this.form.value.Telefono.trim();
        objCliente.DireccionPedidos = DireccionGuardar;
        objCliente.CodDepartamento = this.ProvinciaSeleccionado;
        objCliente.CodCiudad = this.CantonSeleccionado;
        objCliente.CodigoParroquia = this.ParroquiaSeleccionado;
        objCliente.NombreParroquia = this.NombreParroquiaSeleccionado;
        objCliente.Email = this.form.value.CorreoElectronico;
        objCliente.Latitud = this.ValorLatitud;
        objCliente.Longitud = this.ValorLongitud;

        if (this.DespacharASeleccionado == "5" || this.DespacharASeleccionado == "1") {

        this.ClienteService.ActualizarDireccionTelefono(objCliente)
            .subscribe((x: E_Cliente) => {
                objClienteResp = x

                if (x.Error == undefined) {
                    //Mensaje de OK
                    //Se guardo OK.
                }
                else {
                    //---------------------------------------------------------------------------------------------------------------
                    //Mensaje de Error. 
                    throw new ErrorLogExcepcion("DatosEnvioComponent", "GuardarInformacion()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)
                    //---------------------------------------------------------------------------------------------------------------
                }

            })
        }

    }

    editlocalization() {
        let dialogref = this.dialog.open(SeleccionDireccionComponent, {
            data: { showSave: true, cedula: this.NitEnvio }, panelClass: "bottomStyleSheet", width: "95vw"
        })
        dialogref.afterClosed().subscribe(() => {

            this.GetInfoLocation()


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
            this.ParameterService.ListarCiudad(objCiudad)
                .subscribe((x: E_Ciudad) => {
                    if (x.Error == undefined) {
                        this.data.ValorFlete = Number(x.ValorFlete.toFixed(2));
                        this.ValorFleteFinal = Number(x.ValorFlete.toFixed(2));
                    }
                    else {
                        throw new ErrorLogExcepcion("DatosEnvioComponent", "SelectedCanton()", "No se pudo cargar el valor del flete. CodCiudad:" + objCiudad.CodCiudad, this.SessionUser.Cedula, this.ExceptionErrorService)
                    }
                })

        })
    }

}
