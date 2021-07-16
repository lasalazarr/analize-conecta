import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { detallepfactuComponent } from '../detallepfactu/detallepfactu.component';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { debounce, startWith, map } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CambiosComponent } from '../cambios/cambios.component';


@Component({
    moduleId: module.id,
    selector: 'pedidosfacturados',
    templateUrl: 'pedidosfacturados.component.html',
    styleUrls: ['pedidosfacturados.component.scss']
})
export class pedidosfacturadoscomponent implements OnInit {
    displayedColumns = ['Numero', 'Factura', 'Fecha', 'Nit', 'NombreEmpresaria', 'NombreVendedor','NombreEstado'];
    dataSource: MatTableDataSource<E_PedidosCliente>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListPedidos: Array<E_PedidosCliente> = new Array<E_PedidosCliente>()
    productCtrl = new FormControl();
    filteredProduct: Observable<E_PedidosCliente[]>;;

    constructor(public dialog: MatDialog,
        private PedidoService: PedidoService,
        private communicationService: CommunicationService,
        private UserService: UserService) {

    }

    ngOnInit() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        var objPedidos: E_PedidosCliente = new E_PedidosCliente()
        this.communicationService.showLoader.next(true);
        if (this.SessionUser.IdGrupo === '52') {
            objPedidos.Zona = this.SessionUser.IdZona;
            objPedidos.Nit = undefined;
            objPedidos.IdLider = undefined;
        } else if (this.SessionUser.IdGrupo === '60') {
            objPedidos.Zona = undefined;
            objPedidos.Nit = undefined;
            objPedidos.IdLider = this.SessionUser.IdLider;
        }else if (this.SessionUser.IdGrupo == '50' || this.SessionUser.IdGrupo == '59' || 
        this.SessionUser.IdGrupo == '80'|| 
        this.SessionUser.IdGrupo == '99'){
            objPedidos.Zona = undefined;
            objPedidos.IdLider = undefined;
            objPedidos.Nit = this.SessionUser.Cedula
        }

        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        objPedidos.Campana = this.SessionUser.Campana;
        this.PedidoService.ListxGerenteZonaFacturados(objPedidos)
            .subscribe((x: Array<E_PedidosCliente>) => {
                this.ListPedidos = x

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.ListPedidos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.communicationService.showLoader.next(false);
                this.loadEventQuickSearch()

            })
    }

    openResumenPedido(row: E_PedidosCliente): void {
        this.communicationService.showLoader.next(true);
        this.PedidoService.ObtenerPedidoxId(row.Numero.trim())
            .subscribe((x: E_PedidosCliente) => {
                    x.NombreEstado= row.NombreEstado;
                const dialogRef = this.dialog.open(detallepfactuComponent, {
                    panelClass: 'knowledgebase-article-dialog',
                    data: x
                });

                dialogRef.afterClosed().subscribe(result => {
                });
                this.communicationService.showLoader.next(false);

            })


    }


    makeChanges(row: E_PedidosCliente){
        const dialogRef = this.dialog.open(CambiosComponent, {
            panelClass: 'dialogInfocustom',
            width: '95vw',
            data: row
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
    getTotalSaldo() {
        return this.ListPedidos.map(t => t.Valor + t.IVA).reduce((acc, value) => acc + value, 0);
    }

    loadEventQuickSearch() {
        this.filteredProduct = this.productCtrl.valueChanges
            .pipe(
                debounce(() => timer(500)),
                startWith(''),
                map(state => state ? this._filterStates(state) : this.ListPedidos.slice())// )
            );
    }

    private _filterStates(value: string) {
        const filterValue = value.toLowerCase();

        return this.ListPedidos.filter(state =>
            state.Numero.toLowerCase().includes(filterValue)
            || state.Nit.toLowerCase().includes(filterValue)
            || state.NombreEmpresaria.toLowerCase().includes(filterValue)
            || state.Factura.toLowerCase().includes(filterValue)
            || state.NombreVendedor.toLowerCase().includes(filterValue)
            || state.NombreEstado.toLowerCase().includes(filterValue)


        );
    }
}