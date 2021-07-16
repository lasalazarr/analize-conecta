import { Component, ViewChild, OnInit , ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ResumenPedidoComponent } from '../ResumenPedido/resumenpedido.component';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { DetallePedidosComponent } from '../DetallePedidos/detallepedidos.component';
import { TableUtil } from "../MisPedidos/tableUtils";
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { debounce, startWith, map } from 'rxjs/operators';

import * as XLSX from 'xlsx';
import { FormControl } from '@angular/forms';
import { timer, Observable } from 'rxjs';



@Component({
    moduleId: module.id,
    selector: 'mispedidosanulados',
    templateUrl: 'mispedidosanulados.component.html',
    styleUrls: ['mispedidosanulados.component.scss']
})

export class MisPedidosAnuladosComponent implements OnInit {
    displayedColumns: string []= ['Fecha','Numero', 'Nit', 'NombreEmpresaria','Valor'];
    dataSource: MatTableDataSource<E_PedidosCliente>;
    columnsToDisplay: string[] = this.displayedColumns.slice();
    
    
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

   
    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListPedidos: Array<E_PedidosCliente> = new Array<E_PedidosCliente>()
    productCtrl = new FormControl();
    filteredProduct: Observable<E_PedidosCliente[]>;;

    constructor(public dialog: MatDialog,
        private PedidoService: PedidoService,
        private bottomSheet: MatBottomSheet,
        private communicationService: CommunicationService,
        private UserService: UserService) {

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
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        var objPedidos: E_PedidosCliente = new E_PedidosCliente()
        objPedidos.IdVendedor = this.SessionUser.IdVendedor;
        objPedidos.Nit = this.SessionUser.Cedula;
        objPedidos.Campana = this.SessionUser.Campana;
        objPedidos.IdLider = this.SessionUser.IdLider ;

        
        this.communicationService.showLoader.next(true);

        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        if (this.SessionUser.IdGrupo == "50" || this.SessionUser.IdGrupo == "80"
        || this.SessionUser.IdGrupo == "99") {
            this.PedidoService.PedidosAnuladosListEmpresaria(objPedidos)
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
        else  if (this.SessionUser.IdGrupo == "52") {
        this.PedidoService.PedidosAnuladosListDirector(objPedidos)
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
        else  if (this.SessionUser.IdGrupo == "60") {
            this.PedidoService.PedidosAnuladosListLider(objPedidos)
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
    }

    getTotalSaldo() {
        return this.ListPedidos.map(t => t.Valor+t.IVA).reduce((acc, value) => acc + value, 0);
      }
    openResumenPedido(row: E_PedidosCliente): void {
        this.bottomSheet.open(DetallePedidosComponent, {
            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
            data: { TipoMensaje: "Error", Titulo: "Detalle Pedido Anulado", Mensaje: "Detalle del Pedido Anulado.", NumeroPedidoReservado:  row.Numero ,FechaPedido : row.FechaCreacion }
          });       

      
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


        );
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
  
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data , {header:['Numero', 'Valor']});
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'test');
  
          XLSX.writeFile(wb, fileName);
    }





}