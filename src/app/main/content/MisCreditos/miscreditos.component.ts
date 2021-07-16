import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ResumenPedidoComponent } from '../ResumenPedido/resumenpedido.component';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { CommunicationService } from 'app/ApiServices/CommunicationService';

import { DetalleClienteComponent } from '../DetalleCliente/detallecliente.component';
import { E_Cliente } from 'app/Models/E_Cliente';
import { ClienteService } from 'app/ApiServices/ClienteService';
import * as XLSX from 'xlsx';
import { debounce, startWith, map } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'miscreditos',
    templateUrl: 'miscreditos.component.html',
    styleUrls: ['miscreditos.component.scss']
})

export class MisCreditosComponent implements OnInit {
    displayedColumns: string[] = ['Fecha', 'NombreEmpresariaCompletoBusqueda', 'ClasificacionC', 
    'NombreEstadosCliente', 'Cupo_credito', 'NombreLider'];
    dataSource: MatTableDataSource<E_Cliente>;
    columnsToDisplay: string[] = this.displayedColumns.slice();

    form: FormGroup;
    formErrors: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public EstadoSeleccionado: string ="";

    public ListEstado: Array<Object> = [
        { IdEstado: "A", Nombre: 'APROBADO' },
        { IdEstado: "P", Nombre: 'DOCUMENTACIÓN PENDIENTE' },
        { IdEstado: "R", Nombre: 'RECHAZADA' },
    ];
    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListClientes: Array<E_Cliente> = new Array<E_Cliente>()

    productCtrl = new FormControl();
    filteredProduct: Observable<E_Cliente[]>;;


    
    constructor(public dialog: MatDialog,
        private formBuilder: FormBuilder,
        private ClienteService: ClienteService,
        private UserService: UserService,
        private communicationService: CommunicationService,
        private router: Router) {
            this.formErrors = {

                Estado: {}
             
            };


    }

    addColumn() {
        const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
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
            this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
            this.columnsToDisplay[randomIndex] = temp;
        }
    }
    ngOnInit() {
        this.form = this.formBuilder.group({

            Estado: [undefined, undefined]
         

        });



        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        var objCliente: E_Cliente = new E_Cliente()
        objCliente.Vendedor = this.SessionUser.IdVendedor;
        objCliente.Lider = this.SessionUser.IdLider;
        objCliente.CodEstado = "%%";
        this.communicationService.showLoader.next(true);

        if (this.SessionUser.IdGrupo == "52") {
            this.ClienteService.ListadoClientesCredito(objCliente)
                .subscribe((x: Array<E_Cliente>) => {
                    this.ListClientes = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientes);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.communicationService.showLoader.next(false);
                    this.loadEventQuickSearch()

                })
        }
        else if (this.SessionUser.IdGrupo == "60") {
            this.ClienteService.ListadoClientesCreditoLider(objCliente)
                .subscribe((x: Array<E_Cliente>) => {
                    this.ListClientes = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientes);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.communicationService.showLoader.next(false);
                    this.loadEventQuickSearch()
                })
        }
    }


    
    SelectedEstado(y: { value: string; }) {

        var objCliente: E_Cliente = new E_Cliente()
        objCliente.Vendedor = this.SessionUser.IdVendedor;
        objCliente.Lider = this.SessionUser.IdLider;
        objCliente.CodEstado = y.value ;
        this.communicationService.showLoader.next(true);

        if (this.SessionUser.IdGrupo == "52") {
            this.ClienteService.ListadoClientesCredito(objCliente)
                .subscribe((x: Array<E_Cliente>) => {
                    this.ListClientes = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientes);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.communicationService.showLoader.next(false);
                    this.loadEventQuickSearch()

                })
        }
        else if (this.SessionUser.IdGrupo == "60") {
            this.ClienteService.ListadoClientesCreditoLider(objCliente)
                .subscribe((x: Array<E_Cliente>) => {
                    this.ListClientes = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientes);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;

                    this.communicationService.showLoader.next(false);
                    this.loadEventQuickSearch()
                })
        }   }
    loadEventQuickSearch() {
        this.filteredProduct = this.productCtrl.valueChanges
            .pipe(
                debounce(() => timer(500)),
                startWith(''),
                map(state => state ? this._filterStates(state) : this.ListClientes.slice())// )
            );
    }

    private _filterStates(value: string) {
        const filterValue = value.toLowerCase();

        return this.ListClientes.filter(state =>
            state.NombreLider.toLowerCase().includes(filterValue)
            || state.Nit.toLowerCase().includes(filterValue)
            || state.NombreEstadosCliente.toLowerCase().includes(filterValue)
            || state.NombreEmpresariaCompletoBusqueda.toLowerCase().includes(filterValue)


        );
    }
    
    getTotalSaldo() {
        return this.ListClientes.map(t => t.Cupo_credito).reduce((acc, value) => acc + value, 0);
    }
    openDetalleCliente(row: E_Cliente): void {
        const dialogRef = this.dialog.open(DetalleClienteComponent, {
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


    exportToExcel() {
        const fileName = 'test.xlsx';

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data, { header: ['Numero', 'Valor'] });
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'test');

        XLSX.writeFile(wb, fileName);
    }





}