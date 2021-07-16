import { Component, Inject, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatTableDataSource, MatPaginator, MatSort, MatBottomSheet } from '@angular/material';
import { E_Cliente } from 'app/Models/E_Cliente';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { SelectionModel } from '@angular/cdk/collections';
import { DetallePedidoService } from 'app/ApiServices/DetallePedidoService';
import { E_PLU } from 'app/Models/E_PLU';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { E_PedidosDetalleCliente } from 'app/Models/E_PedidosDetalleCliente';
import { ImagenArticuloComponent } from '../ImagenArticulo/imagenarticulo.component';
import { RegistroPagoComponent } from '../RegistroPago/registropago.component';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription, timer } from 'rxjs';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { GridApi } from 'ag-grid-community';


export interface DialogData {
    Titulo: string;
    Mensaje: string;
    TipoMensaje: string;
    NumeroPedidoReservado: string;
    FechaCreacion: string;
    Nit: string;
    BotonPago: boolean;
}

@Component({
    selector: 'detallepedidos',
    templateUrl: 'detallepedidos.component.html',
    styleUrls: ['detallepedidos.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class DetallePedidosComponent implements OnInit {

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    // const ELEMENT_DATA_PLU = this.DetallePedidoService.GetCurrentDetallePedido();
    displayedColumns =
        ['select', 'CodigoRapido', 'NombreProducto', 'Cantidad', 'PrecioCatalogoTotalConIVA',
            'PrecioConIVA', 'PorcentajeDescuento', 'PrecioPuntos', 'star'];
    //['select', 'name', 'position', 'weight', 'symbol', 'position', 'weight', 'symbol', 'star'];
    //dataSource = ELEMENT_DATA;
    dataSource = this.DetallePedidoService.GetCurrentDetallePedido();


    CodigoRapido = new FormControl();

    //*displayedColumns = ['Documento', 'NombreCompleto', 'NombreCompleto1', 'NombreCompleto2', 'NombreCompleto3','Ciudad'];
    //*dataSource: MatTableDataSource<E_Cliente>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    public SessionUser: E_SessionUser = new E_SessionUser()
    public SessionEmpresaria: E_SessionEmpresaria = new E_SessionEmpresaria()
    public ListClientes: Array<E_Cliente> = new Array<E_Cliente>()
    public visiblepago:boolean = false;
    TextColor: any
    form: FormGroup;

    //public data: DialogData[];

    public Cantidad: number = 1;
    public PrecioCatalogoTotalConIVA: number = 0;
    public CantidadArticulos: number = 0;
    public TotalPagar: number = 0;

    public PrecioEmpresariaTotalConIVA: number = 0;
    public PrecioPuntosTotal: number = 0;
    public PuntosUsar: number = 0; //Lo que retorna del resumen
    public DescuentoPuntosUsar: number = 0;//Lo que retorna del resumen
    public TotalPagarUsar: number = 0;//Lo que retorna del resumen
    public PuntosGanadosUsar: number = 0;//Lo que retorna del resumen
    public ValorPagarPagoPuntosUsar: number = 0;//Lo que retorna del resumen
    public AplicarPuntosGanados: boolean = true;//Lo que retorna del resumen
    public PagarFletePuntos: boolean = false;//Lo que retorna del resumen
    public ValorMinimoParaPuntos: number = 0;
    public ValorFletePuntos: number = 0;

    public gridApi;
    public gridColumnApi;
    private aggFuncs;
    public columnDefs;
    public rowData: Array<E_PedidosDetalleCliente> = new Array<E_PedidosDetalleCliente>();

    constructor(private formBuilder: FormBuilder,
        private UserService: UserService,
        private ClienteService: ClienteService,
        private DetallePedidoService: DetallePedidoService,
        private bottomSheetRef: MatBottomSheetRef<DetallePedidosComponent>,
        public dialog: MatDialog,
        public dialog2: MatDialog,
        private ExceptionErrorService: ExceptionErrorService,
        private PedidoService: PedidoService,
        private communicationService: CommunicationService,
        private ParameterService: ParameterService,
        private bottomSheet: MatBottomSheet,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
    ) {
        this.columnDefs = [

            { headerName: 'Cod Rapido', width: 80, field: 'IdCodigoCorto' },
            { headerName: 'Nombre', field: 'Descripcion', sortable: true, filter: true },
            { headerName: 'Cant Reser', width: 80, field: 'Cantidad', enableValue: true },
            { headerName: 'Prec Uni', width: 80, field: 'ValorUnitario' },
            { headerName: 'Prec Emp', width: 80, field: 'Valor' },
            { headerName: 'Prec Cat', width: 80, field: 'TotalPrecioCatalogoCantidad'},
            { headerName: '% Descuento', width: 80, field: 'PorcentajeDescuento' },
            { headerName: '% Descuento Puntos', field: 'PorcentajeDescuentoPuntos' }

        ];



    }


    private suscription: Subscription;

    onGridReady(params) {

        //MRG: Las dos lineas siguientes realizan la consulta y actualizan el grid por que se queda cargando.

        //--------------------------------------

        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        var objPedidoRequest: E_PedidosCliente = new E_PedidosCliente()
        objPedidoRequest.Numero = this.data.NumeroPedidoReservado;

        this.PedidoService.ListDetallePedidoReservaGYG(objPedidoRequest).subscribe((DistData) => {
            var DistDataArray = Object.values(DistData);
            this.rowData = DistDataArray;
        })


        var objPedidoRequest: E_PedidosCliente = new E_PedidosCliente()
        objPedidoRequest.Numero = this.data.NumeroPedidoReservado;
        this.communicationService.showLoader.next(true);
        this.PedidoService.ListDetallePedidoReservaGYG(objPedidoRequest).subscribe((DistData) => {
            var DistDataArray = Object.values(DistData);
            this.rowData = DistDataArray;
            this.gridApi.setRowData(this.rowData);
            this.communicationService.showLoader.next(false);
        })



    }

    openLink(event: MouseEvent): void {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }

    accion(event){
        console.log(event)
    }
    ngOnInit() {

        /* if (this.data.TipoMensaje == 'Error') {
           this.TextColor = 'blue';
         }
         else {
           this.TextColor = 'green';
         }*/


    this.visiblepago =  this.data.BotonPago;


        this.form = this.formBuilder.group({
            Cantidad: [undefined, [Validators.required]],


        });


        //this.gridApi.setRowData(this.gridApi.rowData)
        //this.gridApi.setRowData(this.rowData);
    }

    //selection = new SelectionModel<PeriodicElement>(true, []);
    selection = new SelectionModel<E_PLU>(true, []);

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.forEach(row => this.selection.select(row));
    }

    onClose(): void {
        this.bottomSheetRef.dismiss();
    }

    openRegistroPago(): void {
        const dialogRef = this.dialog.open(RegistroPagoComponent, {
            //width: '550px',
            panelClass: 'knowledgebase-article-dialog',
            data: {
                Pedido: this.data.NumeroPedidoReservado, Cedula: ""}
        });


        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            //this.Mensaje = result; //AQUI RECIBE LOS DATOS DEL POPUP CERRADO. OJO PARA PEDIDO.
        });
    }

    openAdicionarArticulo(codigorapidoInput): void {
        this.communicationService.showLoader.next(true)
      
            var objPLU: E_PLU = new E_PLU()
            objPLU.CodigoRapido = codigorapidoInput.data.IdCodigoCorto;
   //  objPLU.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow();

            this.ParameterService.ListarPlu(objPLU)
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


                        const dialogRef = this.dialog.open(ImagenArticuloComponent, {
                            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
                            data: {
                                CodigoRapido: objPLU.CodigoRapido, NombreProductoCompleto: NombreProductoP,
                                NombreProd: x.NombreProducto, Color: x.NombreColor, Talla: x.NombreTalla, ValorUnitario: x.PrecioTotalConIVA,
                                NombreImagen: NombreImg, PLU: x.PLU, TipoMensaje: "Error", Titulo: "Detalle Articulo",
                                Mensaje: "Seleccione los detalles del articulo.",
                                PrecioPuntos: x.PrecioPuntos, Disponible: strDisponible, PrecioEmpresaria: x.PrecioEmpresaria,
                                PrecioCatalogoSinIVA: x.PrecioCatalogoSinIVA, PrecioEmpresariaSinIVA: x.PrecioEmpresariaSinIVA,
                                IVAPrecioCatalogo: x.IVAPrecioCatalogo, IVAPrecioEmpresaria: x.IVAPrecioEmpresaria, PorcentajeIVA: x.PorcentajeIVA,
                                ExcentoIVA: x.ExcentoIVA, PuntosGanados: x.PuntosGanados

                            }
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


}
