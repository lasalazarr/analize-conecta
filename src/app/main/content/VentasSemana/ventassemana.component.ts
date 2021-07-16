import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';

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
import { DatosSemana } from 'app/Models/DatosSemana';
import { E_Lider } from 'app/Models/E_Lider';
import { forkJoin } from 'rxjs';



@Component({
    moduleId: module.id,
    selector: 'ventassemana',
    templateUrl: 'ventassemana.component.html',
    styleUrls: ['ventassemana.component.scss']
})

export class VentasSemanaComponent implements OnInit {
    displayedColumns: string[] = ['RangoSemana', 'NuevaCumple', 'NuevaNoCumple', 'PedidoCumple','PedidoNoCumple', 'Venta'];
    dataSource: MatTableDataSource<DatosSemana>;
    columnsToDisplay: string[] = this.displayedColumns.slice();



    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource1: Object = {};
    anioactual: string;
    mesactual: string;
    SaveInProgress: boolean;
    EsDirector: boolean;
    SucceSave: boolean;
    ActivaList: boolean = false;
    SelectLider: boolean = false;
    form: FormGroup;
    formErrors: any;
    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListVentas: Array<DatosSemana> = new Array<DatosSemana>()
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

    public LiderSeleccionado: string = "";
    public ListLider: Array<E_Lider> = new Array<E_Lider>();
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
        private ParameterService: ParameterService,
        private VentasService: VentasService,
        private bottomSheet: MatBottomSheet,
        private communicationService: CommunicationService,
        private UserService: UserService) {
        this.formErrors = {

            Mes: {},
            Anio: {},
            Lider: {},
            Todos:{}
        };
    }



    ngOnInit() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow();

        const chainSubcriptions = []
         chainSubcriptions.push(this.ParameterService.listarLider(this.SessionUser))
        this.communicationService.showLoader.next(true)
        forkJoin(chainSubcriptions).subscribe((response: [Array<E_Lider>]) => {
          
            this.SetLider(response[0]);
        
            this.communicationService.showLoader.next(false)
        })


        this.form = this.formBuilder.group({

            Mes: [undefined, [Validators.required]],
            Anio: [undefined, [Validators.required]],
            Lider: [undefined, [Validators.required]],
            Todos: [undefined]
        });

        this.form.value.Todos=1;
        this.anioactual = moment(new Date()).format('YYYY');
        this.mesactual = moment(new Date()).format('MM');
        this.AnioSeleccionado = moment(new Date()).format('YYYY');
        this.MesSeleccionado = moment(new Date()).format('MM');
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        var objVentas: DatosSemana = new DatosSemana()

        objVentas.Lider = this.SessionUser.IdLider;
        objVentas.Vendedor = this.SessionUser.IdVendedor;
        objVentas.Mes = this.anioactual + this.mesactual;
        this.communicationService.showLoader.next(true);

        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        if (this.SessionUser.IdGrupo == "60") {
            this.EsDirector = false;
            this.VentasService.VentasxLiderxSemana(objVentas)
                .subscribe((x: Array<DatosSemana>) => {
                    this.ListVentas = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListVentas);

                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.communicationService.showLoader.next(false);
                    
                })

           
        }else{
            this.EsDirector = true;
            this.VentasService.VentasxZonaxSemana(objVentas)
            .subscribe((x: Array<DatosSemana>) => {
                this.ListVentas = x

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.ListVentas);

                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.communicationService.showLoader.next(false);

            });

            
           
        }


    }
    private SetLider(x: E_Lider[]) {
        this.ListLider = x;
    }   

    setAll(completed: boolean) {
        this.ActivaList = completed;
        this.SelectLider = false;

        
      }
    SelectedLider(y) {
        this.LiderSeleccionado = y.value
        this.SelectLider = true;

}
    getTotalSaldo() {
        return this.ListVentas.map(t => t.Venta).reduce((acc, value) => acc + value, 0);
    }

    getTotalNuevas() {
        return this.ListVentas.map(t => t.NuevaCumple).reduce((acc, value) => acc + value, 0);
    }
    getTotalPedidos() {
        return this.ListVentas.map(t => t.PedidoCumple).reduce((acc, value) => acc + value, 0);
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


        var objVentas: DatosSemana = new DatosSemana()

        
        objVentas.Vendedor = this.SessionUser.IdVendedor;
        objVentas.Mes = this.form.value.Anio + this.form.value.Mes;
        this.communicationService.showLoader.next(true);

        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        if (this.SessionUser.IdGrupo == "60") {
            objVentas.Lider = this.SessionUser.IdLider;
            this.VentasService.VentasxLiderxSemana(objVentas)
                .subscribe((x: Array<DatosSemana>) => {
                    this.ListVentas = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListVentas);

                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.communicationService.showLoader.next(false);
                });

        
        }else{
            if(this.form.value.Todos==0 || this.SelectLider){
                objVentas.Lider = this.LiderSeleccionado;
                this.VentasService.VentaxZonayLiderxSemanal(objVentas)
                .subscribe((x: Array<DatosSemana>) => {
                    this.ListVentas = x
    
                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListVentas);
    
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.communicationService.showLoader.next(false);
    
                });
            }else{

            
            this.VentasService.VentasxZonaxSemana(objVentas)
            .subscribe((x: Array<DatosSemana>) => {
                this.ListVentas = x

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.ListVentas);

                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.communicationService.showLoader.next(false);

            });

            
        }
        }

    }
}