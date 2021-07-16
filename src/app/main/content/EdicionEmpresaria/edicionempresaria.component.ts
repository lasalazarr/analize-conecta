//import { Component, OnInit } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
//import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatBottomSheetRef,MatDialogRef, MAT_DIALOG_DATA,MAT_BOTTOM_SHEET_DATA } from '@angular/material';
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
import { DireccionXUsuario } from 'app/Models/DireccionXUsuario';
import { SeleccionDireccionComponent } from '../Ubicacion/seleccion-direccion/seleccion-direccion.component';




export interface DialogData {
  
    Nit: string;
    Departamento : string;
    Ciudad: string;
  }

@Component({
    moduleId: module.id,
    selector: 'edicionempresaria',
    templateUrl: 'edicionempresaria.component.html',
    styleUrls: ['edicionempresaria.component.scss']
})
export class EdicionEmpresariaComponent implements OnInit {

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
    NombreLider;

    public mostrarValidarEmail:boolean
    public mostrarValidarCel:boolean
    addresses:DireccionXUsuario[] = [];
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
    public EstadoCliente: number ;
    public ProvinciaCliente: string ="";
    public CiudadCliente: string ="";

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

    public ListGenero: Array<Object> = [
        { IdGenero: "F", Nombre: 'FEMENINO' },
        { IdGenero: "M", Nombre: 'MASCULINO' },
    ];
    public GeneroSeleccionado: string = "F";

    public ListContactada: Array<Object> = [
        { IdContactada: true, Nombre: 'CONTACTADO' },
        { IdContactada: false, Nombre: 'NO CONTACTADO' },
    ];
    public ContactadaSeleccionado: boolean = false;

    public ListInteresC: Array<Object> = [
        { IdInteres: true , Nombre: 'INTERESA CREDITO' },
        { IdInteres: false, Nombre: 'NO INTERSA CREDITO' },
    ];
    public InteresCSeleccionado: boolean = false;

    public ListOperadorCelular: Array<Object> = [
        { IdOperador: "CLARO", Nombre: 'CLARO' },
        { IdOperador: "MOVISTAR", Nombre: 'MOVISTAR' },
        { IdOperador: "CNT", Nombre: 'CNT' },
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
        private bottomSheetRef: MatBottomSheetRef<EdicionEmpresariaComponent>,
        private activatedRoute: ActivatedRoute,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
    ) {

        this.formErrors = {

       
            NumeroDocumento: {},
            NombreLider: {},
            PrimerNombre: {},
            SegundoNombre: {},
            PrimerApellido: {},
            SegundoApellido: {},
            FechaNacimiento: {},
            Genero: {},
            Provincia: {},
            Canton: {},
            Parroquia: {},
            DireccionDomicilio: {},
            NumeroCelular: {},
            TelefonoDomicilio: {},
            CorreoElectronico: {},
            TallaPrendaSuperior: {},
            TallaPrendaInferior: {},
            TallaCalzado: {}
        };

    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpageadmin']);
    }

    validarcelular(){ 
        debugger               
        let encvio = new E_Cliente();
        encvio.Celular1 =this.form.value.NumeroCelular
        encvio.Nit =this.form.value.NumeroDocumento
        this.ClienteService.ListxCelNoPropio(encvio).subscribe(x =>{
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
        encvio.Nit =this.form.value.NumeroDocumento
        this.ClienteService.ListxEmaillNoPropio(encvio).subscribe(x =>{
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
            data: { TipoMensaje: "Error", Titulo: "Actualizacion Empresarias", Mensaje: "Se guardo la Actualizacion con exitosamente!." }
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
        chainSubcriptions.push(this.ParameterService.listarRegional(this.SessionUser))
        chainSubcriptions.push(this.ParameterService.listarVendedor(this.SessionUser))
        chainSubcriptions.push(this.ParameterService.listarLider(this.SessionUser))
        chainSubcriptions.push(this.ParameterService.listarTipoDocumento(this.SessionUser))
      //  chainSubcriptions.push(this.ParameterService.listarProvincia(this.SessionUser))
        this.CommunicationService.showLoader.next(true)
        forkJoin(chainSubcriptions).subscribe((response: [Array<E_Regional>, Array<E_Vendedor>, Array<E_Lider>, Array<E_TipoDocumento>]) => {
            this.SetRegional(response[0]);
            this.setVendedores(response[1]);
            this.SetLider(response[2]);
            this.SetTipoDoc(response[3]);
      //      this.setProvincia(response[4]);
            this.CommunicationService.showLoader.next(false)
        })
       
   
        //
        //const toSelect = this.ListRegional.find(c => c.IdRegional == this.ListRegional[0].toString());
        //this.form.get('Regional').setValue("Coordinador 4");

        this.form = this.formBuilder.group({
            NumeroDocumento: [undefined, [Validators.required]],
            NombreLider: [undefined, [Validators.required]],
            PrimerNombre: [undefined, [Validators.required]],
            SegundoNombre: [undefined],
            PrimerApellido: [undefined, [Validators.required]],
            SegundoApellido: [undefined, [Validators.required]],
            FechaNacimiento: [undefined, [Validators.required]],
            Genero: [undefined, [Validators.required]],
         //   Provincia: [null, [Validators.required]],
         //   Canton: [undefined, [Validators.required]],
         //   Parroquia: [undefined, [Validators.required]],
         //   DireccionDomicilio: [undefined, [Validators.required]],        
            NumeroCelular: [undefined, [Validators.required]],
            TelefonoDomicilio: [undefined, [Validators.required]],
            CorreoElectronico: ['', [Validators.required, Validators.email]],
            TallaPrendaSuperior: [undefined, [Validators.required]],
            TallaPrendaInferior: [undefined, [Validators.required]],
            TallaCalzado: [undefined, [Validators.required]]

        });
        

        this.NumeroDocumento= this.data.Nit;
        this.ProvinciaCliente = this.data.Departamento;
        this.CiudadCliente = this.data.Ciudad;
        this.ValidateDocument()
        this.ParameterService.listarProvincia()
        .subscribe((x: Array<E_Provincia>) => {
            this.ListProvincia = x;
            const toSelect = this.ListProvincia.find(c => c.NombreEstado == this.ProvinciaCliente);
            this.form.get('Provincia').setValue(toSelect );
            this.ProvinciaSeleccionado = toSelect.CodEstado;
    
            this.ParameterService.listarCanton(toSelect)
                .subscribe((x: Array<E_Canton>) => {
                    this.ListCanton = x;
                    const toSelectC = this.ListCanton.find(c => c.NombreCiudad == this.CiudadCliente);
                    this.form.get('Canton').setValue(toSelectC );
                    this.CantonSeleccionado = toSelectC.CodCiudad;
                    var objCanton: E_Canton = new E_Canton();
                    objCanton.CodCiudad = toSelectC.CodCiudad.substring(3);
                    objCanton.CodEstado = this.ProvinciaSeleccionado.substring(1);
        
                    this.ParameterService.listarParroquia(objCanton)
                        .subscribe((x: Array<E_Parroquia>) => {
                            this.ListParroquia = x;
                        });
                });
         
        }) ;
            
        
    }

  
    private setProvincia(x: E_Provincia[]) {
        this.ListProvincia = x;
        
 //       this.form.get('Provincia').setValue(toSelect);
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
            objProvincia.CodEstado = y.value.CodEstado;
            this.ProvinciaSeleccionado = y.value.CodEstado;
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
            objCanton.CodCiudad = y.value.CodCiudad.substring(3);
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

           

         
            if (this.NumeroDocumento!= '' && this.NumeroDocumento!= undefined) {
                //var okDoc = this.pc_verificar(this.form.value.NumeroDocumento)
                //console.log('okDoc:' + okDoc)
                if (true) {

                    var objClienteResquest: E_Cliente = new E_Cliente()
                    objClienteResquest.Nit = this.NumeroDocumento;

                   
                 
                    //..............................................................................



                    this.ClienteService.ConsultaExisteEmpresariaNombre(objClienteResquest).subscribe((x: E_Cliente) => {

                        if (x.Nit != undefined) {
                          
                           
                                    this.form.value.NombreEmpresariaCompleto = x.NombreEmpresariaCompleto;
                                    this.NombreLider = x.NombreLider;
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
                                    this.Whatsapp = x.Whatsapp;
                                    this.DireccionDomicilio=x.DireccionPedidos;
                                    this.TallaPrendaSuperiorSeleccionado =x.TallaPrendaSuperior;
                                    this.TallaPrendaInferiorSeleccionado = x.TallaPrendaInferior;
                                    this.TallaCalzadoSeleccionado = x.TallaCalzado;
                                    this.EstadoCliente = x.IdEstadosCliente;
                              //      this.form.value.Provincia=  x.CodDepartamento;
                              //      this.ProvinciaCliente = x.CodDepartamento;
                               //     this.SelectedProvincia(x.CodDepartamento);
                               //     this.SelectedCanton(x.CodCiudad);
                                    //this.ProvinciaSeleccionado = x.Ciudad.substr(1,2);
                                  
                                    this.CantonSeleccionado = x.Ciudad

 

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
            objCliente.EnProduccion= false;
            objCliente.Usuario = this.SessionUser.NombreUsuario;
            objCliente.Nit = this.form.value.NumeroDocumento;
            objCliente.Nombre1 = this.form.value.PrimerNombre.toUpperCase();
            objCliente.Apellido1 = this.form.value.PrimerApellido.toUpperCase();

            objCliente.Sexo = this.form.value.Genero;
            objCliente.FechaNacimiento = this.form.value.FechaNacimiento;

            objCliente.CodDepartamento = this.addresses[0].Provincia;
            objCliente.CodCiudad = this.addresses[0].Ciudad;
            objCliente.CodigoParroquia = this.addresses[0].Parroquia;
            objCliente.NombreParroquia = this.addresses[0].Parroquia;//TODO MRG: poner nombre
            objCliente.DireccionPedidos = this.addresses[0].Direccion+' '+ this.addresses[0].PuntoReferencia;
            objCliente.DireccionResidencia = this.addresses[0].Direccion+' '+ this.addresses[0].PuntoReferencia;
            objCliente.ComoLlegar = this.addresses[0].PuntoReferencia;
            objCliente.OperadorCelular = this.form.value.OperadorCelular;
            objCliente.Telefono1 = this.form.value.TelefonoDomicilio;
            objCliente.Telefono2 = this.form.value.NumeroCelular;
            objCliente.Celular1 = this.form.value.NumeroCelular;

            objCliente.Activo = 1;
            objCliente.CodPais = "593";//objVendedorInfo.CodPais;

            objCliente.Email = this.form.value.CorreoElectronico;

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

            objCliente.Whatsapp = this.form.value.OperadorCelular;
            objCliente.TallaPrendaSuperior = this.form.value.TallaPrendaSuperior;
            objCliente.TallaPrendaInferior = this.form.value.TallaPrendaInferior;
            objCliente.TallaCalzado = this.form.value.TallaCalzado;
            objCliente.IdEstadosCliente = this.EstadoCliente;
            if (this.SessionUser.IdLider != null) {
                objCliente.Lider = this.SessionUser.IdLider;
            }

            //Validar Refererido.
            var okReferido: boolean = true;

   

            //=========================================================================================


         
                this.ActualizaEmpresaria(objCliente);

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





    private ActualizaEmpresaria(objCliente: E_Cliente) {
        try {
            this.CommunicationService.showLoader.next(true);
            var objClienteResponse: E_Cliente = new E_Cliente();
            this.ClienteService.ActualizarEmpresariaL(objCliente)
                .subscribe((x: E_Cliente) => {
                    objClienteResponse = x;

                  
                    if (x.Error == undefined) {
                        //Mensaje de OK
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
                            data: { TipoMensaje: "Ok", Titulo: "Actualizacion de  Empresaria", Mensaje: "Se registro la Actualizacion de empresaria exitosamente!" }
                        });
                    });


                    }
                    else {
                        //---------------------------------------------------------------------------------------------------------------
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
        this.bottomSheetRef.dismiss();

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


            Lider: "",
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
            OperadorCelular: "CLARO",
            NumeroCelular: "",
            Whatsapp: "",
            TelefonoDomicilio: "",
            OtroTelefono: "",
            CorreoElectronico: "",
            TallaPrendaSuperior: -1,
            TallaPrendaInferior: -1,
            TallaCalzado: -1,
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
