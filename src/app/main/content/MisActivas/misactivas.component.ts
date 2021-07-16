import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DetalleClienteComponent } from '../DetalleCliente/detallecliente.component';
import { E_Cliente } from 'app/Models/E_Cliente';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import moment from 'moment';
import _ from 'lodash';


@Component({
    moduleId: module.id,
    selector: 'misactivas',
    templateUrl: 'misactivas.component.html',
    styleUrls: ['misactivas.component.scss']
})
export class MisActivasComponent implements OnInit {
    displayedColumns = ['imagenEmpresaria', 'NombreCompleto'];
    dataSource: MatTableDataSource<E_Cliente>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListClientes: Array<E_Cliente> = new Array<E_Cliente>()


    constructor(public dialog: MatDialog,
        private ClienteService: ClienteService,
        private UserService: UserService,
        private communicationService: CommunicationService) {


    }

    ngOnInit() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        var objCliente: E_Cliente = new E_Cliente()
        objCliente.Vendedor = this.SessionUser.IdVendedor;
        objCliente.Lider = this.SessionUser.IdLider;
        objCliente.CodEstado = "'1','2','6','7'";

        this.communicationService.showLoader.next(true);
        if (this.SessionUser.IdGrupo == "52") {
            this.ClienteService.ListEmpresariasActivasxGerenteSimple(objCliente)
                .subscribe((x: Array<E_Cliente>) => {
                    this.ListClientes = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientes);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.communicationService.showLoader.next(false);
                })
        }
        else if (this.SessionUser.IdGrupo == "60") {
            this.ClienteService.ListEmpresariasxLiderActivas(objCliente)
                .subscribe((x: Array<E_Cliente>) => {
                    
                    this.ListClientes = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientes);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.communicationService.showLoader.next(false);
                })
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
}