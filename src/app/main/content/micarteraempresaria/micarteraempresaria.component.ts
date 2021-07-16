import { Component, ViewChild, OnInit } from "@angular/core";
import {
    MatPaginator,
    MatSort,
    MatTableDataSource,
    MatDialog,
    MatBottomSheet,
} from "@angular/material";
import { E_SessionUser } from "app/Models/E_SessionUser";
import { UserService } from "../../../ApiServices/UserService";
import { CxCService } from "app/ApiServices/CxCService";
import { E_CxC } from "app/Models/E_CxC";
import { MiCarteraDetalleComponent } from "../micarteradetalle/micarteradetalle.component";
import { CommunicationService } from "app/ApiServices/CommunicationService";
import { E_VentasG } from "app/Models/E_VentasG";
import { debounce, startWith, map, mergeMap } from "rxjs/operators";
import { timer, Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { E_Cliente } from "app/Models/E_Cliente";
import { items } from "fusioncharts";
import _, { merge } from "lodash";
import { ClienteService } from 'app/ApiServices/ClienteService';

@Component({
    moduleId: module.id,
    selector: "micarteraempresaria",
    templateUrl: "micarteraempresaria.component.html",
    styleUrls: ["micarteraempresaria.component.scss"],
})
export class MiCarteraEmpresariaComponent implements OnInit {
    displayedColumns = [
        "Nit",
        "Nombre",
        "Lider",
        "Saldo",
        "Whatsapp",
        "EstadoCredito",
    ];
    dataSource: MatTableDataSource<E_CxC>;
    public botonpago: boolean = false;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public EstadoCredito: string;
    public visibleLocalizacion: boolean = false;
    public ListVentasG: Array<E_VentasG> = new Array<E_VentasG>();
    public SessionUser: E_SessionUser = new E_SessionUser();
    public ListCxC: Array<E_CxC> = new Array<E_CxC>();
    dataSource1: Object = {};
    productCtrl = new FormControl();
    filteredProduct: Observable<E_CxC[]>;
    saldo: any;

    constructor(
        public dialog: MatDialog,
        private CxCService: CxCService,
        private bottomSheet: MatBottomSheet,
        private communicationService: CommunicationService,
        private UserService: UserService,
        private clienteService: ClienteService
    ) {}

    ngOnInit() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow();
        var objCxC: E_CxC = new E_CxC();
        if (this.SessionUser.IdGrupo === "60") {
            objCxC.Codigolider = this.SessionUser.IdLider;
        } else if (
            this.SessionUser.IdGrupo === "50" ||
            this.SessionUser.IdGrupo === "80" ||
            this.SessionUser.IdGrupo === "99"
        ) {
            objCxC.Codigolider = undefined;
            objCxC.Nit = this.SessionUser.Cedula;
            this.visibleLocalizacion = true;
            this.botonpago = true;
        } else {
            objCxC.Codigolider = undefined;
            objCxC.Nit = undefined;
            objCxC.Vendedor = this.SessionUser.IdVendedor;
        }
        this.communicationService.showLoader.next(true);

        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        //objCxC.Vendedor = "0008";
        this.CxCService.ListCxCEmpresarias(objCxC).subscribe(
            (x: Array<E_CxC>) => {
                this.ListCxC = x;
                this.EstadoCredito = x[0].EstadoCredito;
                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(x);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.communicationService.showLoader.next(false);
                this.loadEventQuickSearch();
            }
        );

        this.CxCService.ListCarteraEdad(objCxC).subscribe(
            (z: Array<E_VentasG>) => {
                this.ListVentasG = z;

                const chartData = this.ListVentasG;
                // STEP 3 - Chart Configuration
                const dataSource1 = {
                    chart: {
                        caption: "Resumen cartera por edad",
                        subcaption: "",
                        enablesmartlabels: "1",
                        showlabels: "1",
                        numbersuffix: " $",
                        usedataplotcolorforlabels: "1",
                        plottooltext: "$label, <b>$value</b> $",
                        theme: "umber",
                    },
                    // Chart Data - from step 2
                    data: chartData,
                };
                this.dataSource1 = dataSource1;

                this.communicationService.showLoader.next(false);
            }
        );
    }
    getTotalSaldo() {
        return this.ListCxC.map((t) => t.Saldo).reduce(
            (acc, value) => acc + value,
            0
        );
    }
    openResumenPedido(row: E_CxC): void {
        this.bottomSheet.open(MiCarteraDetalleComponent, {
            panelClass: "knowledgebase-article-dialog", //MRG: poner este para el style del popup.
            data: {
                CedulaEmpresaria: row.Nit,
                NombreEmpresaria: row.Nombre,
                BotonPago: this.botonpago,
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

    loadEventQuickSearch() {
        this.filteredProduct = this.productCtrl.valueChanges.pipe(
            debounce(() => timer(500)),
            startWith(""),
            map((state) =>
                state ? this._filterStates(state) : this.ListCxC.slice()
            ) // )
        );
    }

    private _filterStates(value: string) {
        const filterValue = value.toLowerCase();

        return this.ListCxC.filter(
            (state) =>
                state.Nit.toLowerCase().includes(filterValue) ||
                state.Nombre.toLowerCase().includes(filterValue) ||
                state.Lider.toLowerCase().includes(filterValue)
        );
    }
    llamarEmpresaria(item: E_Cliente) {
        var objCxC: E_CxC = new E_CxC();

        objCxC.Nit = item.Nit;
        let safariWindow = window.open("https://www.whatsapp.com");
        this.communicationService.showLoader.next(true);
        
        this.clienteService.ConsultaExisteEmpresariaNombre(item).pipe(mergeMap(cliente=>{
            item.Celular1 = cliente.Celular1;
            item.Nombre1 = cliente.Nombre1;
            item.Nit = cliente.Nit;

            return this.CxCService.ListCxCLider(objCxC)
        }))
        .subscribe((x: Array<E_CxC>) => {
            this.communicationService.showLoader.next(false);
            if (!_.isNil(x) && x.length > 0) {
                this.setValorMensaje(x, item, safariWindow);
            }
        });
    }

    private setValorMensaje(x: E_CxC[], item: E_Cliente, safariWindow) {
        let cantidadFacturas = 0;
        let valorTotal = 0;
        cantidadFacturas = x.length;
        valorTotal = _.sumBy(x, (valor) => valor.Saldo);
        let mensaje;
        let mensajeFacturas = "";
        x.forEach((factura) => {
            mensajeFacturas +=
                " Nro " + factura.Numero + " - Valor " + factura.Saldo + ";";
        });
        let mensajeFijo =
            "https://api.whatsapp.com/send?phone=593" +
            item.Celular1 +
            "&text=";
        mensaje =
            item.Nombre1 +
            ",  Te estoy enviando el detalle de tu cartera vencida, pendiente de pago: " +
            mensajeFacturas +
            "   Tienes pendiente " +
            cantidadFacturas +
            " facturas por valor de " +
            valorTotal +
            " realiza tu pago," +
            "  en Banco Pichincha Codigo:38237, contrapartida:  " + item.Nit +
            "  Cordialmente,  " +
            item.Lider;

        setTimeout(() => {
            safariWindow.location.href = mensajeFijo + mensaje;
        }, 500);
    }
}
