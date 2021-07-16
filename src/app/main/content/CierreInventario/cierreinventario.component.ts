import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";
import {
    MatPaginator, MatSort, MatTableDataSource, MatDialog,
} from "@angular/material";
import { E_SessionUser } from "app/Models/E_SessionUser";
import { UserService } from "../../../ApiServices/UserService";
import { E_PLU } from "app/Models/E_PLU";
import { E_SaldosB} from "app/Models/E_SaldosB";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material";
import { DetallePedidosComponent } from "../DetallePedidos/detallepedidos.component";
import { TableUtil } from "../MisPedidos/tableUtils";
import { CommunicationService } from "app/ApiServices/CommunicationService";
import { CxCService } from 'app/ApiServices/CxCService';
import * as XLSX from "xlsx";
import { ImagenArticuloComponent } from '../ImagenArticulo/imagenarticulo.component';
import { debounce, startWith, map } from "rxjs/operators";
import { timer, Observable } from "rxjs";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { E_Cliente } from "app/Models/E_Cliente";
import _ from 'lodash';
import { ClienteService } from "app/ApiServices/ClienteService";
import { ModalPopUpAnulaComponent } from '../ModalPopUpanula/modalpopupanula.component';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Parametros } from 'app/Models/E_Parametros';
import { ParametrosEnum } from 'app/Enums/Enumerations';
import { PopupcreditoComponent } from '../popupcredito/popupcredito.component';
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import moment from "moment";
import { E_CxC } from "app/Models/E_CxC";
import { AdminService } from "app/ApiServices/AdminService";
import { E_Bodegas } from "app/Models/E_Bodegas";
@Component({
    moduleId: module.id,
    selector: "cierreinventario",
    templateUrl: "cierreinventario.component.html",
    styleUrls: ["cierreinventario.component.scss"],
})
export class CierreInventarioComponent implements OnInit {
    displayedColumns: string[] = [
        "Plu",
        
        "Referencia",
    ];
    dataSource: MatTableDataSource<E_SaldosB>;
    columnsToDisplay: string[] = this.displayedColumns.slice();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(BaseChartDirective, {}) charts!: BaseChartDirective;

    public SessionUser: E_SessionUser = new E_SessionUser();
    public ListSaldo: Array<E_SaldosB> = new Array<E_SaldosB>();
    productCtrl = new FormControl();
    filteredProduct: Observable<E_SaldosB[]>;
    public ListBodega: Array<E_Bodegas> = new Array<E_Bodegas>()
    public objBodega : E_Bodegas = new E_Bodegas();
    public botonpago: boolean = false;
    public minimunMount: string;
    public creditBalance: number;
    public BodegaSeleccionada: string = "";
    form: FormGroup;
    anioactual: string;
    mesactual: string;
    formErrors: any;
    //CHART
    multi: any[];
    view: any[] = [360, 400];

    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = false;
    showLegend: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Estados';
    showYAxisLabel: boolean = true;
    yAxisLabel: string = '# Pedidos';
    animations: boolean = true;

    colorScheme = {
        domain: ['#5AA454', '#C7B42C', '#AAAAAA']
    };
    pedidos: any[];

    //CHART
    constructor(
        public dialog: MatDialog,
        
        private bottomSheet: MatBottomSheet,
        private communicationService: CommunicationService,
        private UserService: UserService,
        private AdminService: AdminService,
        private formBuilder: FormBuilder,
        private parametersService: ParameterService
    ) {
        this.formErrors = {
            MotivoAnulacion: {}
        };
    }

    

    shuffle() {
        let currentIndex = this.columnsToDisplay.length;
        while (0 !== currentIndex) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // Swap
            let temp = this.columnsToDisplay[currentIndex];
            this.columnsToDisplay[currentIndex] = this.columnsToDisplay[
                randomIndex
            ];
            this.columnsToDisplay[randomIndex] = temp;
        }
    }

    ngOnInit() {

        this.communicationService.showLoader.next(true);

        this.parametersService.listarBodegaReserva(this.objBodega)
    .subscribe((x: Array<E_Bodegas>) => {
        this.ListBodega = x
        this.communicationService.showLoader.next(false);

    })
    this.form = this.formBuilder.group({
        MotivoAnulacion: [undefined, [Validators.required]],
       

    });
       
       
        
    }

   
SelectedDespacharA(y) {

    this.BodegaSeleccionada = y.value;
  } 
    loadEventQuickSearch() {
        this.filteredProduct = this.productCtrl.valueChanges.pipe(
            debounce(() => timer(500)),
            startWith(""),
            map((state) =>
                state ? this._filterStates(state) : this.ListSaldo.slice()
            ) // )
        );
    }

    private _filterStates(value: string) {
        const filterValue = value.toLowerCase();

        return this.ListSaldo.filter(
            (state) =>
                state.Referencia.toLowerCase().includes(filterValue) ||
                state.Descripcion.toLowerCase().includes(filterValue) ||
                state.Ccostos.toLowerCase().includes(filterValue)
        );
    }

    getTotalSaldo() {
        return this.ListSaldo.map((t) => t.Saldo).reduce(
            (acc, value) => acc + value,
            0
        );
    }
   

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    exportToExcel() {
        const fileName = "test.xlsx";

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
            this.dataSource.data,
            { header: ["Numero", "Valor"] }
        );
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "test");

        XLSX.writeFile(wb, fileName);
    }

    openAdicionarArticulo(Saldo: E_SaldosB): void {
        this.communicationService.showLoader.next(true)
      
            var objPLU: E_PLU = new E_PLU()
            objPLU.CodigoRapido = Saldo.Ccostos.substring(5,10) ;
   //  objPLU.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow();

            this.parametersService.ListarPlu(objPLU)
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
    
ConfirmData(){

    this.communicationService.showLoader.next(true);
   // this.communicationService.showLoader.next(true);
     let mes= ''
     this.anioactual = moment(new Date()).format('YYYY')
     this.mesactual = moment(new Date()).format('MM');

    mes= this.anioactual+this.mesactual
   //MRG: Validar los siguientes datos para enviar segun el usuarios.
  
    
       this.AdminService.ObtenerSaldoBodega(this.BodegaSeleccionada, mes).subscribe(
           (x: Array<E_SaldosB>) => {
               
               this.ListSaldo = x;

               // Assign the data to the data source for the table to render
               this.dataSource = new MatTableDataSource(this.ListSaldo);

               this.dataSource.paginator = this.paginator;
               this.dataSource.sort = this.sort;
               this.communicationService.showLoader.next(false);
               this.loadEventQuickSearch();
           }
       );
}
   

}
