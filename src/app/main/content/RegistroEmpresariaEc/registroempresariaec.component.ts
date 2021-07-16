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
import { forkJoin, Observable } from 'rxjs';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { DireccionXUsuario } from 'app/Models/DireccionXUsuario';
import { SeleccionDireccionComponent } from '../Ubicacion/seleccion-direccion/seleccion-direccion.component';

@Component({
    moduleId: module.id,
    selector: 'registroempresariaec',
    templateUrl: 'registroempresariaec.component.html',
    styleUrls: ['registroempresariaec.component.scss']
})
export class RegistroEmpresariaEcComponent implements OnInit {
    NumeroDocumento: any;
    PrimerNombre: any;
    SegundoNombre: any;
    PrimerApellido: any;
    SegundoApellido: any;
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
    Actualizacion: boolean = false;
    minDate: Date;
    maxDate: Date;

    public mostrarValidarEmail:boolean
    public mostrarValidarCel:boolean

    addresses:DireccionXUsuario[] = [];

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
        { IdDespacharA: "2", Nombre: 'DIRECTOR' },
        { IdDespacharA: "3", Nombre: 'LIDER' },
    ];


    public ListTipoCliente: Array<Object> = [
        { IdTipoCliente: "EMPRESARIA", Nombre: 'EMPRESARIA' },
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

            Regional: {},
            DirectorZonal: {},
            Lider: {},
            TipoDocumento: {},
            NumeroDocumento: {},
            PrimerNombre: {},
            SegundoNombre: {},
            PrimerApellido: {},
            SegundoApellido:{},
            FechaNacimiento: {},
            Genero: {},
            Provincia: {},
            Canton: {},
            Parroquia: {},
            Barrio: {},
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

    validarcelular(){                
        let encvio = new E_Cliente();
        encvio.Celular1 =this.form.value.NumeroCelular
        this.ClienteService.ListxCel(encvio).subscribe(x =>{
            debugger
            if( !_.isNil(x.Nit)){
                this.mostrarValidarCel=true;
            }else{
                this.mostrarValidarCel=false;
            }
        })
    }

    validarEmail(){     
        debugger                   
        let encvio = new E_Cliente();
        encvio.Email =this.form.value.CorreoElectronico
        this.ClienteService.ListxEmail(encvio).subscribe(x =>{
            if( !_.isNil(x.Nit)){
                this.mostrarValidarEmail=true;
            }else{
                this.mostrarValidarEmail=false;
            }
        })
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(ModalPopUpComponent, {
            panelClass: 'dialogInfocustom',
            width: '450px',
            data: { TipoMensaje: "Error", Titulo: "Registro Empresaria", Mensaje: "Se guardo el registro exitosamente!." }
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
        this.maxDate = new Date(2003, 11, 31);

        this.MaskedNumber = GenerateMask.numberMask;
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal;
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow();

        const chainSubcriptions = []
        chainSubcriptions.push(this.ParameterService.listarRegionalxzona(this.SessionUser))
        chainSubcriptions.push(this.ParameterService.listarVendedor(this.SessionUser))
        chainSubcriptions.push(this.ParameterService.listarLider(this.SessionUser))
        chainSubcriptions.push(this.ParameterService.listarTipoDocumento(this.SessionUser))
        chainSubcriptions.push(this.ParameterService.listarProvincia())
        this.CommunicationService.showLoader.next(true)
        forkJoin(chainSubcriptions).subscribe((response: [Array<E_Regional>, Array<E_Vendedor>, Array<E_Lider>, Array<E_TipoDocumento>, Array<E_Provincia>]) => {
            this.SetRegional(response[0]);
            this.setVendedores(response[1]);
            this.SetLider(response[2]);
            this.SetTipoDoc(response[3]);
            this.setProvincia(response[4]);
            this.CommunicationService.showLoader.next(false)
        })



        this.CargarParametrosxDefecto();

        //
        //const toSelect = this.ListRegional.find(c => c.IdRegional == this.ListRegional[0].toString());
        //this.form.get('Regional').setValue("Coordinador 4");

        this.form = this.formBuilder.group({
            Regional: [undefined, [Validators.required]],
            DirectorZonal: [undefined, []],
            Lider: [undefined, [Validators.required]],
            TipoDocumento: [undefined, [Validators.required]],
            NumeroDocumento: [undefined, [Validators.required]],
            PrimerNombre: [undefined, [Validators.required]],
            SegundoNombre: [''],
            PrimerApellido: [undefined, [Validators.required]],
            SegundoApellido: [undefined],
            FechaNacimiento: [undefined, [Validators.required]],
            Genero: [undefined, [Validators.required]],
            /*
            Provincia: [undefined, [Validators.required]],
            Canton: [undefined, [Validators.required]],
            Parroquia: [undefined, [Validators.required]],
            Barrio: [undefined, [Validators.required]],
            DireccionDomicilio: [undefined, [Validators.required]],
            Calles: [undefined, [Validators.required]],
            NumeroCasa: [undefined, [Validators.required]],
            DireccionEntrega: [undefined, [Validators.required]],
            */
            //OperadorCelular: [undefined, [Validators.required]],
            NumeroCelular: [undefined, [Validators.required]],
            //Whatsapp: [undefined, [Validators.required]],
            TelefonoDomicilio: [undefined, [Validators.required]],
            //OtroTelefono: [''],
            //ReferenciaFamiliar: [''],
            //TelefonoReferenciaFamiliar: [''],
            ReferidoPor: [''],
            NombreReferido: [''],
            CorreoElectronico: ['', [Validators.required, Validators.email]],
            //DespacharA: [undefined, [Validators.required]],
            TipoCliente: [undefined, [Validators.required]],
            //TallaPrendaSuperior: [undefined, [Validators.required]],
            //TallaPrendaInferior: [undefined, [Validators.required]],
            //TallaCalzado: [undefined, [Validators.required]],
            //TipoTarjeta: [undefined, [Validators.required]]

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

    private SetLider(x: E_Lider[]) {
        this.ListLider = x;
        console.log(x);
        //Para que ponga por defecto el que trae sin poderlo modificar.
        if (!_.isNil(x) && x.length > 0) {
            this.LiderSeleccionado = x[0].IdLider;
        }
    }

    private setVendedores(x: E_Vendedor[]) {
        this.ListDirectorZonal = x;
        console.log(x);
        //Para que ponga por defecto el que trae sin poderlo modificar.
        if (!_.isNil(x) && x.length > 0) {
            this.DirectorZonalSeleccionado = x[0].IdVendedor;
        }
    }

    private SetRegional(x: E_Regional[]) {
        this.ListRegional = x;
        if (!_.isNil(x) && x.length > 0) {
            this.RegionalSeleccionado = x[0].IdRegional;
        }
        //Para que ponga por defecto el que trae sin poderlo modificar.
        //Siempre con el ID de la tabla regional.
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


    SelectedRegional(y: { value: string; }) {

        var depObj = this.ListRegional.find(x => x.IdRegional == y.value);
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }

    SelectedDirectorZonal(y: { value: string; }) {

        var depObj = this.ListDirectorZonal.find(x => x.IdVendedor == y.value);
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }

    SelectedLider(y: { value: string; }) {

        var depObj = this.ListLider.find(x => x.IdLider == y.value);
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
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

    ConfirmCambioRed() {
        this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {panelClass: 'dialogInfocustom'});
        this.confirmDialogRef.componentInstance.confirmMessage = 'La empresaria se encuentra Inactiva en otra red ¿Desea activarla bajo su red?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result)
             { this.TraerData(this.form.value.NumeroDocumento);
                  }

            this.confirmDialogRef = null;
        });

    }

    EnviarInfo() {
        var objCliente: E_Cliente = new E_Cliente();

        try {
            objCliente.Usuario =this.SessionUser.Cedula.trim()+' '+ this.SessionUser.NombreUsuario.trim()
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

            objCliente.DireccionResidencia =  this.addresses[0].Direccion;
            objCliente.Barrio = '';
            objCliente.NombreBarrio = '';
            objCliente.Calles = '';
            objCliente.NumeroCasa = '';
            objCliente.ComoLlegar = this.addresses[0].PuntoReferencia;

            /*
            objCliente.DireccionResidencia = this.form.value.DireccionDomicilio;
            objCliente.Barrio = this.form.value.Barrio;
            objCliente.NombreBarrio = this.form.value.Barrio;
            objCliente.Calles = this.form.value.Calles;
            objCliente.NumeroCasa = this.form.value.NumeroCasa;
            objCliente.ComoLlegar = this.form.value.DireccionEntrega;
            */
            objCliente.OperadorCelular = this.form.value.OperadorCelular;
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

            objCliente.Lider = this.form.value.Lider;

            if  (!_.isNil(this.form.value.SegundoNombre))
            {
             objCliente.Nombre2 = this.form.value.SegundoNombre.toUpperCase();
            }else
            {
             objCliente.Nombre2 =''
            }
            if  (!_.isNil(this.form.value.SegundoApellido)){
             objCliente.Apellido2 = this.form.value.SegundoApellido.toUpperCase();
            }else
            {
             objCliente.Apellido2 = '';
            }
             
            objCliente.RazonSocial = objCliente.Nombre1 + " " + objCliente.Nombre2 + " " + objCliente.Apellido1 + " " + objCliente.Apellido2;

            objCliente.Whatsapp = this.form.value.NumeroCelular;
            objCliente.TipoCliente = this.form.value.TipoCliente;
            objCliente.TallaPrendaSuperior = this.form.value.TallaPrendaSuperior;
            objCliente.TallaPrendaInferior = this.form.value.TallaPrendaInferior;
            objCliente.TallaCalzado = this.form.value.TallaCalzado;
            objCliente.TarjetaCD = this.form.value.TipoTarjeta;

            if (this.SessionUser.IdLider != null) {
                objCliente.Lider = this.SessionUser.IdLider;
            }

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


            objCliente.ComoTeEnteraste = ComoTeEnterasteEnum.VisitadeunaGerentedeZona;//VisitadeunaGerentedeZona = 2

            objCliente.TerminosyCondiciones = true;
            objCliente.FechaAceptacionTerminos = new Date(); //TODO MRG: Validar si es fecha hora.
            objCliente.MostrarTerminosyCondiciones = true;

            //Se asigan al cliente la unidad de negocio de la zona.
            objCliente.Categoria = this.SessionUser.UniNegZona;

            //Se ingresa el lider de la empresaria.
            objCliente.Lider = this.form.value.Lider;



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
                    objCliente.CatalogoInteres = "CATALOGO PASSI";
                }
                else if (Number(this.SessionUser.UniNegZona) == UnidadNegocioEnum.Mixto) {
                    objCliente.IdCatalogoInteres = CatalogoInteresEnum.Ambos;
                    objCliente.CatalogoInteres = "AMBOS";
                }
            }

            objCliente.TipoEnvio = this.form.value.DespacharA;

            //()()()()()())()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()())()
            //=========================================================================================
            if (this.Actualizacion){
                objCliente.IdEstadosCliente = EstadosClienteEnum.PosibleReingreso
                objCliente.EnProduccion = true;

                this.ActualizaEmpresaria(objCliente);
            }else
            {
                this.RegistrarEmpresaria(objCliente);
              
            }
    
            this.Router.navigate(["/principal/"])
            
        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.  
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                panelClass: 'dialogInfocustom',
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Registro Empresaria", Mensaje: "No se pudo guardar la empresaria." }
            });

            throw new ErrorLogExcepcion("RegistroEmpresariaEcComponent", "EnviarInfo()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);

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
        this.ClienteService.ListClienteSVDNxNit(objCliente)
            .subscribe((x: E_Cliente) => {
                objClienteResp = x;
                if (objClienteResp != null) {
                    if (objClienteResp.IdEstadosCliente == EstadosClienteEnum.InactivaEcu) {
                        //---------------------------------------------------------------------------------------------------------------
                        //Llamar ventana de confirmacion
                        //Mensaje de Confirmacion
                        //*Esta empresaria corresponde a otra zona, desea añadirla a su red y actualizar sus datos?
                    this.ConfirmCambioRed();

                    }
                    else {
                        //* "LA EMPRESARIA YA EXISTE. NO SE PUEDE DUPLICAR LA INFORMACION DE LA EMPRESARIA."
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            
                            panelClass: 'dialogInfocustom',
                            height: 'auto',
                            data: { TipoMensaje: "", Titulo: "Atención", Mensaje: "El numero de  cédula "+ this.form.value.NumeroDocumento+ "  ya se encuentra registrada , por favor verificar." }
                        });
                       this.form.value.NumeroDocumento="";
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
                        this.form.value.NombreReferido = NombreReferidoPor;
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
                            data: { TipoMensaje: "Error", Titulo: "Registro Empresaria", Mensaje: "No se pudo guardar la empresaria. Por favor verifique si ya existe o comuniquese con la empresa." }
                        });

                        this.CommunicationService.showLoader.next(false);

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

    TraerData(cedula: string) {
        try {

              

                    var objClienteResquest: E_Cliente = new E_Cliente()
                    objClienteResquest.Nit = cedula;

                   
                 
                    //..............................................................................



                    this.ClienteService.ConsultaExisteEmpresariaNombre(objClienteResquest).subscribe((x: E_Cliente) => {

                        if (x.Nit != undefined) {
                          
                                    this.Actualizacion = true;
                                    this.GeneroSeleccionado = x.Sexo;
                                    this.FechaNacimiento = x.FechaNacimiento;
                                    this.PrimerNombre= x.Nombre1;
                                    this.SegundoNombre = x.Nombre2;
                                    this.PrimerApellido= x.Apellido1;
                                    this.SegundoApellido= x.Apellido2;
                                    this.Barrio = x.Barrio
                                    this.NumeroCelular= x.Celular1;
                                    this.TelefonoDomicilio=x.Telefono1;
                                    this.CorreoElectronico = x.Email;
                                    this.OtroTelefono = x.Telefono2;
                                    this.Whatsapp = x.Celular1;
                                    this.DireccionDomicilio=x.DireccionPedidos;
                                    this.TallaPrendaSuperiorSeleccionado =x.TallaPrendaSuperior;
                                    this.TallaPrendaInferiorSeleccionado = x.TallaPrendaInferior;
                                    this.TallaCalzadoSeleccionado = x.TallaCalzado;
                                    this.CantonSeleccionado = x.CodCiudad
                                    this.ParroquiaSeleccionado = x.CodigoParroquia                      
                                    this.ProvinciaSeleccionado = x.CodCiudad.substr(0, 3);
                                    this.ParameterService.listarProvincia()
                                        .subscribe((x: Array<E_Provincia>) => {
                                            this.ListProvincia = x;
                                            const toSelect = this.ListProvincia.find(c => c.CodEstado == this.ProvinciaSeleccionado);
                                            this.form.get('Provincia').setValue(toSelect);
                                            this.ProvinciaSeleccionado = toSelect.CodEstado;
                            
                                            this.ParameterService.listarCanton(toSelect)
                                                .subscribe((x: Array<E_Canton>) => {
                                                    this.ListCanton = x;
                                                    const toSelectC = this.ListCanton.find(c => c.CodCiudad == this.CantonSeleccionado);
                                                    this.form.get('Canton').setValue(toSelectC);
                                                    this.CantonSeleccionado = toSelectC.CodCiudad;
                                                    var objCanton: E_Canton = new E_Canton();
                                                    objCanton.CodCiudad = toSelectC.CodCiudad.substring(3);
                                                    objCanton.CodEstado = this.ProvinciaSeleccionado.substring(1);
                            
                            
                                                });
                            
                            
                                        });
                            
                                    var objCanton: E_Canton = new E_Canton();
                                    objCanton.CodCiudad = x.CodCiudad.substring(3);;
                                    objCanton.CodEstado = this.ProvinciaSeleccionado.substring(1);
                            
                                    this.ParroquiaSeleccionado = x.CodigoParroquia;
                                    this.ParameterService.listarParroquia(objCanton)
                                        .subscribe((x: Array<E_Parroquia>) => {
                                            this.ListParroquia = x;
                                            const toSelectP = this.ListParroquia.find(c => c.Codigo == this.ParroquiaSeleccionado);
                                            if(!_.isNil(toSelectP)){
                                                this.form.get('Parroquia').setValue(toSelectP);
                                                this.ParroquiaSeleccionado = toSelectP.Codigo;
                                            }        
                                        });

 

                        }
                        else {
                            
                            //---------------------------------------------------------------------------------------------------------------
                            //Mensaje de Error. 
                            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                                panelClass: 'dialogInfocustom',
                                width: '450px',
                                data: { TipoMensaje: "Error", Titulo: "Empresaria", Mensaje: "La empresaria no existe. Por favor verifique." }
                            });

                            throw new ErrorLogExcepcion("EdicionEmpresariaComponent", "ValidateDocument()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)
                            //---------------------------------------------------------------------------------------------------------------

                        }

                    })

                
            

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.  
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                panelClass: 'dialogInfocustom',
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Empresaria", Mensaje: "No se pudo validar la empresaria." }
            });

            throw new ErrorLogExcepcion("ActualizaEmpresariaEcComponent", "ValidateDocument()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService)

            //---------------------------------------------------------------------------------------------------------------
        }
    }

    
    private ActualizaEmpresaria(objCliente: E_Cliente) {
        try {
            this.CommunicationService.showLoader.next(true);
            var objClienteResponse: E_Cliente = new E_Cliente();
            this.ClienteService.ActualizarEmpresariaL(objCliente)
                .subscribe((x: E_Cliente) => {
                    objClienteResponse = x;

                  
                    if (x.Error == undefined) {
                        //Mensaje de OK

                        // Insertar direcciones
                        let requests: any[] = [];
                        this.addresses.forEach(address => {
                            if (address.Id != null && address.Id != undefined && address.Id != 0)
                                requests.push(this.ClienteService.ActualizarDireccion(address));
                            else
                                requests.push(this.ClienteService.RegistrarDireccion(address));
                        });

                        forkJoin(requests).toPromise().then(response => {
                            this.CommunicationService.showLoader.next(false);
                            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                                panelClass: 'dialogInfocustom',
                              
                                
                                width: '450px',
                                data: { TipoMensaje: "Ok", Titulo: "Actualizacion de  Empresaria", Mensaje: "Se registro la  empresaria exitosamente!" }
                            });
                        });
                    }
                    else {
                        //---------------------------------------------------------------------------------------------------------------
                        this.CommunicationService.showLoader.next(false);
                        //Mensaje de Error. 
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Error", Titulo: "Actualizacion de Empresaria", Mensaje: "No se pudo crear usuario y clave de la empresaria." }
                        });

                        throw new ErrorLogExcepcion("ActualizaEmpresariaEcComponent", "CrearUsuarioyClave()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService);
                        //---------------------------------------------------------------------------------------------------------------
                    }

                });
                
        //this.BorrarDatos();
       // this.bottomSheetRef.dismiss();

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.  
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                panelClass: 'dialogInfocustom',
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Actualizacion Empresaria", Mensaje: "No se pudo guardar la empresaria." }
            });

            throw new ErrorLogExcepcion("ActualizaEmpresariaEcComponent", "RegistrarEmpresaria()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);

            //---------------------------------------------------------------------------------------------------------------
        }

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
