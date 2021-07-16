//import { Component, OnInit } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
//import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { Router,ActivatedRoute } from '@angular/router';
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
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
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
import { forkJoin } from 'rxjs';
import { CommunicationService } from 'app/ApiServices/CommunicationService';

export interface DialogData {
  
    Nit: string;
  }

@Component({
    moduleId: module.id,
    selector: 'actualizaempresariaec',
    templateUrl: 'actualizaempresariaec.component.html',
    styleUrls: ['actualizaempresariaec.component.scss']
})
export class ActualizaEmpresariaEcComponent implements OnInit {

    NumeroDocumento;
    PrimerNombre;
    SegundoNombre;
    PrimerApellido;
    SegundoApellido;
    FechaNacimiento;
    Barrio;
    DireccionDomicilio;
    NumeroCelular;
    Whatsapp;
    TelefonoDomicilio;
    OtroTelefono;
    CorreoElectronico;
    TallaPrendaSuperiorSeleccionado;
    TallaPrendaInferiorSeleccionado;
    TallaCalzadoSeleccionado;
    ClasificacionCredito;
    Contactada;
    InteresCredito;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    SaveInProgress: boolean;
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[];
    MaskedNumberNoDecimal: any[];
    form: FormGroup;
    formErrors: any;

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
    public SessionEmpresaria: E_SessionEmpresaria = new E_SessionEmpresaria()


    public objParametrosResponse: E_Parametros = new E_Parametros();

    public ListGenero: Array<any> = [
        { IdGenero: "F", Nombre: 'FEMENINO' },
        { IdGenero: "M", Nombre: 'MASCULINO' },
    ];
    public GeneroSeleccionado: string = "F";

    public ListContactada: Array<any> = [
        { IdContactada: true, Nombre: 'CONTACTADO' },
        { IdContactada: false, Nombre: 'NO CONTACTADO' },
    ];
    public ContactadaSeleccionado: boolean = false;

    public ListInteresC: Array<any> = [
        { IdInteres: true , Nombre: 'INTERESA CREDITO' },
        { IdInteres: false, Nombre: 'NO INTERSA CREDITO' },
    ];
    public InteresCSeleccionado: boolean = false;

    public ListOperadorCelular: Array<any> = [
        { IdOperador: "CLARO", Nombre: 'CLARO' },
        { IdOperador: "MOVISTAR", Nombre: 'MOVISTAR' },
        { IdOperador: "CNT", Nombre: 'CNT' },
    ];
    public OperadorCelularSeleccionado: string = "CLARO";

    public ListDespacharA: Array<any> = [
        { IdDespacharA: "1", Nombre: 'MI CASA' },
        { IdDespacharA: "2", Nombre: 'DIRECTOR' },
        { IdDespacharA: "3", Nombre: 'LIDER' },
    ];


    public ListTipoCliente: Array<any> = [
        { IdTipoCliente: "EMPRESARIA", Nombre: 'EMPRESARIA' },
        { IdTipoCliente: "CONSUMIDOR", Nombre: 'CONSUMIDOR' },
    ];

    public ListTallaPrendaSuperior: Array<any> = [
        { IdTallaPrendaSuperior: "S", Nombre: 'S' },
        { IdTallaPrendaSuperior: "M", Nombre: 'M' },
        { IdTallaPrendaSuperior: "L", Nombre: 'L' },
        { IdTallaPrendaSuperior: "XL", Nombre: 'XL' },
        { IdTallaPrendaSuperior: "2XL", Nombre: '2XL' }
    ];

    public ListTallaPrendaInferior: Array<any> = [
        { IdTallaPrendaInferior: "S", Nombre: 'S' },
        { IdTallaPrendaInferior: "M", Nombre: 'M' },
        { IdTallaPrendaInferior: "L", Nombre: 'L' },
        { IdTallaPrendaInferior: "XL", Nombre: 'XL' },
        { IdTallaPrendaInferior: "2XL", Nombre: '2XL' }
    ];

    public ListTallaCalzado: Array<any> = [
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

    public ListTipoTarjeta: Array<any> = [
        { IdTipoTarjeta: "DEBITO", Nombre: 'DEBITO' },
        { IdTipoTarjeta: "CREDITO", Nombre: 'CREDITO' },
    ];

    public SessionUser: E_SessionUser = new E_SessionUser();

   /// public Nombre: string;
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
        private CommunicationService: CommunicationService,
        private activatedRoute: ActivatedRoute,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
    ) {

        this.formErrors = {

       
            NumeroDocumento: {},
            PrimerNombre: {},
            SegundoNombre: {},
            PrimerApellido: {},
            SegundoApellido: {},
            FechaNacimiento: {},
            Genero: {},
            Provincia: {},
            Canton: {},
            Parroquia: {},
            Barrio: {},
            DireccionDomicilio: {},
            OperadorCelular: {},
            NumeroCelular: {},
            TelefonoDomicilio: {},
            OtroTelefono: {},
            CorreoElectronico: {},
            Whatsapp: {},
            TallaPrendaSuperior: {},
            TallaPrendaInferior: {},
            TallaCalzado: {},
            Contactada: {}, 
            InteresCredito: {} 
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
            data: { TipoMensaje: "Error", Titulo: "Actualizacion Empresarias", Mensaje: "Se guardo la Actualizacion con exitosamente!." }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            //this.Mensaje = result; //AQUI RECIBE LOS DATOS DEL POPUP CERRADO. OJO PARA PEDIDO.
        });

        //TODO:MRG: Produce un error  at new ErrorLogExcepcion pero guarda en la BD. Corregir
        //TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments anys for calls to them at Function.invokeGetter (<anonymous>:2:14)
        throw new ErrorLogExcepcion("PedidosPrincipalComponent", "openDialog()", "Prueba Error", this.SessionUser.Cedula, this.ExceptionErrorService);
    }

    ngOnInit() {

        


     
        this.minDate = new Date(1900, 0, 1);
        this.maxDate = new Date(2000, 11, 31);

        this.MaskedNumber = GenerateMask.numberMask;
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal;
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow();

        const chainSubcriptions = []
        chainSubcriptions.push(this.ParameterService.listarRegional(this.SessionUser))
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
       

        //
        //const toSelect = this.ListRegional.find(c => c.IdRegional == this.ListRegional[0].toString());
        //this.form.get('Regional').setValue("Coordinador 4");

        this.form = this.formBuilder.group({
            NumeroDocumento: [undefined, [Validators.required]],
            PrimerNombre: [undefined, [Validators.required]],
            SegundoNombre: [undefined, [Validators.required]],
            PrimerApellido: [undefined, [Validators.required]],
            SegundoApellido: [undefined, [Validators.required]],
            FechaNacimiento: [undefined, [Validators.required]],
            Genero: [undefined, [Validators.required]],
            Provincia: [undefined, [Validators.required]],
            Canton: [undefined, [Validators.required]],
            Parroquia: [undefined, [Validators.required]],
            Barrio: [undefined, [Validators.required]],
            DireccionDomicilio: [undefined, [Validators.required]],
            OperadorCelular: [undefined, [Validators.required]],
            NumeroCelular: [undefined, [Validators.required]],
            Whatsapp: [undefined, [Validators.required]],
            TelefonoDomicilio: [undefined, [Validators.required]],
            OtroTelefono: [''],
           CorreoElectronico: ['', [Validators.required, Validators.email]],
            TallaPrendaSuperior: [undefined, [Validators.required]],
            TallaPrendaInferior: [undefined, [Validators.required]],
            TallaCalzado: [undefined, [Validators.required]],
            ClasificacionCredito: [undefined, [Validators.required]],
            Contactada: [undefined, [Validators.required]],
            InteresCredito: [undefined, [Validators.required]]

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




    SelectedRegional(y) {

        var depObj = this.ListRegional.find(x => x.IdRegional == y.value);
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }

    SelectedDirectorZonal(y) {

        var depObj = this.ListDirectorZonal.find(x => x.IdVendedor == y.value);
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }

    SelectedLider(y) {

        var depObj = this.ListLider.find(x => x.IdLider == y.value);
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }

    SelectedTipoDocumento(y) {

        var depObj = this.ListTipoDocumento.find(x => x.Id == y.value);
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }


    //Llama a los cantones en cascada. Canton = CIUDAD
    SelectedProvincia(y) {

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
    SelectedCanton(y) {

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


    SelectedParroquia(y) {

        var depObj = this.ListParroquia.find(x => x.CodigoParroquia == y.value);
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }


    //validar documento con formato de Ecuador correcto.
    //ValidateDocument() {

       // if (this.form.value.NumeroDocumento != '' && this.form.value.NumeroDocumento != undefined) {
            //var okDoc = this.pc_verificar(this.form.value.NumeroDocumento)
            //console.log('okDoc:' + okDoc)
      //  }
    //}

    ValidateDocument() {
        try {

           

         
            if (this.form.value.NumeroDocumento!= '' && this.form.value.NumeroDocumento!= undefined) {
                //var okDoc = this.pc_verificar(this.form.value.NumeroDocumento)
                //console.log('okDoc:' + okDoc)
                if (true) {

                    var objClienteResquest: E_Cliente = new E_Cliente()
                    objClienteResquest.Nit = this.form.value.NumeroDocumento;

                   
                 
                    //..............................................................................



                    this.ClienteService.ConsultaExisteEmpresariaNombre(objClienteResquest).subscribe((x: E_Cliente) => {

                        if (x.Nit != undefined) {
                          
                           
                                    this.form.value.NombreEmpresariaCompleto = x.NombreEmpresariaCompleto;
                                    this.GeneroSeleccionado = x.Sexo;
                                    this.TallaCalzadoSeleccionado = x.TallaCalzado;
                                    this.TallaPrendaInferiorSeleccionado = x.TallaPrendaInferior;
                                    this.TallaPrendaSuperiorSeleccionado = x.TallaPrendaSuperior;
                                    this.FechaNacimiento = x.FechaNacimiento;
                                    this.PrimerNombre= x.Nombre1;
                                    this.SegundoNombre = x.Nombre2;
                                    this.PrimerApellido= x.Apellido1;
                                    this.SegundoApellido= x.Apellido2;
                                    this.DireccionDomicilio=x.DireccionResidencia;
                                    this.InteresCSeleccionado = x.InteresCredito;
                                    this.ClasificacionCredito = x.ClasificacionC;


                        }
                        else {
                            
                            //---------------------------------------------------------------------------------------------------------------
                            //Mensaje de Error. 
                            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                                panelClass: 'dialogInfocustom',
                                width: '450px',
                                data: { TipoMensaje: "Error", Titulo: "Empresaria", Mensaje: "La empresaria no existe. Por favor verifique." }
                            });

                            throw new ErrorLogExcepcion("ActualizaEmpresariaEcComponent", "ValidateDocument()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)
                            //---------------------------------------------------------------------------------------------------------------

                        }

                    })

                }
            }

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

            objCliente.CodDepartamento = this.form.value.Provincia;
            objCliente.CodCiudad = this.form.value.Canton;
            objCliente.CodigoParroquia = this.form.value.Parroquia;
            objCliente.NombreParroquia = this.form.value.Parroquia;//TODO MRG: poner nombre
            objCliente.DireccionPedidos = this.form.value.DireccionEntrega;
            objCliente.DireccionResidencia = this.form.value.DireccionDomicilio;
            objCliente.Barrio = this.form.value.Barrio;
            objCliente.NombreBarrio = this.form.value.Barrio;
            objCliente.Calles = this.form.value.Calles;
            objCliente.NumeroCasa = this.form.value.NumeroCasa;
            objCliente.ComoLlegar = this.form.value.DireccionEntrega;

            objCliente.OperadorCelular = this.form.value.OperadorCelular;
            objCliente.Telefono1 = this.form.value.NumeroCelular;
            objCliente.Telefono2 = this.form.value.TelefonoDomicilio;
            objCliente.Celular1 = this.form.value.OtroTelefono;
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

            objCliente.Nombre2 = this.form.value.SegundoNombre.toUpperCase();
            objCliente.Apellido2 = this.form.value.SegundoApellido.toUpperCase();

            objCliente.RazonSocial = objCliente.Nombre1 + " " + objCliente.Nombre2 + " " + objCliente.Apellido1 + " " + objCliente.Apellido2;

            objCliente.Whatsapp = this.form.value.Whatsapp;
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

         
                this.actualizaEmpresaria(objCliente);

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.  
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                panelClass: 'dialogInfocustom',
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Actualizacion de  Empresaria", Mensaje: "No se pudo guardar la actualizacion empresaria." }
            });

            throw new ErrorLogExcepcion("ActualizaEmpresariaEcComponent", "EnviarInfo()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);

            //---------------------------------------------------------------------------------------------------------------
        }
    }




    private CrearUsuarioyClave(objCliente: E_Cliente) {

        try {
            var objClienteResponse: E_Cliente = new E_Cliente();
            this.ClienteService.CrearUsuarioyClave(objCliente)
                .subscribe((x: E_Cliente) => {
                    objClienteResponse = x;

                    if (x.Error == undefined) {
                        //Mensaje de OK
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Ok", Titulo: "Actualizacion de  Empresaria", Mensaje: "Se registro la Actualizacion de empresaria exitosamente!" }
                        });

                        this.BorrarDatos();
                    }
                    else {
                        //---------------------------------------------------------------------------------------------------------------
                        //Mensaje de Error. 
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            width: '450px',
                            data: { TipoMensaje: "Error", Titulo: "Actualizacion de Empresaria", Mensaje: "No se pudo crear usuario y clave de la empresaria." }
                        });

                        throw new ErrorLogExcepcion("ActualizaEmpresariaEcComponent", "CrearUsuarioyClave()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService);
                        //---------------------------------------------------------------------------------------------------------------
                    }
                });

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.   
            throw new ErrorLogExcepcion("ActualizaEmpresariaEcComponent", "CrearUsuarioyClave()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);
            //---------------------------------------------------------------------------------------------------------------
        }
    }

    private actualizaEmpresaria(objCliente: E_Cliente) {
        try {
            var objClienteResponse: E_Cliente = new E_Cliente();
            this.ClienteService.RegistrarEmpresaria(objCliente)
                .subscribe((x: E_Cliente) => {
                    objClienteResponse = x;

                    if (x.Error == undefined) {
                        this.CrearUsuarioyClave(objCliente);
                    }
                    else {
                        //---------------------------------------------------------------------------------------------------------------
                        //Mensaje de Error. 
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Error", Titulo: "Actualizacion de  Empresaria", Mensaje: "No se pudo Actualizar la empresaria. Por favor verifique si ya existe o comuniquese con la empresa." }
                        });

                        throw new ErrorLogExcepcion("ActualizaEmpresariaEcComponent", "RegistrarEmpresaria()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService);
                        //---------------------------------------------------------------------------------------------------------------
                    }

                });

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.  
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Actualizacion Empresaria", Mensaje: "No se pudo guardar la empresaria." }
            });

            throw new ErrorLogExcepcion("ActualizaEmpresariaEcComponent", "RegistrarEmpresaria()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);

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

}
