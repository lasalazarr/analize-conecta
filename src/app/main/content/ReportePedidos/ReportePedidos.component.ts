import { Component, ViewChild, OnInit, ElementRef, HostListener } from "@angular/core";
import {
    MatPaginator, MatSort, MatTableDataSource, MatDialog,
} from "@angular/material";
import { ResumenPedidoComponent } from "../ResumenPedido/resumenpedido.component";
import { E_SessionUser } from "app/Models/E_SessionUser";
import { UserService } from "../../../ApiServices/UserService";
import { PedidoService } from "app/ApiServices/PedidoService";
import { E_PedidosCliente } from "app/Models/E_PedidosCliente";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material";
import { DetallePedidosComponent } from "../DetallePedidos/detallepedidos.component";
import { TableUtil } from "../MisPedidos/tableUtils";
import { CommunicationService } from "app/ApiServices/CommunicationService";

import * as XLSX from "xlsx";
import { debounce, startWith, map, mergeMap } from "rxjs/operators";
import { timer, Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { E_Cliente } from "app/Models/E_Cliente";
import _ from 'lodash';
import { ClienteService } from "app/ApiServices/ClienteService";
import { ModalPopUpAnulaComponent } from '../ModalPopUpanula/modalpopupanula.component';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Parametros } from 'app/Models/E_Parametros';
import { GruposUsuariosEnum, ParametrosEnum } from 'app/Enums/Enumerations';
import { PopupcreditoComponent } from '../popupcredito/popupcredito.component';
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DetalleReportePedidos } from './detalle-reporte-pedidos/detalle-reporte-pedidos.component';
import { PedidoXEstadoInfo } from "app/Models/PedidoXEstadoInfo";
import { listenToElementOutputs } from "@angular/core/src/view/element";
@Component({
    moduleId: module.id,
    selector: "ReportePedidos",
    templateUrl: "ReportePedidos.component.html",
    styleUrls: ["ReportePedidos.component.scss"],
})
export class ReportePedidosComponent implements OnInit {
    displayedColumns: string[] = [
        "Fecha",
        "TotalSiCumplenReglas",
        "Numero",
        "Nit",
        "NombreEmpresaria",
        "Valor",
    ];
    dataSource: MatTableDataSource<E_PedidosCliente>;
    columnsToDisplay: string[] = this.displayedColumns.slice();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(BaseChartDirective, {}) charts!: BaseChartDirective;

    public SessionUser: E_SessionUser = new E_SessionUser();
    public ListPedidos: Array<E_PedidosCliente> = new Array<E_PedidosCliente>();
    productCtrl = new FormControl();
    filteredProduct: Observable<E_PedidosCliente[]>;
    public botonpago: boolean = false;
    public minimunMount: string;
    public creditBalance: number;
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
    showTableMovil = false;

    colorScheme = {
        domain: ['#5AA454', '#C7B42C', '#AAAAAA']
    };
    pedidos: any[];

    //CHART
    constructor(
        public dialog: MatDialog,
        private PedidoService: PedidoService,
        private bottomSheet: MatBottomSheet,
        private communicationService: CommunicationService,
        private UserService: UserService,
        private clienteService: ClienteService,
        private parametersService: ParameterService
    ) {
       this.onResize(undefined);
     }

    addColumn() {
        const randomColumn = Math.floor(
            Math.random() * this.displayedColumns.length
        );
        this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
    }
    removeColumn() {
        if (this.columnsToDisplay.length) {
            this.columnsToDisplay.pop();
        }
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
        var multi = []
        let user = this.UserService.GetCurrentCurrentUserNow()
        let tipo = 1
        let input
        //debugger
        switch (Number(user.IdGrupo)) {
            case GruposUsuariosEnum.EmpresariasWeb:
                tipo = 1
                input = user.Cedula
                break;
            case GruposUsuariosEnum.Lider:
                tipo = 2
                input = user.IdLider
                break;
            case GruposUsuariosEnum.GerentesZona:
                tipo = 3
                input = user.IdZona
                break;

            default:
                tipo = 1
                input = user.Cedula
                break;
        }







        // this.PedidoService.ChartPedidos(input, tipo).subscribe(chart => {


        // }


        // )
        // let AlertCounts = []
        // this.PedidoService.GroupPedidos(input, tipo).subscribe(x => {
        //     this.pedidos = x
        //     x.forEach(group => {
        //         AlertCounts.push({ Estado: group.cod_EstPed, count: _.countBy(group.PedidoXEstadoInfo, o => o.AlertaDespacho || o.AlertaFacturacion || o.AlertaLiberacion).true })
        //     })
        // })
        let AlertCounts = []
        this.PedidoService.GroupPedidos(input, tipo).pipe(mergeMap(x => {
            this.pedidos = x
            x.forEach(group => {
                AlertCounts.push({ Estado: group.cod_EstPed, count: _.countBy(group.PedidoXEstadoInfo, o => o.AlertaDespacho || o.AlertaFacturacion || o.AlertaLiberacion).true })
            })
            return this.PedidoService.ChartPedidos(input, tipo)
        }))
            .subscribe((chart) => {
                chart.forEach(item => {
                    multi.push(
                        {
                            "name": item.Estado_Pedido,
                            "series": [
                                {
                                    "name": "Total",
                                    "value": item.NumeroPedidos
                                },
                                {
                                    "name": "Alerta",
                                    "value": AlertCounts.length > 0 && !_.isNil(AlertCounts.find(y => y.Estado == item.cod_EstPed)) ?
                                        AlertCounts.find(y => y.Estado == item.cod_EstPed).count : 0
                                },
                            ]
                        },
                    )

                })
                Object.assign(this, { multi });
            });



        this.getCreditMountParameter();

        this.SessionUser = this.UserService.GetCurrentCurrentUserNow();
        var objPedidos: E_PedidosCliente = new E_PedidosCliente();
        objPedidos.IdVendedor = this.SessionUser.IdVendedor;
        objPedidos.Nit = this.SessionUser.Cedula;
        objPedidos.Campana = this.SessionUser.Campana;
        objPedidos.IdLider = this.SessionUser.IdLider;

        this.communicationService.showLoader.next(true);

        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        if (
            this.SessionUser.IdGrupo == "50" ||
            this.SessionUser.IdGrupo == "80" ||
            this.SessionUser.IdGrupo == "99"
        ) {
            this.botonpago = true;
            this.PedidoService.PedidosListEmpresarias(objPedidos).subscribe(
                (x: Array<E_PedidosCliente>) => {
                    this.ListPedidos = x;

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListPedidos);

                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.communicationService.showLoader.next(false);
                    this.loadEventQuickSearch();
                }
            );
        } else if (this.SessionUser.IdGrupo == "52") {
            this.botonpago = false;
            this.PedidoService.PedidosList(objPedidos).subscribe(
                (x: Array<E_PedidosCliente>) => {
                    this.ListPedidos = x;

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListPedidos);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.communicationService.showLoader.next(false);
                    this.loadEventQuickSearch();
                }
            );
        } else if (this.SessionUser.IdGrupo == "60") {
            this.botonpago = false;
            this.PedidoService.PedidosListLider(objPedidos).subscribe(
                (x: Array<E_PedidosCliente>) => {
                    this.ListPedidos = x;

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListPedidos);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.communicationService.showLoader.next(false);
                    this.loadEventQuickSearch();
                }
            );
        }
    }

    

    openDetalleSocilitud(item) {

        this.PedidoService.LogisticaXPedido(item).subscribe(
            (x: Array<any>) => {
                const ref = this.dialog.open(DetalleReportePedidos, {
                    panelClass: '',
                    width: '450px',
                    data: x[0]
                });
            }
        );




    }


    getCreditMountParameter() {
        var objParametros: E_Parametros = new E_Parametros();

        objParametros.Id = ParametrosEnum.ValorMinimoParaPagoCredito;

        this.parametersService.listarParametrosxId(objParametros).subscribe(x => {
            this.minimunMount = x.Valor;
        })
    }
    loadEventQuickSearch() {
        this.filteredProduct = this.productCtrl.valueChanges.pipe(
            debounce(() => timer(500)),
            startWith(""),
            map((state) =>
                state ? this._filterStates(state) : this.ListPedidos.slice()
            ) // )
        );
    }

    private _filterStates(value: string) {
        const filterValue = value.toLowerCase();

        return this.ListPedidos.filter(
            (state) =>
                state.Numero.toLowerCase().includes(filterValue) ||
                state.Nit.toLowerCase().includes(filterValue) ||
                state.NombreEmpresaria.toLowerCase().includes(filterValue)
        );
    }

    getTotalSaldo() {
        return this.ListPedidos.map((t) => t.Valor + t.IVA).reduce(
            (acc, value) => acc + value,
            0
        );
    }

    openResumenPedido(Numero): void {
        this.bottomSheet.open(DetallePedidosComponent, {
            panelClass: "knowledgebase-article-dialog", //MRG: poner este para el style del popup.
            data: {
                TipoMensaje: "Error",
                Titulo: "Detalle Pedido",
                Mensaje: "Detalle del Pedido.",
                NumeroPedidoReservado: Numero,
              
               
            },
        });
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

    pedidosReservados(cliente: E_PedidosCliente) {
        let safariWindow = window.open("https://www.whatsapp.com");
        var objCliente: E_Cliente = new E_Cliente();
        var objClienteResp: E_Cliente = new E_Cliente();
        objCliente.Nit = cliente.Nit;
        let mensaje = "";

        this.clienteService.ListClienteSVDNxNit(objCliente).subscribe((x) => {
            objClienteResp = x;

            if (objClienteResp != null) {
                const valorconiva = cliente.Valor + cliente.IVA;
                mensaje =
                    "https://api.whatsapp.com/send?phone=593" +
                    x.Celular1 +
                    "&text=Estimad@, "
                    + x.Nombre1 +
                    "  Tú pedido número " +
                    cliente.Numero +
                    " de " +
                    valorconiva +
                    ", se anulará en " +
                    cliente.TotalSiCumplenReglas +
                    " dias.  Recuerda realizar el pago en las entidades bancarias, para agilizar el proceso de facturación y envío del mismo.  Saludos,   " +
                    cliente.NombreVendedor;

                setTimeout(() => {
                    safariWindow.location.href = mensaje;
                }, 500);
            }
        });
    }

    AnularpedidosReservados(cliente: E_PedidosCliente): void {
        const dialogRef = this.dialog.open(ModalPopUpAnulaComponent, {
            //width: '550px',
            panelClass: 'knowledgebase-article-dialog',
            data: cliente
        });

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            //this.Mensaje = result; //AQUI RECIBE LOS DATOS DEL POPUP CERRADO. OJO PARA PEDIDO.
        });
    }
    PagarConCredito(cliente: E_PedidosCliente): void {
        if (cliente.Valor >= +this.minimunMount) {
            this.PedidoService.ConsultarEstadoCredito(cliente.Nit, cliente.Valor).subscribe(x => {
                if (x) {
                    //Puede pagar con credito
                    this.openPopUpCredito(cliente);
                } else {
                    //No puede pagar con credito
                    const dialogRef = this.dialog.open(ModalPopUpComponent, {
                        panelClass: 'dialogInfocustom',
                        width: '450px',
                        data: { TipoMensaje: "Ok", Titulo: "Aviso", Mensaje: "No posee crédito aprobado para realizar el pago." }
                    });
                }
            });
        } else {
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                panelClass: 'dialogInfocustom',
                width: '450px',
                data: { TipoMensaje: "Ok", Titulo: "Aviso", Mensaje: "Para realizar el pago con credito, este debe superar el monto mínimo: " + this.minimunMount }
            });
        }


    }

    openPopUpCredito(cliente: E_PedidosCliente) {

        const dialogRef = this.dialog.open(PopupcreditoComponent, {
            panelClass: 'dialogInfocustom',
            width: '450px',
            data: { nit: cliente.Nit, nroPedido: cliente.Numero }
        });


        this.clienteService.SolicitarToken(cliente.Nit)
            .subscribe((x) => {
                if (x.existError)
                    console.error("Ocurrio un error en el envío del token" + x.Descripcion);
            })

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this.finDePedido();
            }
        });
    }
    finDePedido() {
        const dialogRef = this.dialog.open(ModalPopUpComponent, {
            panelClass: 'dialogInfocustom',
            width: '450px',
            data: { TipoMensaje: "Ok", Titulo: "Pedido liberado", Mensaje: "Se liberó el pedido exitosamente!" }
        });

    }


    selectDaysAlert(pedido: PedidoXEstadoInfo) {
        if (pedido.AlertaDespacho) {
            return pedido.DiasDespacho
        } else if (pedido.AlertaFacturacion) {
            return pedido.DiasFacturacion
        } else if (pedido.AlertaLiberacion) {
            return pedido.DiasLiberacion
        } else {
            return '00:00:00'
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const ua = navigator.userAgent;
        if (ua.includes('Android') || ua.includes('webOS') || ua.includes('iPhone') ||
           ua.includes('iPad') || ua.includes('iPod') || ua.includes('BlackBerry') ||
           ua.includes('IEMobile') || ua.includes('Opera Mini') || ua.includes('Mobile') ||
           ua.includes('mobile') || ua.includes('CriOS')){
                this.showTableMovil = true;
                return;
        }
        if ( event !== undefined && event.target.innerWidth && event.target.innerWidth < 576 ){
            this.showTableMovil = true;
        }
    }

}
