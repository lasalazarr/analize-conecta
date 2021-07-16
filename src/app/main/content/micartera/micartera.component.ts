import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { CxCService } from 'app/ApiServices/CxCService';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { E_CxC } from 'app/Models/E_CxC';
import { detallepfactuComponent } from '../detallepfactu/detallepfactu.component';

@Component({
    moduleId: module.id,
    selector: 'micartera',
    templateUrl: 'micartera.component.html',
    styleUrls: ['micartera.component.scss']
})
export class micarteracomponent implements OnInit {
    displayedColumns = [ 'Codigolider','Lider', 'Saldo'];
    dataSource: MatTableDataSource<E_CxC>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListCxC: Array<E_CxC> = new Array<E_CxC>()

    constructor(public dialog: MatDialog,
        private CxCService: CxCService,
        private UserService: UserService) {       

    }

    ngOnInit() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        var objCxC: E_CxC = new E_CxC()
        objCxC.Vendedor = this.SessionUser.IdVendedor;
        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        //objCxC.Vendedor = "0008";
        this.CxCService.ListCxCDirector(objCxC)
            .subscribe((x: Array<E_CxC>) => {
                this.ListCxC = x

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.ListCxC);
                this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
            })
    }

    openResumenPedido(row: E_PedidosCliente): void {
        const dialogRef = this.dialog.open(detallepfactuComponent, {
            //width: '550px',
            panelClass: 'knowledgebase-article-dialog',
            data: row
        });       

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            //this.Mensaje = result; //AQUI RECIBE LOS DATOS DEL POPUP CERRADO. OJO PARA PEDIDO.
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
}