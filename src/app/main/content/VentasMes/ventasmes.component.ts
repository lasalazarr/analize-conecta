import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ResumenPedidoComponent } from '../ResumenPedido/resumenpedido.component';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { VentasService } from 'app/ApiServices/VentasService';
import { E_Ventas } from 'app/Models/E_Ventas';
import { E_VentasG } from 'app/Models/E_VentasG';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { DetallePedidosComponent } from '../DetallePedidos/detallepedidos.component';
import { TableUtil } from "../MisPedidos/tableUtils";
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import * as moment from 'moment'
import * as XLSX from 'xlsx';



@Component({
    moduleId: module.id,
    selector: 'ventasmes',
    templateUrl: 'ventasmes.component.html',
    styleUrls: ['ventasmes.component.scss']
})

export class VentasMesComponent implements OnInit {
    displayedColumns: string[] = ['Fecha', 'Meta', 'Venta', 'Cumplimiento'];
    dataSource: MatTableDataSource<E_Ventas>;
    columnsToDisplay: string[] = this.displayedColumns.slice();



    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource1: Object = {};
    anioactual: string;
    mesactual: string;
    SaveInProgress: boolean;
    SucceSave: boolean;
    form: FormGroup;
    formErrors: any;
    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListVentas: Array<E_Ventas> = new Array<E_Ventas>()
    public ListVentasG: Array<E_VentasG> = new Array<E_VentasG>()
    public MesSeleccionado: string = "";
    public ListMes: Array<Object> = [
        { IdMes: "01", Nombre: 'ENERO' },
        { IdMes: "02", Nombre: 'FEBRERO' },
        { IdMes: "03", Nombre: 'MARZO' },
        { IdMes: "04", Nombre: 'ABRIL' },
        { IdMes: "05", Nombre: 'MAYO' },
        { IdMes: "06", Nombre: 'JUNIO' },
        { IdMes: "07", Nombre: 'JULIO' },
        { IdMes: "08", Nombre: 'AGOSTO' },
        { IdMes: "09", Nombre: 'SEPTIEMBRE' },
        { IdMes: "10", Nombre: 'OCTUBRE' },
        { IdMes: "11", Nombre: 'NOVIEMBRE' },
        { IdMes: "12", Nombre: 'DICIEMBRE' },
    ];

    public AnioSeleccionado: string = "";
    public ListAnio: Array<Object> = [
        { IdAnio: "2018", Nombre: '2018' },
        { IdAnio: "2019", Nombre: '2019' },
        { IdAnio: "2020", Nombre: '2020' },
        { IdAnio: "2021", Nombre: '2021' },
    ];

    chartConfig: Object;

    constructor(public dialog: MatDialog,
        private formBuilder: FormBuilder,
        private VentasService: VentasService,
        private bottomSheet: MatBottomSheet,
        private communicationService: CommunicationService,
        private UserService: UserService)
         {
        this.formErrors = {

            Mes: {},
            Anio: {}
        };
    }



    ngOnInit() {

        this.form = this.formBuilder.group({

            Mes: [undefined, [Validators.required]],
            Anio: [undefined, [Validators.required]]

        });


        this.anioactual = moment(new Date()).format('YYYY');
        this.mesactual = moment(new Date()).format('MM');
        this.AnioSeleccionado = moment(new Date()).format('YYYY');
        this.MesSeleccionado = moment(new Date()).format('MM');
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        var objVentas: E_Ventas = new E_Ventas()

        objVentas.Codigolider = this.SessionUser.IdLider;
        objVentas.Vendedor = this.SessionUser.IdVendedor;
        objVentas.Mes = this.anioactual + this.mesactual;
        this.communicationService.showLoader.next(true);

        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        if (this.SessionUser.IdGrupo == "60") {
            this.VentasService.VentasxLiderxMes(objVentas)
                .subscribe((x: Array<E_Ventas>) => {
                    this.ListVentas = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListVentas);

                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.VentasService.VentasxLiderxAnio(objVentas)
                    .subscribe((x: Array<E_VentasG>) => {
                        this.ListVentasG = x
    
    
                        const chartData = this.ListVentasG;
                        // STEP 3 - Chart Configuration
                        const dataSource1 = {
                            chart: {
                                //Set the chart caption
                                caption: "Venta Anual -" + this.anioactual,
                                //Set the chart subcaption
                                subCaption: "Comportamiento Mensual",
                                //Set the x-axis name
                                xAxisName: "Venta Mes",
                                //Set the y-axis name
                                yAxisName: "Venta en Dolares",
                                numberSuffix: "$",
                                //Set the theme for your chart
                                theme: "Fusion"
                            },
                            // Chart Data - from step 2
                            data: chartData
                        };
                        this.dataSource1 = dataSource1;
    
    
                        this.communicationService.showLoader.next(false);
    
                    })
                    
                })

           
        }else{
            this.VentasService.VentasxZonaxMes(objVentas)
            .subscribe((x: Array<E_Ventas>) => {
                this.ListVentas = x

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.ListVentas);

                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.VentasService.VentasxZonaxAnio(objVentas)
                .subscribe((x: Array<E_VentasG>) => {
                    this.ListVentasG = x


                    const chartData = this.ListVentasG;
                    // STEP 3 - Chart Configuration
                    const dataSource1 = {
                        chart: {
                            //Set the chart caption
                            caption: "Venta Anual -" + this.anioactual,
                            //Set the chart subcaption
                            subCaption: "Comportamiento Mensual",
                            //Set the x-axis name
                            xAxisName: "Venta Mes",
                            //Set the y-axis name
                            yAxisName: "Venta en Dolares",
                            numberSuffix: "$",
                            //Set the theme for your chart
                            theme: "Fusion"
                        },
                        // Chart Data - from step 2
                        data: chartData
                    };
                    this.dataSource1 = dataSource1;


                    this.communicationService.showLoader.next(false);

                });

            });

            
           
        }



    }

    getTotalSaldo() {
        return this.ListVentas.map(t => t.Venta).reduce((acc, value) => acc + value, 0);
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
        const fileName = 'test.xlsx';

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data, { header: ['Numero', 'Valor'] });
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'test');

        XLSX.writeFile(wb, fileName);
    }

    ConfirmData() {


        var objVentas: E_Ventas = new E_Ventas()

        objVentas.Codigolider = this.SessionUser.IdLider;
        objVentas.Vendedor = this.SessionUser.IdVendedor;
        objVentas.Mes = this.form.value.Anio + this.form.value.Mes;
        this.communicationService.showLoader.next(true);

        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        if (this.SessionUser.IdGrupo == "60") {
            this.VentasService.VentasxLiderxMes(objVentas)
                .subscribe((x: Array<E_Ventas>) => {
                    this.ListVentas = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListVentas);

                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    

                    this.VentasService.VentasxLiderxAnio(objVentas)
                    .subscribe((x: Array<E_VentasG>) => {
                        this.ListVentasG = x
    
    
                        const chartData = this.ListVentasG;
                        // STEP 3 - Chart Configuration
                        const dataSource1 = {
                            chart: {
                                //Set the chart caption
                                caption: "Venta Anual -" + this.anioactual,
                                //Set the chart subcaption
                                subCaption: "Comportamiento Mensual",
                                //Set the x-axis name
                                xAxisName: "Venta Mes",
                                //Set the y-axis name
                                yAxisName: "Venta en Dolares",
                                numberSuffix: "$",
                                //Set the theme for your chart
                                theme: "Fusion"
                            },
                            // Chart Data - from step 2
                            data: chartData
                        };
                        this.dataSource1 = dataSource1;
    
    
                        this.communicationService.showLoader.next(false);
    
                    });
                });

        
        }else{
            this.VentasService.VentasxZonaxMes(objVentas)
            .subscribe((x: Array<E_Ventas>) => {
                this.ListVentas = x

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.ListVentas);

                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
        
                this.VentasService.VentasxZonaxAnio(objVentas)
                .subscribe((x: Array<E_VentasG>) => {
                    this.ListVentasG = x


                    const chartData = this.ListVentasG;
                    // STEP 3 - Chart Configuration
                    const dataSource1 = {
                        chart: {
                            //Set the chart caption
                            caption: "Venta Anual -" + this.anioactual,
                            //Set the chart subcaption
                            subCaption: "Comportamiento Mensual",
                            //Set the x-axis name
                            xAxisName: "Venta Mes",
                            //Set the y-axis name
                            yAxisName: "Venta en Dolares",
                            numberSuffix: "$",
                            //Set the theme for your chart
                            theme: "Fusion"
                        },
                        // Chart Data - from step 2
                        data: chartData
                    };
                    this.dataSource1 = dataSource1;


                    this.communicationService.showLoader.next(false);

                });

            });

            
            
        }

    }
}