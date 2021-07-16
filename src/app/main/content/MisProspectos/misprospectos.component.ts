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
import _ from "lodash";
import moment from "moment";
import { debounce, startWith, map } from "rxjs/operators";
import { timer, Observable } from "rxjs";
import { FormControl } from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: "misprospectos",
    templateUrl: "misprospectos.component.html",
    styleUrls: ["misprospectos.component.scss"],
})
export class MisProspectosComponent implements OnInit {
    displayedColumns = ["imagenEmpresaria", "NombreCompleto", "RemainingDays"];
    dataSource: MatTableDataSource<E_Cliente>;
    columnsToDisplay: string[] = this.displayedColumns.slice();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public SessionUser: E_SessionUser = new E_SessionUser();
    public ListClientes: Array<E_Cliente> = new Array<E_Cliente>();

    productCtrl = new FormControl();
    filteredProduct: Observable<E_Cliente[]>;
    chat: string;
    constructor(
        public dialog: MatDialog,
        private ClienteService: ClienteService,
        private UserService: UserService,
        private communicationService: CommunicationService
    ) {}

    ngOnInit() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow();
        var objCliente: E_Cliente = new E_Cliente();
        objCliente.Vendedor = this.SessionUser.IdVendedor;
        objCliente.Lider = this.SessionUser.IdLider;
        objCliente.IdEstadosCliente = 0;

        this.communicationService.showLoader.next(true);
        if (this.SessionUser.IdGrupo === "52") {
            this.ClienteService.ListEmpresariasxGerentexEstado(
                objCliente
            ).subscribe((x: Array<E_Cliente>) => {
                _.forEach(x, (eventos) => {
                    var a = moment(new Date());
                    var b = moment(eventos.FechaIngreso);
                    eventos.RemainingDays = a.diff(b, "days");
                });
                this.ListClientes = x;
                this.dataSource = new MatTableDataSource(this.ListClientes);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.communicationService.showLoader.next(false);
                this.loadEventQuickSearch();
            });
        } else if (this.SessionUser.IdGrupo === "60") {
            this.ClienteService.ListEmpresariasxLiderEstado(
                objCliente
            ).subscribe((x: Array<E_Cliente>) => {
                _.forEach(x, (eventos) => {
                    var a = moment(new Date());
                    var b = moment(eventos.FechaIngreso);
                    eventos.RemainingDay = a.diff(b, "days");
                });
             
                this.ListClientes = x;
                this.dataSource = new MatTableDataSource(this.ListClientes);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.communicationService.showLoader.next(false);
                this.loadEventQuickSearch();
            });
        }
    }

    openDetalleCliente(row: E_Cliente): void {
        this.communicationService.showLoader.next(true);
        this.ClienteService.ObtenerClientexNit(row.Nit.trim())
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

    llamarEmpresaria(item: E_Cliente) {

        this.ClienteService.ObtenerClientexNit(item.Nit.trim())
        .subscribe((x: E_Cliente) => {
           
            var a = moment(new Date());
            var b = moment(x.UltimaCompra);
            x.RemainingDays = a.diff(b, "days");

       

        let mensaje;
        let mensajeFijo =
            "https://api.whatsapp.com/send?phone=593" +
            x.Celular1 +
            "&text=";
        if (x.RemainingDays <= 7) {
            mensaje =
                x.Nombre1 +
                ", Soy tu asesor de ventas Glod y estaré en linea para atender tus primeros pasos en tu negocio.    Saludos, " +
                x.NombreLider;
        } else if (x.RemainingDays > 7 && x.RemainingDays <= 14) {
            mensaje =
                x.Nombre1 +
                ", ¿Sabes como realizar tu primer pedido en nuestra app? Estoy en linea para guiar tus primeros paso en Glod.  Si aun no la descargas ingresa a www.glodtm.com.ec  Saludos, " +
                x.NombreLider;
        } else if (x.RemainingDays > 14) {
            mensaje =
                x.Nombre1 +
                ", ¡Estás a un solo paso! visita nuestro catálogo interactivo Glod https://appsaved.lineadirectaec.com/glod/  y comparte a tus familiares, amigos y contactos a través de tu whatsapp, " +
                x.NombreLider;
        }
        window.open(mensajeFijo + mensaje, "_blank");
    })
    }
}
    