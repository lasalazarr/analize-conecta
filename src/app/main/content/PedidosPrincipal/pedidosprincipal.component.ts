import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from 'app/ApiServices/UserService';
import { E_Catalogo } from 'app/Models/E_Catalogo';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, MatTable } from '@angular/material';
import { E_Cliente } from 'app/Models/E_Cliente';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
import { DatosEnvioComponent, ReturnsData } from '../DatosEnvio/datosenvio.component';
import { DetalleArticuloComponent } from '../DetalleArticulo/detallearticulo.component';
import { DetallePedidoComponent } from '../DetallePedido/detallepedido.component';
import { ResumenPedidoComponent } from '../ResumenPedido/resumenpedido.component';

import { MatBottomSheet } from '@angular/material';

import { Observable, timer } from 'rxjs';
import { map, startWith, debounce } from 'rxjs/operators';
import { E_PLU } from 'app/Models/E_PLU';
import { E_Bodegas } from 'app/Models/E_Bodegas';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import _ from 'lodash';
import moment from 'moment';
import { DetallePedidoService } from 'app/ApiServices/DetallePedidoService';
import { ActivatedRoute } from '@angular/router';
import { ModalPopUpBodegaComponent } from '../ModalPopUpBodega/modalpopupbodega.component';


export interface State {
    flag: string;
    name: string;
    population: string;
}

@Component({
    selector: 'pedidosprincipal',
    templateUrl: 'pedidosprincipal.component.html',
    styleUrls: ['pedidosprincipal.component.scss']

})
export class PedidosPrincipalComponent implements OnInit {
    lodash = _
    productCtrl = new FormControl();
    showProduct = false
    filteredProduct: Observable<E_PLU[]>;
    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirtyFormGroup: FormGroup;
    InitiaLoadingCounter: number = 0;
    public SessionUser: E_SessionUser = new E_SessionUser()
    public CatalogoSeleccionado: string = "";
    public Privilegio: string = "";
    public BodegaSeleccionado: string = "";
    public NombreBodega: string = "";
    public DatosEnvioSeleccionado: string = "";
    public ClienteFinal: string = "";
    public PuntoEnvio: string = "";
    public CodigoParroquia: string = "";
    public CodigoRapidoSeleccionado: string = "";
    public TipoEnvioSeleccionado: string = "";
    public CodCiudadDespacho: string = "";
    public NombreCiudadEmpresaria: string = "QUITO";
    public NombreProvinciaEmpresaria: string = "PICHINCHA";
    NumeroDocumento: string;
    public DireccionEnvio: string = "";
    public ListCatalogo: Array<E_Catalogo> = new Array<E_Catalogo>();
    //*public ListBodega: Array<E_Catalogo> = new Array<E_Catalogo>();
    formErrors: any;
    CatalogoDisabled: boolean = false;
    BodegaDisabled: boolean = false;
    NombreDisabled: boolean = false;
    Paso1Ok: boolean = false;
    Paso2Ok: boolean = false;
    FechaIni: Date;
    FechaFin: Date;
    CarpetaImagenes: string
    Latitud: number;
    Longitud: number;
    public NombreEmpresariaCompleto: string;
    public SessionEmpresaria: E_SessionEmpresaria = new E_SessionEmpresaria()

    public CampanaSeleccionado: string = "";

    public ValorFleteCobrar: number = 0;
    /*public ListBodega: Array<Object> = [
        { Codigo: "51", Nombre: 'BODEGA 51' },
        { Codigo: "PKG", Nombre: 'BODEGA PICKING' },
    ];*/

    public ListBodega: Array<E_Bodegas> = new Array<E_Bodegas>()
    CodigoRapido = new FormControl();
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;
    ListClientes: E_Cliente[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('tableEmpresaria') tableEmpresaria: MatTable<E_Cliente>;
    displayedColumns = ['imagenEmpresaria', 'NombreCompleto'];
    dataSource: MatTableDataSource<E_Cliente>;
    showEmpresaria: boolean;
    SelectedEmpresaria: E_Cliente;
    showEmpresarias: boolean;
    showBodega: boolean;
    ListProducts: E_PLU[];
    numberOfItems = this.detallePedidoService.PedidoNumberItems.asObservable()
    firstArticle: string;
    initialReturn: boolean;
    IdDireccionXUsuario: number;
    filteredItem: boolean;
    constructor(private _formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private UserService: UserService,
        private ExceptionErrorService: ExceptionErrorService,
        private ClienteService: ClienteService,
        private bottomSheet: MatBottomSheet,
        public dialog: MatDialog,
        private communicationService: CommunicationService,
        private detallePedidoService: DetallePedidoService,
        private activatedroute: ActivatedRoute) {
        let snapshot = this.activatedroute.snapshot.paramMap.get("envi")
        let objectRouter
        if (!_.isNil(snapshot)) {
            objectRouter = JSON.parse(snapshot)
        }
        this.showProduct = !_.isNil(objectRouter) && !_.isNil(objectRouter.OnlyItem) ? Boolean(objectRouter.OnlyItem) : false;
        this.initialReturn = !_.isNil(objectRouter) && !_.isNil(objectRouter.OnlyItem) ? Boolean(objectRouter.OnlyItem) : false;
        this.filteredItem = !_.isNil(objectRouter) && !_.isNil(objectRouter.item) ? objectRouter.item : null;
    
        // this.filterProduct = !_.isNil(snapshot) && !_.isNil(snapshot) ?
        this.formErrors = {
            Campana: {},
            Catalogo: {},
            NumeroDocumento: {},
            Bodega: {},
        };

        sessionStorage.removeItem("CurrentEmpresaria")
        // this.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow();
        // this.carpetaImagenes =  this.SessionEmpresaria.CarpetaImagenes
    }

    //MRG: POR AQUI SIEMPRE ENTRA SIN NECESIDAD DE ADICIONAR ARTICULO TBN CAMBIAR CODIGO DE DETALLE ARTICULO MISMO METODO openBottomSheet().
    openBottomSheet(): void {
    
        //alert('openbottonsheet:'+this.ValorFleteCobrar)
        //this.bottomSheet.open(DetallePedidoComponent);

        this.bottomSheet.open(DetallePedidoComponent, {
            panelClass: 'bottomStyleSheet', //MRG: poner este para el style del popup.

            data: {
                TipoMensaje: "Error", Titulo: "Detalle Pedido", Mensaje: "Detalle del Pedido.", TipoEnvio: this.TipoEnvioSeleccionado, CodCiudadDespacho: this.CodCiudadDespacho, ValorFleteCobrar: this.ValorFleteCobrar,
                ClienteFinal: this.ClienteFinal, Bodega: this.BodegaSeleccionado, PuntoEnvio: this.PuntoEnvio, showButtonSend: !_.isNil(this.DatosEnvioSeleccionado) && !_.isEmpty(this.DatosEnvioSeleccionado),
                Latitud: this.Latitud, Longitud: this.Longitud, IdDireccionXUsuario: this.IdDireccionXUsuario
            }
        });



    }


    ngOnInit() {



        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required],
            Catalogo: [undefined, [Validators.required]],
            NumeroDocumento: [undefined, [Validators.required]],
            Bodega: [undefined, [Validators.required]],
            DatosEnvio: [undefined, [Validators.required]],
            Campana: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({

        });
        this.thirtyFormGroup = this._formBuilder.group({

        });

        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        this.Privilegio = this.SessionUser.Privilegio;

        this.ParameterService.listarCatalogo(this.SessionUser)
            .subscribe((x: Array<E_Catalogo>) => {
                this.ListCatalogo = x
                if (x[0].Error != undefined) {

                    this.CatalogoDisabled = true;

                    //TODO:MRG: Produce un error  at new ErrorLogExcepcion pero si guarda en la BD. Corregir
                    //TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:2:14)
                    //    throw new ErrorLogExcepcion("PedidosPrincipalComponent", "ngOnInit()+listarCatalogo()", x[0].Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)

                    //---------------------------------------------------------------------------------------------------------------
                }
            })

        this.filteredOptions = this.CodigoRapido.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );

        if (this.SessionUser.IdGrupo == "50" || this.SessionUser.IdGrupo == "80" || this.SessionUser.IdGrupo == "99"
        || this.SessionUser.IdGrupo == "59") {
            this.NumeroDocumento = this.SessionUser.Cedula;
            this.ValidateDocument2();
        }
        this.FechaIni = this.SessionUser.FechaIniCampana;
        this.FechaFin = this.SessionUser.FechaFinCampana;
        this.CampanaSeleccionado = "CAMPAÑA: " + this.SessionUser.Campana;
        this.CatalogoSeleccionado = "CATALOGO:" + this.SessionUser.Catalogo + " (Desde: ";
        this.BodegaSeleccionado = this.SessionEmpresaria.BodegaEmpresaria;
        //  this.GetProductsCatalog();
        this.GetEmployers()
        this.communicationService.generateCloseSearchProducts.subscribe(x => {
            this.showProduct = false
            this.openDatosEnvio()

        })

    }



    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    SelectedCatalogo() {

    }

    SelectedBodega() {
        this.openBodega()
    }



    ValidateDocument2() {
        try {
            this.communicationService.showLoader.next(true);
            //Se borra acumulado de pedido.
            sessionStorage.removeItem("CurrentDetallePedido");

            this.NombreEmpresariaCompleto = "";
            this.NombreDisabled = false;

            //var okDoc = this.pc_verificar(this.form.value.NumeroDocumento)
            //console.log('okDoc:' + okDoc)
            if (true) {

                var objClienteResquest: E_Cliente = new E_Cliente()
                objClienteResquest.Nit = this.NumeroDocumento;

                //..............................................................................
                //Validacion para que solo se puedan ingresar empresarias de una zona o lider.
                var UsuarioInicioSesion: E_SessionUser = new E_SessionUser();
                UsuarioInicioSesion = this.UserService.GetCurrentCurrentUserNow();


                objClienteResquest.Vendedor = UsuarioInicioSesion.IdVendedor;



                //..............................................................................

                this.ClienteService.ValidaExisteEmpresariaNombre(objClienteResquest).subscribe((x: E_SessionEmpresaria) => {

                    this.communicationService.showLoader.next(false)

                    if (x.Error == undefined) {
                        this.NombreDisabled = true;
                        this.Paso1Ok = true;
                        this.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow()
                        this.NombreEmpresariaCompleto = this.SessionEmpresaria.NombreEmpresariaCompleto;
                        this.ListBodega.push(this.SessionEmpresaria.Bodegas);
                        this.NombreCiudadEmpresaria = this.SessionEmpresaria.CodCiudadCliente;
                        this.CodigoParroquia = x.CodigoParroquia;
                        this.BodegaSeleccionado = this.SessionEmpresaria.Bodegas.Bodega;
                        this.NombreBodega =   this.SessionEmpresaria.Bodegas.Nombre;

                    }
                    else {
                        this.NombreDisabled = false;
                        this.Paso1Ok = false;
                        this.DatosEnvioSeleccionado = "";
                        this.ClienteFinal = "";
                        this.TipoEnvioSeleccionado = "";

                        this.firstFormGroup = this._formBuilder.group({
                            firstCtrl: ['', Validators.required],
                            //  Catalogo: [undefined, [Validators.required]],
                            NumeroDocumento: [undefined, [Validators.required]],
                            Bodega: [undefined, [Validators.required]],
                            DatosEnvio: [undefined, [Validators.required]]
                            //  Campana: ['', Validators.required]
                        });

                        throw new ErrorLogExcepcion("PedidosPrincipalComponent", "ValidateDocument()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)
                        //---------------------------------------------------------------------------------------------------------------

                    }

                })

            }


        }
        catch (error) {
            this.communicationService.showLoader.next(false)
            throw new ErrorLogExcepcion("PedidosPrincipalComponent", "ValidateDocument()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService)

            //---------------------------------------------------------------------------------------------------------------
        }
    }
    //validar documento con formato de Ecuador correcto.
    ValidateDocument(input = null) {
        try {
            this.communicationService.showLoader.next(true);
            //Se borra acumulado de pedido.
            sessionStorage.removeItem("CurrentDetallePedido");

            this.NombreEmpresariaCompleto = "";
            this.NombreDisabled = false;
            let valueInput = !_.isNil(input) && !_.isEmpty(input) ? input : this.firstFormGroup.value.NumeroDocumento
            if (
                !_.isNil(valueInput)
                && !_.isEmpty(valueInput)
            ) {
                //var okDoc = this.pc_verificar(this.form.value.NumeroDocumento)
                //console.log('okDoc:' + okDoc)
                if (true) {

                    var objClienteResquest: E_Cliente = new E_Cliente()
                    objClienteResquest.Nit = valueInput;

                    //..............................................................................
                    //Validacion para que solo se puedan ingresar empresarias de una zona o lider.
                    var UsuarioInicioSesion: E_SessionUser = new E_SessionUser();
                    UsuarioInicioSesion = this.UserService.GetCurrentCurrentUserNow();

                    //60 = lider
                    if (UsuarioInicioSesion.IdGrupo == "60") {
                        objClienteResquest.Lider = UsuarioInicioSesion.IdLider;
                        objClienteResquest.Vendedor = "";
                    }
                    else if (UsuarioInicioSesion.IdGrupo == "52") {
                        objClienteResquest.Lider = "";
                        objClienteResquest.Vendedor = UsuarioInicioSesion.IdVendedor;
                    }
                    else {
                        objClienteResquest.Vendedor = UsuarioInicioSesion.IdVendedor;
                    }

                    //..............................................................................



                    this.ClienteService.ValidaExisteEmpresariaNombre(objClienteResquest).subscribe((x: E_SessionEmpresaria) => {

                        this.communicationService.showLoader.next(false)

                        if (x.Error == undefined) {
                            this.NombreDisabled = true;
                            this.Paso1Ok = true;
                            this.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow()
                            this.NombreEmpresariaCompleto = this.SessionEmpresaria.NombreEmpresariaCompleto;
                            this.ListBodega.push(this.SessionEmpresaria.Bodegas);
                            this.NombreCiudadEmpresaria = this.SessionEmpresaria.CodCiudadCliente;
                            this.CodigoParroquia = x.CodigoParroquia;
                            this.BodegaSeleccionado = this.SessionEmpresaria.Bodegas.Bodega;
                            this.NombreBodega = this.SessionEmpresaria.Bodegas.Nombre;



                        }
                        else {
                            this.NombreDisabled = false;
                            this.Paso1Ok = false;
                            this.DatosEnvioSeleccionado = "";
                            this.ClienteFinal = "";
                            this.TipoEnvioSeleccionado = "";

                            this.firstFormGroup = this._formBuilder.group({
                                firstCtrl: ['', Validators.required],
                                // Catalogo: [undefined, [Validators.required]],
                                NumeroDocumento: [undefined, [Validators.required]],
                                Bodega: [undefined, [Validators.required]],
                                DatosEnvio: [undefined, [Validators.required]]
                                // Campana: ['', Validators.required]
                            });

                            throw new ErrorLogExcepcion("PedidosPrincipalComponent", "ValidateDocument()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)
                            //---------------------------------------------------------------------------------------------------------------

                        }

                    })

                }
            }

        }
        catch (error) {
            this.hideLoader()
            throw new ErrorLogExcepcion("PedidosPrincipalComponent", "ValidateDocument()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService)

            //---------------------------------------------------------------------------------------------------------------
        }
    }

    BodegaPedido(): void {
        if  (this.Privilegio== 'True') 
        {

       
        const dialogRef = this.dialog.open(ModalPopUpBodegaComponent, {
            //width: '550px',
            panelClass: 'knowledgebase-article-dialog',
            data: {Bodega: this.BodegaSeleccionado}

        });       

      
        
        dialogRef.afterClosed().subscribe((result) => {

            this.BodegaSeleccionado = result.Bodega;
            this.NombreBodega = result.NombreBodega;
         

        });
    }
      }

    openDatosEnvio(): void {
        this.DatosEnvioSeleccionado = "";
        this.ClienteFinal = "";
        this.TipoEnvioSeleccionado = "";
        this.CodCiudadDespacho = "";
        let documentEmpresaria = !_.isNil(this.NumeroDocumento) ? this.NumeroDocumento : this.firstFormGroup.value.NumeroDocumento
        //Si se encuentra la empresaria se abre la ventana, sino no se puede abrir.
        if (!_.isNil(documentEmpresaria) && !_.isEmpty(documentEmpresaria)) {




            const dialogRef = this.bottomSheet.open(DatosEnvioComponent,
                {
                    panelClass: 'bottomStyleSheet', //MRG: poner este para el style del popup.
                    data: {
                        Nit: documentEmpresaria,
                        Zona: this.SessionUser.IdZona,
                        EmpresariaLider: this.SessionEmpresaria.Empresaria_Lider,
                        TipoMensaje: "Error",
                        Titulo: "Datos Envío",
                        Mensaje: "Seleccione el metodo de envío.",
                        ListBodega: this.ListBodega,
                        Ciudad: this.NombreCiudadEmpresaria,
                        Departamento: this.NombreProvinciaEmpresaria,
                        Parroquia: this.CodigoParroquia
                    }
                }
            )

            dialogRef.afterDismissed().subscribe((result: ReturnsData) => {

                this.DatosEnvioSeleccionado = result.DireccionEnvio;
                this.TipoEnvioSeleccionado = result.IdTipoEnvio;
                this.CodCiudadDespacho = result.CodCiudadDespacho;
                this.ValorFleteCobrar = result.ValorFleteCobrar;
             //   this.BodegaSeleccionado = result.Bodega;
                this.ClienteFinal = result.ClienteF;
                this.PuntoEnvio = result.PuntoEnvio;
                this.Latitud = result.Latitud;
                this.Longitud = result.Longitud
                this.IdDireccionXUsuario = result.IdDireccionXUsuario
            });

        }
    }

    openAdicionarArticulo(codigorapidoInput): void {
        this.initialReturn = false
        this.communicationService.showLoader.next(true)
        const validateInput = (!_.isNil(codigorapidoInput) && !_.isEmpty(codigorapidoInput.toString()));
        if ((!_.isNil(this.CodigoRapido.value) && !_.isEmpty(this.CodigoRapido.value.toString()))
            || validateInput) {
            this.Paso2Ok = true;

            var objPLU: E_PLU = new E_PLU()
            objPLU.CodigoRapido = validateInput ? codigorapidoInput : this.CodigoRapido.value;
            objPLU.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow();
            objPLU.SessionEmpresaria.IdGrupo = this.SessionUser.IdGrupo;
            objPLU.SessionEmpresaria.Bodegas.Bodega = this.BodegaSeleccionado;

            this.ParameterService.ListarxCodigoRapido(objPLU)
                .subscribe((x: E_PLU) => {
                    this.communicationService.showLoader.next(false)
                    if (x.Error == undefined) {
                        //Mensaje de OK
                        //console.log(x)
                        var strDisponible = "NO";
                        if (x.Disponible == true) {
                            strDisponible = "SI";
                        }
                        var NombreProductoP = x.NombreProducto + ", " + x.NombreColor + ", " + x.NombreTalla;

                        //var NombreImg = "blusanivi" + rndImg + ".PNG";

                        var NombreImg = x.Imagen;

                        if (NombreImg == undefined || NombreImg == "" || NombreImg == null) {
                            //NombreImg = "noimagen.png"
                        }


                        const dialogRef = this.bottomSheet.open(DetalleArticuloComponent, {
                            panelClass: 'bottomStyleSheet', //MRG: poner este para el style del popup.
                            data: {



                                CodigoRapido: objPLU.CodigoRapido, NombreProductoCompleto: NombreProductoP,
                                NombreProd: x.NombreProducto, Color: x.NombreColor, Talla: x.NombreTalla, ValorUnitario: x.PrecioTotalConIVA,
                                NombreImagen: NombreImg, PLU: x.PLU, TipoMensaje: "Error", Titulo: "Detalle Articulo",
                                Mensaje: "Seleccione los detalles del articulo.", PorcentajeDescuento: x.PorcentajeDescuento,
                                PrecioPuntos: x.PrecioPuntos, Disponible: strDisponible, PrecioEmpresaria: x.PrecioEmpresaria,
                                TipoEnvio: this.TipoEnvioSeleccionado, CodCiudadDespacho: this.CodCiudadDespacho, ClienteFinal: this.ClienteFinal,
                                Bodega: this.BodegaSeleccionado, PuntoEnvio: this.PuntoEnvio,
                                PrecioCatalogoSinIVA: x.PrecioCatalogoSinIVA, PrecioEmpresariaSinIVA: x.PrecioEmpresariaSinIVA,
                                IVAPrecioCatalogo: x.IVAPrecioCatalogo, IVAPrecioEmpresaria: x.IVAPrecioEmpresaria, PorcentajeIVA: x.PorcentajeIVA,
                                ExcentoIVA: x.ExcentoIVA, PuntosGanados: x.PuntosGanados, ValorFleteCobrar: this.ValorFleteCobrar
                                , DatosEnvioSeleccionado: this.DatosEnvioSeleccionado, Inventario: x.Cantidad
                            }
                        });

                        dialogRef.afterDismissed().subscribe((x) => {
                            if (!_.isNil(x) && !_.isNil(x.diligenciarEnvio) && x.diligenciarEnvio) {
                                this.showProduct = false
                                this.openDatosEnvio()
                            }
                            //this.DatosEnvioSeleccionado = result; 
                            this.CodigoRapidoSeleccionado = "";
                            this.CodigoRapido.setValue("");
                        });


                    }
                    else {

                        //throw new ErrorLogExcepcion("DetalleArticuloComponent", "constructor()", "No se encontro articulo. Codigo Rapido: " + data.CodigoRapido, this.SessionUser.Cedula, this.ExceptionErrorService)
                        //---------------------------------------------------------------------------------------------------------------
                    }

                    //Para que ponga por defecto el que trae sin poderlo modificar.
                    //this.ProvinciaSeleccionado = x[0].CodEstado;
                },
                    (error) => this.communicationService.showLoader.next(false)
                )





        }
        else {
            this.communicationService.showLoader.next(false)

            //throw new ErrorLogExcepcion("DetalleArticuloComponent", "constructor()", "No se encontro articulo. Codigo Rapido: " + data.CodigoRapido, this.SessionUser.Cedula, this.ExceptionErrorService)
            //---------------------------------------------------------------------------
        }
        this.Privilegio = 'False';
    }

    openVerDetallePedido(): void {
        const dialogRef = this.bottomSheet.open(DetallePedidoComponent, {
            panelClass: 'bottomStyleSheet', //MRG: poner este para el style del popup.
            data: { TipoMensaje: "Error", Titulo: "Detalle Pedido", Mensaje: "Detalle del Pedido.", TipoEnvio: this.TipoEnvioSeleccionado, CodCiudadDespacho: this.CodCiudadDespacho }
        });

        dialogRef.afterDismissed().subscribe(() => {

            //this.DatosEnvioSeleccionado = result; 
        });

    }

    openVerResumenPedido(): void {
        const dialogRef = this.bottomSheet.open(ResumenPedidoComponent, {
            panelClass: 'bottomStyleSheet', //MRG: poner este para el style del popup.
            data: { TipoMensaje: "Error", Titulo: "Resumen Pedido", Mensaje: "Resumen del Pedido." }
        });

        dialogRef.afterDismissed().subscribe(() => {

            //this.DatosEnvioSeleccionado = result; 
        });

    }


    changeIdCorto(): void {
        alert('sdsd')
        this.Paso2Ok = true;
    }

    buscarDocumento(): void {
        true;
    }



    openDetalleCliente(row: E_Cliente): void {

        this.SelectedEmpresaria = row
        this.showEmpresaria = false
        this.NumeroDocumento = row.Nit
        this.ValidateDocument(row.Nit)
    }
    closeSelectEmpresaria() {
        this.NumeroDocumento = null
        this.SelectedEmpresaria = null
        this.showEmpresaria = false
    }

    showMenuEmpresarias() {
        if (this.SessionUser.IdGrupo != "50" && this.SessionUser.IdGrupo != "80"
        && this.SessionUser.IdGrupo != "59") {
            this.showEmpresaria = !this.showEmpresarias
        }
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    GetEmployers() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        var objCliente: E_Cliente = new E_Cliente()
        objCliente.Vendedor = this.SessionUser.IdVendedor;
        objCliente.Lider = this.SessionUser.IdLider;
        objCliente.CodEstado = "'%%'";


        if (this.SessionUser.IdGrupo == "52") {
            this.communicationService.showLoader.next(true);
            this.ClienteService.ListEmpresariasxGerenteSimpleP(objCliente)
                .subscribe((x: Array<E_Cliente>) => {
                    this.ListClientes = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientes);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.hideLoader()

                })
        }
        else if (this.SessionUser.IdGrupo == "60") {
            this.communicationService.showLoader.next(true);
            this.ClienteService.ListEmpresariasxLiderLessInfo(objCliente)
                .subscribe((x: Array<E_Cliente>) => {

                    this.ListClientes = x


                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientes);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.hideLoader()

                })
        }
    }

    private GetProductsCatalog() {
        const plu = new E_PLU();
        plu.Campana = this.SessionUser.Campana;
        this.communicationService.showLoader.next(true)
        // const List = localStorage.getItem("TemporalListProducts")
        // const sync = localStorage.getItem("TemporalListProductsSync")
        // var x = moment()
        // var y = moment(JSON.parse(sync))

        //  if (_.isNil(List) || _.isNil(sync) || moment() > moment(JSON.parse(sync))) {
        this.ParameterService.ListCatalogoActual(plu).subscribe(x => {
            this.ListProducts = x
            //    localStorage.setItem("TemporalListProducts", JSON.stringify(x))
            //    localStorage.setItem("TemporalListProductsSync", JSON.stringify(moment().add(5, 'minutes')))
            this.loadEventQuickSearch()
            this.hideLoader()
        });
        //  }
        // else {
        //     this.ListProducts = JSON.parse(List)
        //     this.loadEventQuickSearch()
        //     this.hideLoader()
        // }
    }
    openBodega() {
        this.showBodega = !this.showBodega
    }

    loadEventQuickSearch() {
        this.filteredProduct = this.productCtrl.valueChanges
            .pipe(
                debounce(() => timer(500)),
                startWith(''),
                map(state => state ? this._filterStates(state) : this.ListProducts.slice())// )
            );
    }
    hideLoader() {
        this.InitiaLoadingCounter++
        if (this.InitiaLoadingCounter >= 1) {
            this.communicationService.showLoader.next(false)
        }
    }
    private _filterStates(value: string): E_PLU[] {
        const filterValue = value.toLowerCase();

        return this.ListProducts.filter(state => state.NombreProducto.toLowerCase().includes(filterValue)
            || state.PLU.toString().includes(filterValue)
            || state.NombreColor.toString().includes(filterValue));
    }
    openProductos() {
        if (!_.isNil(this.NumeroDocumento) && !_.isEmpty(this.NumeroDocumento)) {
            this.showProduct = true
        }
    }
    closeSelectArticulo() {

        this.showProduct = false


    }
}