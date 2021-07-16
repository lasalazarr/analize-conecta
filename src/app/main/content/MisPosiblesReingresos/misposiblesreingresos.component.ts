import { Component, ViewChild, OnInit } from "@angular/core";
import {
    MatPaginator,
    MatSort,
    MatTableDataSource,
    MatDialog,
} from "@angular/material";
import { DetalleClienteComponent } from "../DetalleCliente/detallecliente.component";
import { E_Cliente } from "app/Models/E_Cliente";
import { ClienteService } from "app/ApiServices/ClienteService";
import { E_SessionUser } from "app/Models/E_SessionUser";
import { UserService } from "../../../ApiServices/UserService";
import { CommunicationService } from "app/ApiServices/CommunicationService";
import { PuntosService } from "app/ApiServices/PuntosService";
import { E_Puntos } from "app/Models/E_Puntos";
import { debounce, startWith, map } from "rxjs/operators";
import { Observable, timer } from 'rxjs';
import { FormControl } from '@angular/forms';
import _ from 'lodash';
import moment from "moment";




@Component({
    moduleId: module.id,
    selector: "misposiblesreingresos",
    templateUrl: "misposiblesreingresos.component.html",
    styleUrls: ["misposiblesreingresos.component.scss"],
})
export class MisPosiblesReingresosComponent implements OnInit {
    displayedColumns = [
        "imagenEmpresaria",
        "NombreCompleto",
        "Detalle",
        "Whatsapp",
    ];
    filteredProduct: Observable<E_Cliente[]>;
    productCtrl = new FormControl();
    dataSource: MatTableDataSource<E_Cliente>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public SessionUser: E_SessionUser = new E_SessionUser();
    public ListClientes: Array<E_Cliente> = new Array<E_Cliente>();
    mensage: string;
    safariWindow: Window;

    constructor(
        public dialog: MatDialog,
        private clienteService: ClienteService,
        private UserService: UserService,
        private communicationService: CommunicationService,
        private puntosservices: PuntosService
    ) { }

    ngOnInit() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow();
        const objCliente: E_Cliente = new E_Cliente();
        objCliente.Vendedor = this.SessionUser.IdVendedor;
        objCliente.Lider = this.SessionUser.IdLider;
        objCliente.IdEstadosCliente = 22;

        this.communicationService.showLoader.next(true);        
        if (this.SessionUser.IdGrupo === "52") {
            this.clienteService
                .ListEmpresariasxGerentexEstado(objCliente)
                .subscribe((x: Array<E_Cliente>) => {
                    this.ListClientes = x;

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientes);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.loadEventQuickSearch()
                    this.communicationService.showLoader.next(false);
                });
        } else if (this.SessionUser.IdGrupo === "60") {
            this.clienteService
                .ListEmpresariasxLiderEstado(objCliente)
                .subscribe((x: Array<E_Cliente>) => {
                    this.ListClientes = x;

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientes);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.loadEventQuickSearch()
                    this.communicationService.showLoader.next(false);
                });
        }
    }

    openDetalleCliente(row: E_Cliente): void {
        this.communicationService.showLoader.next(true);
        this.clienteService.ObtenerClientexNit(row.Nit.trim())
            .subscribe((x: E_Cliente) => {
               
                    var a = moment(new Date());
                    var b = moment(x.UltimaCompra);
                    x.RemainingDays = a.diff(b, "days");
               

                const dialogRef = this.dialog.open(DetalleClienteComponent, {
                    panelClass: 'knowledgebase-article-dialog',
                    data: x
                });

                dialogRef.afterClosed().subscribe(result => {
                });
                this.communicationService.showLoader.next(false);

            })


    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    enviaWhatsapp(cliente: E_Cliente) {
        
        this.clienteService.ObtenerClientexNit(cliente.Nit.trim())
        .subscribe((x: E_Cliente) => {

        let imput = new E_Puntos();
        imput.Nit = cliente.Nit;
        imput.Lider = null;
        imput.Vendedor = null;
        let mensaje = ""
     //   let safariWindow = window.open("https://www.whatsapp.com");
        this.puntosservices.ListPuntosEmpresarias(imput).subscribe((puntos) => {


            if (puntos.length > 0 && !_.isNil(puntos[0].PuntosTotal)) {
                if(puntos[0].PuntosTotal >0){
                    mensaje = "https://api.whatsapp.com/send?phone=593" + x.Celular1 + "&text=Hola, " + x.Nombre1 +
                    "  Aquí puedes ver nuestras más recientes novedades https://appsaved.lineadirectaec.com/glod/ para realizar tus compras en el app de Glod." +
                    " Recuerda que tienes " + puntos[0].PuntosTotal + " puntos disponibles que puedes canjear en este instante conmigo o a través del app directamente.  Saludos, " + x.NombreLider;

     
                }else{
                    mensaje = "https://api.whatsapp.com/send?phone=593" + x.Celular1 + "&text=Hola, " + x.Nombre1 +
                    "  Aquí puedes ver nuestras más recientes novedades https://appsaved.lineadirectaec.com/glod/ para realizar tus compras en el app de Glod." +
                    " Saludos, " + x.NombreLider;

     
                }

               
                this.mensage = mensaje

               
                
                setTimeout(() => {
                    window.open( mensaje, "_blank");
                }, 500);       
            }   

        });

    })
    }

    loadEventQuickSearch() {
        this.filteredProduct = this.productCtrl.valueChanges.pipe(
            debounce(() => timer(500)),
            startWith(""),
            map((state) =>
                state ? this._filterStates(state) : this.ListClientes.slice()
            ) // )
        );
    }

    private _filterStates(value: string) {
        const filterValue = value.toLowerCase();

        return this.ListClientes.filter((state) =>
            state.RazonSocial.toLowerCase().includes(filterValue)
        );
    }

}
