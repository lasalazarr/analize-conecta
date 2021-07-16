//import { Component, OnInit } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
//import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { Router } from '@angular/router';
import { UserService } from '../../../ApiServices/UserService';
//import { MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { EstadosClienteEnum, IntermediarioEnum, ComoTeEnterasteEnum, ParametrosEnum, UnidadNegocioEnum, CatalogoInteresEnum, GruposUsuariosEnum } from "app/Enums/Enumerations";

import { E_Cliente } from 'app/Models/E_Cliente';

import { E_Regional } from 'app/Models/E_Regional';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { E_Vendedor } from 'app/Models/E_Vendedor';
import { E_Lider } from 'app/Models/E_Lider';
import { E_TipoDocumento } from 'app/Models/E_TipoDocumento';
import { E_Provincia } from 'app/Models/E_Provincia';
import { E_Canton } from 'app/Models/E_Canton';
import { E_Parroquia } from 'app/Models/E_Parroquia';
import { ValidarDocumento } from 'app/Tools/ValidarDocumento';
import { E_Parametros } from 'app/Models/E_Parametros';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';
import { E_ExceptionError } from 'app/Models/E_ExceptionError';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import 'rxjs/add/observable/throw';
import { catchError, tap } from 'rxjs/operators';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import * as _ from 'lodash';
import { forkJoin ,Observable} from 'rxjs';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { SeleccionDireccionComponent } from '../Ubicacion/seleccion-direccion/seleccion-direccion.component';
import { DireccionXUsuario } from 'app/Models/DireccionXUsuario';

@Component({
    moduleId: module.id,
    selector: 'registroclientefinal',
    templateUrl: 'registroclientefinal.component.html',
    styleUrls: ['registroclientefinal.component.scss']
})
export class RegistroClienteFinalComponent implements OnInit {
    CedulaEmpresaria: any;
    NumeroDocumento: any;
    PrimerNombre: any;
    PrimerApellido: any;
    FechaNacimiento: any;
    Barrio: any;
    DireccionDomicilio: any;
    Calles: any;
    NumeroCasa: any;
    DireccionEntrega: any;
    NumeroCelular: any;
    Whatsapp: any;
    TelefonoDomicilio: any;
    OtroTelefono: any;
    ReferenciaFamiliar: any;
    TelefonoReferenciaFamiliar: any;
    ReferidoPor: any;
    CorreoElectronico: any;
    DespacharASeleccionado: any;
    TipoClienteSeleccionado: any;
    TallaPrendaSuperiorSeleccionado: any;
    TallaPrendaInferiorSeleccionado: any;
    TallaCalzadoSeleccionado: any;
    TipoTarjetaSeleccionado: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    SaveInProgress: boolean;
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[];
    MaskedNumberNoDecimal: any[];
    form: FormGroup;
    formErrors: any;
    addresses:DireccionXUsuario[] = [];
    minDate: Date;
    maxDate: Date;

    public RegionalSeleccionado: string = "";
    public ListRegional: Array<E_Regional> = new Array<E_Regional>();

    public DirectorZonalSeleccionado: string = "";
    public ListDirectorZonal: Array<E_Vendedor> = new Array<E_Vendedor>();

    public LiderSeleccionado: string = "";
    public ListLider: Array<E_Lider> = new Array<E_Lider>();

    public TipoDocumentoSeleccionado: string = "";
    public ListTipoDocumento: Array<E_TipoDocumento> = new Array<E_TipoDocumento>();

    public ProvinciaSeleccionado: string = ""; //PROVINCIA = DEPARTAMENTO
    public ListProvincia: Array<E_Provincia> = new Array<E_Provincia>();

    public CantonSeleccionado: string = ""; //CANTON = MUNICIPIO
    public ListCanton: Array<E_Canton> = new Array<E_Canton>();

    public ParroquiaSeleccionado: string = ""; //PARROQUIA = CORREGIMIENTO
    public ListParroquia: Array<E_Parroquia> = new Array<E_Parroquia>();


    public objParametrosResponse: E_Parametros = new E_Parametros();

    public ListGenero: Array<Object> = [
        { IdGenero: "F", Nombre: 'FEMENINO' },
        { IdGenero: "M", Nombre: 'MASCULINO' },
    ];
    public GeneroSeleccionado: string = "F";


    public ListOperadorCelular: Array<Object> = [
        { IdOperador: "CLARO", Nombre: 'CLARO' },
        { IdOperador: "MOVISTAR", Nombre: 'MOVISTAR' },
    ];
    public OperadorCelularSeleccionado: string = "CLARO";

    public ListDespacharA: Array<Object> = [
        { IdDespacharA: "1", Nombre: 'MI CASA' },
      
    ];


    public ListTipoCliente: Array<Object> = [
        { IdTipoCliente: "CONSUMIDOR", Nombre: 'CONSUMIDOR' },
    ];

    public ListTallaPrendaSuperior: Array<Object> = [
        { IdTallaPrendaSuperior: "S", Nombre: 'S' },
        { IdTallaPrendaSuperior: "M", Nombre: 'M' },
        { IdTallaPrendaSuperior: "L", Nombre: 'L' },
        { IdTallaPrendaSuperior: "XL", Nombre: 'XL' },
        { IdTallaPrendaSuperior: "2XL", Nombre: '2XL' }
    ];

    public ListTallaPrendaInferior: Array<Object> = [
        { IdTallaPrendaInferior: "S", Nombre: 'S' },
        { IdTallaPrendaInferior: "M", Nombre: 'M' },
        { IdTallaPrendaInferior: "L", Nombre: 'L' },
        { IdTallaPrendaInferior: "XL", Nombre: 'XL' },
        { IdTallaPrendaInferior: "2XL", Nombre: '2XL' }
    ];

    public ListTallaCalzado: Array<Object> = [
        { IdTallaCalzado: "33", Nombre: '33' },
        { IdTallaCalzado: "34", Nombre: '34' },
        { IdTallaCalzado: "35", Nombre: '35' },
        { IdTallaCalzado: "36", Nombre: '36' },
        { IdTallaCalzado: "37", Nombre: '37' },
        { IdTallaCalzado: "38", Nombre: '38' },
        { IdTallaCalzado: "39", Nombre: '39' },
        { IdTallaCalzado: "40", Nombre: '40' },
        { IdTallaCalzado: "41", Nombre: '41' },
        { IdTallaCalzado: "42", Nombre: '42' }
    ];

    public ListTipoTarjeta: Array<Object> = [
        { IdTipoTarjeta: "DEBITO", Nombre: 'DEBITO' },
        { IdTipoTarjeta: "CREDITO", Nombre: 'CREDITO' },
    ];

    public SessionUser: E_SessionUser = new E_SessionUser();

    public Nombre: string;
    public descripcion: string;
    public checkedActivo: boolean;
    EstadoFormulario: boolean;

    public PermitirPedidoMinimoxDefecto: string;
    public ValorTPedMinimoxDefecto: number;

    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private Matdialog: MatDialog,
        private Router: Router,
        private UserService: UserService,
        private ClienteService: ClienteService,
        public dialog: MatDialog,
        private ExceptionErrorService: ExceptionErrorService,
        private CommunicationService: CommunicationService
    ) {

        this.formErrors = {
            TipoDocumento: {},
            NumeroDocumento: {},
            PrimerNombre: {},
            PrimerApellido: {},
            FechaNacimiento: {},
            Genero: {},
            Provincia: {},
            Canton: {},
            Parroquia: {},
            DireccionDomicilio: {},
            Calles: {},
            NumeroCasa: {},
            DireccionEntrega: {},
            OperadorCelular: {},
            NumeroCelular: {},
            TelefonoDomicilio: {},
            OtroTelefono: {},
            ReferenciaFamiliar: {},
            TelefonoReferenciaFamiliar: {},
            ReferidoPor: {},
            NombreReferido: {},
            CorreoElectronico: {},
            DespacharA: {},
            Whatsapp: {},
            TipoCliente: {},
            TallaPrendaSuperior: {},
            TallaPrendaInferior: {},
            TallaCalzado: {},
            TipoTarjeta: {}
        };

    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpageadmin']);
    }


    openDialog(): void {
        const dialogRef = this.dialog.open(ModalPopUpComponent, {
            panelClass: 'dialogInfocustom',
            width: '450px',
            data: { TipoMensaje: "Error", Titulo: "Registro Cliente", Mensaje: "Se guardo el registro exitosamente!. Para ingresar un pedido debes h" }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            //this.Mensaje = result; //AQUI RECIBE LOS DATOS DEL POPUP CERRADO. OJO PARA PEDIDO.
        });

        //TODO:MRG: Produce un error  at new ErrorLogExcepcion pero guarda en la BD. Corregir
        //TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:2:14)
        throw new ErrorLogExcepcion("PedidosPrincipalComponent", "openDialog()", "Prueba Error", this.SessionUser.Cedula, this.ExceptionErrorService);
    }

    ngOnInit() {

        this.minDate = new Date(1900, 0, 1);
        this.maxDate = new Date(2000, 11, 31);
        this.TipoClienteSeleccionado ='CONSUMIDOR';
        this.DespacharASeleccionado ='1';
        this.MaskedNumber = GenerateMask.numberMask;
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal;
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow();
        this.CedulaEmpresaria = this.SessionUser.Cedula;
        this.DirectorZonalSeleccionado = this.SessionUser.IdZona;
        this.LiderSeleccionado = this.SessionUser.IdLider;
        const chainSubcriptions = []
        chainSubcriptions.push(this.ParameterService.listarTipoDocumento(this.SessionUser))
        chainSubcriptions.push(this.ParameterService.listarProvincia())
        this.CommunicationService.showLoader.next(true)
        forkJoin(chainSubcriptions).subscribe((response: [Array<E_TipoDocumento>, Array<E_Provincia>]) => {
            this.SetTipoDoc(response[0]);
            this.setProvincia(response[1]);
            this.CommunicationService.showLoader.next(false)
        })



        this.CargarParametrosxDefecto();

        //
        //const toSelect = this.ListRegional.find(c => c.IdRegional == this.ListRegional[0].toString());
        //this.form.get('Regional').setValue("Coordinador 4");

        this.form = this.formBuilder.group({
            TipoDocumento: [undefined, [Validators.required]],
            NumeroDocumento: [undefined, [Validators.required]],
            PrimerNombre: [undefined, [Validators.required]],
            SegundoNombre: [''],
            PrimerApellido: [undefined, [Validators.required]],
            SegundoApellido: [''],
            FechaNacimiento: [undefined, [Validators.required]],
            Genero: [undefined, [Validators.required]],
            /*
            Provincia: [undefined, [Validators.required]],
            Canton: [undefined, [Validators.required]],
            Parroquia: [undefined, [Validators.required]],
            DireccionDomicilio: [undefined, [Validators.required]],
            */
            NumeroCelular: [undefined, [Validators.required]],
            TelefonoDomicilio: [undefined, [Validators.required]],
            CorreoElectronico: ['', [Validators.required, Validators.email]],
            TallaPrendaSuperior: [undefined, [Validators.required]],
            TallaPrendaInferior: [undefined, [Validators.required]],
            TallaCalzado: [undefined, [Validators.required]],
         

        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });


    }

    private setProvincia(x: E_Provincia[]) {
        this.ListProvincia = x;
    }

    private SetTipoDoc(x: E_TipoDocumento[]) {
        this.ListTipoDocumento = x;
        //Para que ponga por defecto el que trae sin poderlo modificar.
        this.TipoDocumentoSeleccionado = x[0].Id;
    }

    

    onFormValuesChanged() {

        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }


  

   

    SelectedTipoDocumento(y: { value: string; }) {

        var depObj = this.ListTipoDocumento.find(x => x.Id == y.value);
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }


    //Llama a los cantones en cascada. Canton = CIUDAD
    SelectedProvincia(y: { value: string; }) {

        if (y.value != undefined && y.value != "-1") {

            var objProvincia: E_Provincia = new E_Provincia();
            objProvincia.CodEstado = y.value;

            this.ParameterService.listarCanton(objProvincia)
                .subscribe((x: Array<E_Canton>) => {
                    this.ListCanton = x;
                });
        }
    }


    //Llama a las parroquias en cascada. Parroquias = CORREGIMIENTOS
    SelectedCanton(y: { value: string; }) {

        if (y.value != undefined && y.value != "-1") {

            var objCanton: E_Canton = new E_Canton();
            objCanton.CodCiudad = y.value.substring(3);
            objCanton.CodEstado = this.ProvinciaSeleccionado.substring(1);

            this.ParameterService.listarParroquia(objCanton)
                .subscribe((x: Array<E_Parroquia>) => {
                    this.ListParroquia = x;
                });
        }
    }


    SelectedParroquia(y: { value: string; }) {

        var depObj = this.ListParroquia.find(x => x.CodigoParroquia == y.value);
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }


    //validar documento con formato de Ecuador correcto.
    ValidateDocument() {

        if (this.form.value.NumeroDocumento != '' && this.form.value.NumeroDocumento != undefined) {
            this.ValidarInfoEmpresaria(this.form.value.NumeroDocumento)
        }
    }

    CargarParametrosxDefecto() {

        //()()()()()())()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()())()
        //se ingresa el tipo de pedido minimo para el cliente segun la parametrizacion.

        var objParametros: E_Parametros = new E_Parametros();

        objParametros.Id = ParametrosEnum.PermitirTPedMinimoxDefecto;

        this.PermitirPedidoMinimoxDefecto = "NO";

        this.ParameterService.listarParametrosxId(objParametros)
            .subscribe((x: E_Parametros) => {
                this.objParametrosResponse = x;
                this.PermitirPedidoMinimoxDefecto = x.Valor;

                if (this.PermitirPedidoMinimoxDefecto == "SI") {

                    objParametros.Id = ParametrosEnum.ValorTPedMinimoxDefecto;

                    this.ValorTPedMinimoxDefecto = 0;
                    this.ParameterService.listarParametrosxId(objParametros)
                        .subscribe((x: E_Parametros) => {
                            this.objParametrosResponse = x;
                            this.ValorTPedMinimoxDefecto = Number(x.Valor);
                        });
                }
            });



    }


    ConfirmData() {
        this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {panelClass: 'dialogInfocustom'});
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar esta acción?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) { this.EnviarInfo(); }
            this.confirmDialogRef = null;
        });

    }


    EnviarInfo() {
        var objCliente: E_Cliente = new E_Cliente();

        try {

            objCliente.Nit = this.form.value.NumeroDocumento;
            objCliente.Nombre1 = this.form.value.PrimerNombre.toUpperCase();
            objCliente.Apellido1 = this.form.value.PrimerApellido.toUpperCase();

            objCliente.Sexo = this.form.value.Genero;
            objCliente.FechaNacimiento = this.form.value.FechaNacimiento;

            objCliente.CodDepartamento = this.addresses[0].Provincia;
            objCliente.CodCiudad = this.addresses[0].Ciudad;
            objCliente.CodigoParroquia = this.addresses[0].Parroquia;
            objCliente.NombreParroquia = this.addresses[0].Parroquia;//TODO MRG: poner nombre
            objCliente.DireccionPedidos = this.addresses[0].Direccion;
            objCliente.DireccionResidencia = this.addresses[0].Direccion;
            objCliente.ComoLlegar = this.addresses[0].PuntoReferencia;

            objCliente.Telefono1 = this.form.value.NumeroCelular;
            objCliente.Telefono2 = this.form.value.TelefonoDomicilio;
            objCliente.Celular1 = this.form.value.NumeroCelular;
            objCliente.ReferenciaFamiliar = this.form.value.ReferenciaFamiliar;
            objCliente.TelefonoReferenciaFamiliar = this.form.value.TelefonoReferenciaFamiliar;
            objCliente.IdReferidor = this.form.value.ReferidoPor;
            objCliente.NombreReferidor = this.form.value.ReferidoPor;//TODO MRG: Poner Nombre.

            // objCliente.Zona = "10201";//Session["IdZona"].ToString();
            objCliente.Zona = this.SessionUser.IdZona;
            //objCliente.Vendedor = "0034";//Session["IdVendedor"].ToString();
            objCliente.Vendedor = this.SessionUser.IdVendedor;


            /*if (Session["IdGrupo"].ToString() == Convert.ToString((int)GruposUsuariosEnum.GerentesRegionales))
            {
                objCliente.Zona = vszonagerenteseleccionada;
                objCliente.Vendedor = vsidvendedorseleccionada;
            }*/

            objCliente.Activo = 1;
            objCliente.FechaIngreso = new Date(); //TODO MRG: Validar si es fecha hora.
            objCliente.TipoDocumento = this.form.value.TipoDocumento;
            objCliente.CodPais = "593";//objVendedorInfo.CodPais;
            objCliente.IdEstadosCliente = EstadosClienteEnum.Prospecto; //0 = Prospecto;

            objCliente.Email = this.form.value.CorreoElectronico;

            objCliente.Lider = this.LiderSeleccionado;

            objCliente.Nombre2 = this.form.value.SegundoNombre.toUpperCase();
            objCliente.Apellido2 = this.form.value.SegundoApellido.toUpperCase();

            objCliente.RazonSocial = objCliente.Nombre1 + " " + objCliente.Nombre2 + " " + objCliente.Apellido1 + " " + objCliente.Apellido2;

            objCliente.Whatsapp = this.form.value.NumeroCelular;
            objCliente.TipoCliente = this.TipoClienteSeleccionado;
            objCliente.TallaPrendaSuperior = this.form.value.TallaPrendaSuperior;
            objCliente.TallaPrendaInferior = this.form.value.TallaPrendaInferior;
            objCliente.TallaCalzado = this.form.value.TallaCalzado;
            objCliente.TarjetaCD = this.form.value.TipoTarjeta;

          
            //Validar Refererido.
            var okReferido: boolean = true;

            if (this.form.value.ReferidoPor != "" && this.form.value.ReferidoPor != undefined) {
                okReferido = this.ValidarInfoReferidor(this.form.value.ReferidoPor);

                if (!okReferido) {
                    okReferido = false;
                }
            }

            //=========================================================================================


            objCliente.IdDistribuidor = IntermediarioEnum.Local; //Local = 1
            objCliente.DocumentoDistribuidor = this.form.value.NumeroDocumento;


            //Guardar quien creo el registro.
            if (this.SessionUser.IdGrupo == GruposUsuariosEnum.GerentesZona.toString()) {
                objCliente.CreadoPor = "GERENTE DE ZONA";
            }
            else if (this.SessionUser.IdGrupo == GruposUsuariosEnum.GerentesRegionales.toString()) {
                objCliente.CreadoPor = "GERENTE DIVISIONAL";
            }
            else if (this.SessionUser.IdGrupo == GruposUsuariosEnum.Lider.toString()) {
                objCliente.CreadoPor = "LIDER";
            }
            else if (this.SessionUser.IdGrupo == GruposUsuariosEnum.EmpresariasWeb.toString()) {
                objCliente.CreadoPor = "EMPRESARIA WEB";
            }

            objCliente.Empresaria = this.CedulaEmpresaria;
            objCliente.ComoTeEnteraste = ComoTeEnterasteEnum.VisitadeunaGerentedeZona;//VisitadeunaGerentedeZona = 2

            objCliente.TerminosyCondiciones = true;
            objCliente.FechaAceptacionTerminos = new Date(); //TODO MRG: Validar si es fecha hora.
            objCliente.MostrarTerminosyCondiciones = true;

            //Se asigan al cliente la unidad de negocio de la zona.
            objCliente.Categoria = this.SessionUser.UniNegZona;

           


            if (this.PermitirPedidoMinimoxDefecto == "SI") {

                //Catalogo de interes
                if (this.ValorTPedMinimoxDefecto == UnidadNegocioEnum.Nivi) {
                    objCliente.IdCatalogoInteres = CatalogoInteresEnum.Nivi;
                    objCliente.CatalogoInteres = "CATALOGO GLOD";

                    //Se ingresa tipo de pedido minimo de la empresaria dependiendo de la unidaad de engocio de la zona.
                    objCliente.TipoPedidoMinimo = this.ValorTPedMinimoxDefecto;
                }
                else if (this.ValorTPedMinimoxDefecto == UnidadNegocioEnum.Pisame) {
                    objCliente.IdCatalogoInteres = CatalogoInteresEnum.Pisame;
                    objCliente.CatalogoInteres = "CATALOGO PASSI";

                    //Se ingresa tipo de pedido minimo de la empresaria dependiendo de la unidaad de engocio de la zona.
                    objCliente.TipoPedidoMinimo = this.ValorTPedMinimoxDefecto;
                }
                else if (this.ValorTPedMinimoxDefecto == UnidadNegocioEnum.Mixto) {
                    objCliente.IdCatalogoInteres = CatalogoInteresEnum.Ambos;
                    objCliente.CatalogoInteres = "AMBOS";

                    //Se ingresa tipo de pedido minimo de la empresaria dependiendo de la unidaad de engocio de la zona.
                    objCliente.TipoPedidoMinimo = this.ValorTPedMinimoxDefecto;
                }
            }
            else {
                //Se ingresa tipo de pedido minimo de la empresaria dependiendo de la unidaad de negocio de la zona.
                objCliente.TipoPedidoMinimo = Number(this.SessionUser.UniNegZona);

                //Catalogo de interes
                if (Number(this.SessionUser.UniNegZona) == UnidadNegocioEnum.Nivi) {
                    objCliente.IdCatalogoInteres = CatalogoInteresEnum.Nivi;
                    objCliente.CatalogoInteres = "CATALOGO GLOD";
                }
                else if (Number(this.SessionUser.UniNegZona) == UnidadNegocioEnum.Pisame) {
                    objCliente.IdCatalogoInteres = CatalogoInteresEnum.Pisame;
                    objCliente.CatalogoInteres = "CATALOGO PASI";
                }
                else if (Number(this.SessionUser.UniNegZona) == UnidadNegocioEnum.Mixto) {
                    objCliente.IdCatalogoInteres = CatalogoInteresEnum.Ambos;
                    objCliente.CatalogoInteres = "AMBOS";
                }
            }

            objCliente.TipoEnvio = this.form.value.DespacharA;

            //()()()()()())()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()())()
            //=========================================================================================

            //Valida si la empresaria existe o si la cedula no es valida.
  

                this.RegistrarEmpresaria(objCliente);
                this.Router.navigate(["/principal/"])

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.  
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                panelClass: 'dialogInfocustom',
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Registro Cliente Final", Mensaje: "No se pudo guardar el cliente." }
            });

            throw new ErrorLogExcepcion("RegistroClienteComponent", "EnviarInfo()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);

            //---------------------------------------------------------------------------------------------------------------
        }
    }

    //Metodo para validar si la empresaria existe. 
    public ValidarInfoEmpresaria(Nit: string) {
        var okInfo: boolean = false;

        var okCedula: boolean = true; // pc_verificar(Nit.Trim()); TODO MRG: validar cedula con ecuador.

        //lbl_nombreempresaria.ForeColor = System.Drawing.Color.Red;
        try {
            if (!okCedula) {
                //lbl_nombreempresaria.Text = "CEDULA INCORRECTA, PORFAVOR VERIFIQUE.";
            }
            else {
                //lbl_nombreempresaria.Text = "";
                this.ValidaExisteEmpresariaNombre(Nit)
                    .subscribe(nit => {
                        okInfo = this.validateInfo(nit, Nit, okInfo);
                    }


                    )

            }

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.  
            throw new ErrorLogExcepcion("RegistroEmpresariaEcComponent", "ValidarInfoEmpresaria()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);
            //---------------------------------------------------------------------------------------------------------------
        }

        return okInfo;
    }

    private validateInfo(nit: string, Nit: string, okInfo: boolean) {
        if (nit) {
            //TODO: Mauricio, si la empresaria existe no se debe permitir crear, se debe mostrar
            //msj de abajo comentado.
            var objCliente: E_Cliente = new E_Cliente();
            var objClienteResp: E_Cliente = new E_Cliente();
            objCliente.Nit = Nit;
            this.ClienteService.ListEstadoxNit(objCliente)
                .subscribe((x: E_Cliente) => {
                    objClienteResp = x;
                    if (objClienteResp != null) {
                        if (objClienteResp.IdEstadosCliente == EstadosClienteEnum.InactivaEcu) {
                            //---------------------------------------------------------------------------------------------------------------
                            //Llamar ventana de confirmacion
                            //Mensaje de Confirmacion
                            //*Esta empresaria corresponde a otra zona, desea añadirla a su red y actualizar sus datos?
                        }
                        else {
                            //* "LA EMPRESARIA YA EXISTE. NO SE PUEDE DUPLICAR LA INFORMACION DE LA EMPRESARIA."
                            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                                
                                panelClass: 'dialogInfocustom',
                                height: 'auto',
                                data: { TipoMensaje: "", Titulo: "Atención", Mensaje: "El cliente ya se encuentra registrado , por favor verifique." }
                            });
                            this.NumeroDocumento = " ";
                        }
                    }
                    else {
                        //* "LA EMPRESARIA YA EXISTE. NO SE PUEDE DUPLICAR LA INFORMACION DE LA EMPRESARIA."
                    }
                });

        }
        else {
            okInfo = true;
        }
        return okInfo;
    }

    /// <summary>
    /// Valida si existe una empresaria en el sistema.
    /// </summary>
    /// <returns></returns>
    private ValidaExisteEmpresariaNombre(Nit: string): Observable<string> {
        var nombreempresaria: string = "";
        let self = this
        return Observable.create(function (observer) {

            let obj = observer

            try {

                var objCliente: E_Cliente = new E_Cliente();
                var objClienteResponse: E_Cliente = new E_Cliente();
                objCliente.Nit = Nit;
                self.ClienteService.ListClienteSVDNxNit(objCliente)
                    .subscribe((x: E_Cliente) => {
                        objClienteResponse = x;

                        if (objClienteResponse != undefined) {
                            nombreempresaria = x.NombreEmpresariaCompleto;
                        }
                        else {
                            nombreempresaria = "";
                        }
                        obj.next(nombreempresaria);
                        obj.complete();
                    });

            }
            catch (error) {
                //---------------------------------------------------------------------------------------------------------------
                //Mensaje de Error.             
                throw new ErrorLogExcepcion("RegistroEmpresariaEcComponent", "ValidaExisteEmpresariaNombre()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);
                //---------------------------------------------------------------------------------------------------------------
            }


        })



    }

    /// <summary>
    /// Valida si la cedula de referidor es correcta, y valida si refereidor ya existe en el sistema.
    /// Si retorna true es por que la informacion es correcta y el referido se puede crear.
    /// </summary>
    /// <param name="Nit"></param>
    /// <returns></returns>
    public ValidarInfoReferidor(Nit: string) {
        var okInfo: boolean = false;

        var okCedula: boolean = false;

        try {

            okCedula = true;//pc_verificar(Nit.Trim()); TODO MRG: Validar contra cedula correcta ecuador

            if (!okCedula) {
                if (Nit == "") {
                    this.form.value.NombreReferido = "";
                }
                else {
                    this.form.value.NombreReferido = "CEDULA INCORRECTA, PORFAVOR VERIFIQUE.";
                }
            }
            else {
                this.form.value.NombreReferido = "";


                this.ValidaExisteEmpresariaNombre(Nit).subscribe(NombreReferidoPor => {
                    if (NombreReferidoPor != "") {
                        this.form.value.NombreReferido.Text = NombreReferidoPor;
                        okInfo = true;
                    }
                });


            }


        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.             
            throw new ErrorLogExcepcion("RegistroEmpresariaEcComponent", "ValidarInfoReferidor()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);
            //---------------------------------------------------------------------------------------------------------------
        }

        return okInfo;
    }

    private CrearUsuarioyClave(objCliente: E_Cliente) {

        try {
            var objClienteResponse: E_Cliente = new E_Cliente();
            this.ClienteService.CrearUsuarioyClave(objCliente)
                .subscribe((x: E_Cliente) => {
                    objClienteResponse = x;
                    this.CommunicationService.showLoader.next(false);
                    if (x.Error == undefined) {
                        //Mensaje de OK
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Ok", Titulo: "Registro Empresaria", Mensaje: "Se registro la empresaria exitosamente!" }
                        });

                        this.BorrarDatos();
                    }
                    else {
                        //---------------------------------------------------------------------------------------------------------------
                        //Mensaje de Error. 
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Error", Titulo: "Registro Empresaria", Mensaje: "No se pudo crear usuario y clave de la empresaria." }
                        });

                        throw new ErrorLogExcepcion("RegistroEmpresariaEcComponent", "CrearUsuarioyClave()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService);
                        //---------------------------------------------------------------------------------------------------------------
                    }
                });

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.   
            throw new ErrorLogExcepcion("RegistroEmpresariaEcComponent", "CrearUsuarioyClave()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);
            //---------------------------------------------------------------------------------------------------------------
        }
    }

    private RegistrarEmpresaria(objCliente: E_Cliente) {
        try {
            this.CommunicationService.showLoader.next(true);
            var objClienteResponse: E_Cliente = new E_Cliente();
            this.ClienteService.RegistrarEmpresaria(objCliente)
                .subscribe((x: E_Cliente) => {
                    objClienteResponse = x;

                    if (x.Error == undefined) {
                        // Insertar direcciones
                        let requests: any[] = [];
                        this.addresses.forEach(address => {
                            requests.push(this.ClienteService.RegistrarDireccion(address));
                        });

                        forkJoin(requests).toPromise().then(response => {
                            this.CrearUsuarioyClave(objCliente);
                        });
                    }
                    else {
                        //---------------------------------------------------------------------------------------------------------------
                        //Mensaje de Error. 
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Error", Titulo: "Registro Empresaria", Mensaje: "No se pudo guardar al cliente. Por favor verifique si ya existe o comuniquese con la empresa." }
                        });

                        throw new ErrorLogExcepcion("RegistroEmpresariaEcComponent", "RegistrarEmpresaria()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService);
                        //---------------------------------------------------------------------------------------------------------------
                    }

                });

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.  
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                panelClass: 'dialogInfocustom',
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Registro Empresaria", Mensaje: "No se pudo guardar la empresaria." }
            });

            throw new ErrorLogExcepcion("RegistroEmpresariaEcComponent", "RegistrarEmpresaria()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);

            //---------------------------------------------------------------------------------------------------------------
        }
    }


    /// <summary>
    /// Valida si la cedula de ecuador es valida para ingresar al sistema.
    /// </summary>
    /// <param name="cedula"></param>
    /// <returns></returns>
    public pc_verificar(cedula: string) {
        try {
            var a: number;
            var c: number;
            var x: number;
            var b: number;
            var d: number;
            var ap: number = 0;
            var at: number = 0;

            for (a = 0; a < 9; a = a + 2) {
                b = Number(cedula.substring(a, 1));
                b = b + b;
                Number(b);
                if (b > 9) {
                    b = b - 9;
                }
                ap = ap + b;
            }
            for (c = 1; c <= 8; c = c + 2) {
                d = Number(cedula.substring(c, 1));
                at = at + d;
            }
            x = ap + at;
            do {
                x = x - 10;
            }
            while (x > 0);
            var di: number = Math.abs(x);
            var ver: string = cedula.substring(a - 1, 1);
            var dig: string = di.toString();
            if (ver == dig) {
                return true;
                //MessageBox.Show("CEdula buena");
            }
            else {
                return false;
                // MessageBox.Show("CEdula mal");
            }
        }
        catch (Exception) {
            return false;
        }
    }

    BorrarDatos() {

        this.form.setValue({

            Regional: this.RegionalSeleccionado,
            DirectorZonal: this.DirectorZonalSeleccionado,
            Lider: this.LiderSeleccionado,
            TipoDocumento: this.TipoDocumentoSeleccionado,
            NumeroDocumento: "",
            PrimerNombre: "",
            SegundoNombre: "",
            PrimerApellido: "",
            SegundoApellido: "",
            FechaNacimiento: "",
            Genero: "F",
            Provincia: -1,
            Canton: -1,
            Parroquia: -1,
            Barrio: "",
            DireccionDomicilio: "",
            Calles: "",
            NumeroCasa: "",
            DireccionEntrega: "",
            OperadorCelular: "CLARO",
            NumeroCelular: "",
            Whatsapp: "",
            TelefonoDomicilio: "",
            OtroTelefono: "",
            ReferenciaFamiliar: "",
            TelefonoReferenciaFamiliar: "",
            ReferidoPor: "",
            NombreReferido: "",
            CorreoElectronico: "",
            DespacharA: -1,
            TipoCliente: -1,
            TallaPrendaSuperior: -1,
            TallaPrendaInferior: -1,
            TallaCalzado: -1,
            TipoTarjeta: -1
        });

    }
    public onStepperSelectionChange(evant: any) {
        var elmnt = document.getElementById("forms");
        elmnt.scrollTop = 100 + (evant.selectedIndex + 1) * 50;
    }

    showAddressComponent() {
        if (this.form.controls.NumeroDocumento.valid) {
            this.dialog.open(SeleccionDireccionComponent, {
                data: { showSave: false, cedula: this.form.value.NumeroDocumento, returnButton: true }, panelClass: "bottomStyleSheet", width: "95vw"
            }).afterClosed().subscribe((addresses) => {
                if (addresses != undefined) {
                    this.addresses = addresses;
                } else {
                    this.addresses = [];
                }
            });
        }
    }

}
