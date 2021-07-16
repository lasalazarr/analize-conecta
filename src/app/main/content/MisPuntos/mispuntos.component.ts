import { Component, ViewChild, OnInit , ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { PuntosService } from 'app/ApiServices/PuntosService';

import { E_Puntos } from 'app/Models/E_Puntos';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { MisPuntosDetalleComponent } from '../MisPuntosDetalle/mispuntosdetalle.component';
import { CommunicationService } from 'app/ApiServices/CommunicationService';


import * as XLSX from 'xlsx';
import { debounce, startWith, map } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';
import { FormControl } from '@angular/forms'



@Component({
    moduleId: module.id,
    selector: 'mispuntos',
    templateUrl: 'mispuntos.component.html',
    styleUrls: ['mispuntos.component.scss']
})

export class MisPuntosComponent implements OnInit {
    displayedColumns: string []= [  'NombreEmpresaria','EstadoEmpresaria','PuntosTotal','NombreLider'];
    dataSource: MatTableDataSource<E_Puntos>;
    columnsToDisplay: string[] = this.displayedColumns.slice();

    
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

   
    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListPuntos: Array<E_Puntos> = new Array<E_Puntos>()
    productCtrl = new FormControl();
    filteredProduct: Observable<E_Puntos[]>;;


    constructor(public dialog: MatDialog,
        private PuntosService: PuntosService,
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
        var objPuntos: E_Puntos= new E_Puntos()
        this.communicationService.showLoader.next(true);

        
        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        if (this.SessionUser.IdGrupo == "50" || this.SessionUser.IdGrupo == "99") {
            objPuntos.Vendedor = undefined;
            objPuntos.Nit = this.SessionUser.Cedula;
            objPuntos.Lider = undefined; 
            this.PuntosService.ListPuntosEmpresarias(objPuntos)
            .subscribe((x: Array<E_Puntos>) => {
                this.ListPuntos = x
        
                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.ListPuntos);

                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.communicationService.showLoader.next(false);
                this.loadEventQuickSearch()
            })
        }
        else  if (this.SessionUser.IdGrupo == "52") {
            objPuntos.Vendedor = this.SessionUser.IdVendedor;
            objPuntos.Nit = undefined;
            objPuntos.Lider = undefined; 
        this.PuntosService.ListPuntosEmpresarias(objPuntos)
            .subscribe((x: Array<E_Puntos>) => {
                this.ListPuntos = x

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.ListPuntos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.communicationService.showLoader.next(false);
                this.loadEventQuickSearch()
                
            })
        }
        else  if (this.SessionUser.IdGrupo == "60") {
            objPuntos.Vendedor = undefined;
            objPuntos.Nit = undefined;
            objPuntos.Lider = this.SessionUser.IdLider;
            this.PuntosService.ListPuntosEmpresarias(objPuntos)
            .subscribe((x: Array<E_Puntos>) => {
                this.ListPuntos = x


                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.ListPuntos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.communicationService.showLoader.next(false);
                this.loadEventQuickSearch()
                
         
            })
        }
    }

    getTotalSaldo() {
        return this.ListPuntos.map(t => t.PuntosTotal).reduce((acc, value) => acc + value, 0);
      }
    openResumenPedido(row: E_Puntos): void {
        this.bottomSheet.open(MisPuntosDetalleComponent, {
            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
            data: { TipoMensaje: "Error", Titulo: "Detalle Puntos", Mensaje: "Detalle Puntos.", CedulaEmpresaria:  row.Nit , NombreEmpresaria : row.NombreEmpresaria,
        PuntosTotal: row.PuntosTotal}
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
  
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data , {header:['Numero', 'Valor']});
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'test');
  
          XLSX.writeFile(wb, fileName);
    }


    loadEventQuickSearch() {
        this.filteredProduct = this.productCtrl.valueChanges
            .pipe(
                debounce(() => timer(500)),
                startWith(''),
                map(state => state ? this._filterStates(state) : this.ListPuntos.slice())// )
            );
    }

    private _filterStates(value: string) {
        const filterValue = value.toLowerCase();

        return this.ListPuntos.filter(state =>
            state.EstadoEmpresaria.toLowerCase().includes(filterValue)
            || state.NombreLider.toLowerCase().includes(filterValue)
            || state.NombreEmpresaria.toLowerCase().includes(filterValue)


        );
    }



}