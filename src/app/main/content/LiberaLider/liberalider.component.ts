import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { CxCService } from 'app/ApiServices/CxCService';

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
import { E_DatosComision } from 'app/Models/DatosComision';
import { E_DetalleComision } from 'app/Models/DatosDetalleComision';

import { E_Lider } from 'app/Models/E_Lider';
import { E_CxC } from 'app/Models/E_CxC';
import { forkJoin } from 'rxjs';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { LiberarRenderComponent } from './liberar-render/LiberarRenderComponent';
import { LiderLiberacion } from 'app/Models/LiderLiberacion';
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';


@Component({
    moduleId: module.id,
    selector: 'liberalider',
    templateUrl: 'liberalider.component.html',
    styleUrls: ['liberalider.component.scss']
})

export class LiberaLiderComponent implements OnInit {
    displayedColumns: string[] = ['Mes','Nit','Documento', 'Tipo', 'Fecha', 'BaseModa', 'BaseOtros'];
    dataSource: MatTableDataSource<E_CxC>;
    dataSource2: MatTableDataSource<E_DatosComision>;
    columnsToDisplay: string[] = this.displayedColumns.slice();
    displayedColumns1: string []= [ 'Mes', 'BaseModa','ComisionModa','BaseOtros','ComisionOtros'];
    columnsToDisplay1: string[] = this.displayedColumns1.slice();


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource1: Object = {};
    anioactual: string;
    mesactual: string;
    SaveInProgress: boolean;
    EsDirector: boolean;
    EsLider:boolean;
    NombreUsuario: string;
    public Saldo: number;
    public Saldo2: number;
    SucceSave: boolean;
    form: FormGroup;
    formErrors: any;
    public SessionUser: E_SessionUser = new E_SessionUser()
    public CarteraLider: E_CxC = new E_CxC();

    public ListVentas: Array<E_DetalleComision> = new Array<E_DetalleComision>()
    public ListComision: Array<E_DatosComision> = new Array<E_DatosComision>()
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



    public gridOptions: any;
    public gridColumnApi:any;
    public gridApi; 
    public frameworkComponents;
    public columnDefs;
    public rowData: Array<E_PedidosCliente> = new Array<E_PedidosCliente>();
    public TextColor : string 
    public listaLider : Array<LiderLiberacion> = new Array<LiderLiberacion>();

    constructor(private PedidoService: PedidoService,public dialog: MatDialog, private formBuilder: FormBuilder, private ParameterService: ParameterService,
    private VentasService: VentasService, private CxCService: CxCService, private bottomSheet: MatBottomSheet,
    private communicationService: CommunicationService, private UserService: UserService) 
    {
        this.formErrors = {
            Mes: {},
            Anio: {},
            Lider: {}
        };
    }


    ////////////////////////////////////////////////////J.
    onGridReady(params){
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;  
    }

    public liberar(){
        this.communicationService.showLoader.next(true)
        let liderl = new LiderLiberacion();
        this.rowData.forEach(element => {
         //   debugger
            if(element.Procesado){
                liderl = new LiderLiberacion();
                liderl.Pedido = element.Numero;
                liderl.Valor = element.Valor;
                this.listaLider.push(liderl);
            }
        });
        if(this.listaLider.length == 0){
            this.communicationService.showLoader.next(false); 
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                width: '450px',
                data: { TipoMensaje: "Info", Titulo: "Liberacion de pedidos", Mensaje: "No se seleccionaron datos para liberar." }
            });
        }else{
            this.PedidoService.LiderLiberacion(this.listaLider).subscribe(x =>{
                if(x){
                    this.SessionUser = this.UserService.GetCurrentCurrentUserNow();
                    var objPedidos: E_PedidosCliente = new E_PedidosCliente();
                objPedidos.IdVendedor = this.SessionUser.IdVendedor;
                objPedidos.Nit = this.SessionUser.Cedula;
                objPedidos.Campana = this.SessionUser.Campana;
                objPedidos.IdLider = this.SessionUser.IdLider;
                
                this.PedidoService.PedidosListLiderB(objPedidos).subscribe(
                    (x: Array<E_PedidosCliente>) => {
                        this.rowData = x;
                        this.communicationService.showLoader.next(false);  
                    });
                    this.communicationService.showLoader.next(false); 
                    const dialogRef = this.dialog.open(ModalPopUpComponent, {
                        width: '450px',
                        data: { TipoMensaje: "Exito", Titulo: "Liberacion de pedidos", Mensaje: "Exito el liberar pedidos" }
                    });
                }else{
                    const dialogRef = this.dialog.open(ModalPopUpComponent, {
                        width: '450px',
                        data: { TipoMensaje: "Error", Titulo: "Liberacion de pedidos", Mensaje: "No se pudo liberar los pedidos." }
                    });
                }
            })
        }
        

    }
    ///////////////////////////////////////////////////////

    addColumn() {
        const randomColumn = Math.floor(Math.random() * this.displayedColumns1.length);
        this.columnsToDisplay.push(this.displayedColumns1[randomColumn]);
    }
    removeColumn() {
        if (this.columnsToDisplay1.length) {
            this.columnsToDisplay1.pop();
        }
    }
    shuffle() {
        let currentIndex = this.columnsToDisplay1.length;
        while (0 !== currentIndex) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // Swap
            let temp = this.columnsToDisplay1[currentIndex];
            this.columnsToDisplay1[currentIndex] = this.columnsToDisplay1[randomIndex];
            this.columnsToDisplay1[randomIndex] = temp;
        }
    }

    

    ngOnInit() {
        this.communicationService.showLoader.next(true)
        this.frameworkComponents = {
            liberarRenderComponent: LiberarRenderComponent
           };
        this.columnDefs = [
            { headerName: 'Numero', width: 150,      field: 'Numero' },
            { headerName: 'Nit',width: 150,   field: 'Nit' },
            { headerName: 'Valor',width: 120,    field: 'Valor'},
            { headerName: 'Fecha', width: 150,      field: 'Fecha' },
            { headerName: 'NombreEmpresaria', width: 230,      field: 'NombreEmpresaria' },
            { headerName: 'Liberar', width: 80,   field: 'Procesado',cellRenderer: 'liberarRenderComponent'}
          ];
      
          
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow();
        
        var objCxC: E_CxC= new E_CxC()
        var objVentas1: E_DatosComision = new E_DatosComision()
        objVentas1.Mes = this.anioactual + this.mesactual;
        if (this.SessionUser.IdGrupo == "60") {
            this.anioactual = moment(new Date()).format('YYYY');
            this.mesactual = moment(new Date()).format('MM');
            objCxC.Mes = this.anioactual + this.mesactual;
            objCxC.Nit = this.SessionUser.Cedula;
            objVentas1.Lider = this.SessionUser.IdLider;
            this.NombreUsuario = this.SessionUser.NombreUsuario;
            this.CxCService.CarteraNit(objCxC).subscribe((x: E_CxC) => {
                    this.CarteraLider = x
                    this.Saldo = this.CarteraLider.Saldo;
                    this.Saldo2 = this.Saldo
                    if(this.Saldo > 0){
                        this.TextColor ="red";
                    }else{
                        this.TextColor ="black";
                    }
                    this.communicationService.showLoader.next(false);
            })
            var objPedidos: E_PedidosCliente = new E_PedidosCliente();
            objPedidos.IdVendedor = this.SessionUser.IdVendedor;
            objPedidos.Nit = this.SessionUser.Cedula;
            objPedidos.Campana = this.SessionUser.Campana;
            objPedidos.IdLider = this.SessionUser.IdLider;
            
            this.PedidoService.PedidosListLiderB(objPedidos).subscribe(
                (x: Array<E_PedidosCliente>) => {
                    this.rowData = x;
                    this.communicationService.showLoader.next(false);  
                }
            );
        }
    }

    private SetLider(x: E_Lider[]) {
        this.ListLider = x;
    }
    SelectedLider(y: { value: string; }) {

        var depObj = this.ListLider.find(x => x.IdLider == y.value);
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }
    getTotalModa() {
        return this.ListVentas.map(t => t.BaseModa).reduce((acc, value) => acc + value, 0);
    }
    getTotalOtros() {
        return this.ListVentas.map(t => t.BaseOtros).reduce((acc, value) => acc + value, 0);
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


}