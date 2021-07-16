
import { Component,Inject,ViewEncapsulation, ViewChild, OnInit , ElementRef} from '@angular/core';
import { MatPaginator,MatDialogRef, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA,MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { PuntosService } from 'app/ApiServices/PuntosService';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { E_Puntos } from 'app/Models/E_Puntos';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { DetallePedidosComponent } from '../DetallePedidos/detallepedidos.component';
import { CommunicationService } from 'app/ApiServices/CommunicationService';

import { debounce, startWith, map } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';

export interface DialogData {
    Titulo: string;
    Mensaje: string;
    TipoMensaje: string;
    CedulaEmpresaria: string;
    NombreEmpresaria : string;
    FechaCreacion: string;
    PuntosTotal: number;
  }

@Component({
    moduleId: module.id,
    selector: 'mispuntosdetalle',
    templateUrl: 'mispuntosdetalle.component.html',
    styleUrls: ['mispuntosdetalle.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MisPuntosDetalleComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    displayedColumns: string []= [ 'Tipo2', 'Campana','Concepto','Cantidad','Numero'];
    dataSource: MatTableDataSource<E_Puntos>;
    columnsToDisplay: string[] = this.displayedColumns.slice();

    
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    productCtrl = new FormControl();
    filteredProduct: Observable<E_Puntos[]>;;
   private CedulaEmpresaria: string
    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListPuntos: Array<E_Puntos> = new Array<E_Puntos>()

    constructor(public dialog: MatDialog,
        private PuntosService: PuntosService,
        private bottomSheet: MatBottomSheet,
        private communicationService: CommunicationService,
        private UserService: UserService,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
        ) {

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
        objPuntos.Nit= this.data.CedulaEmpresaria;
        this.communicationService.showLoader.next(true);

        
        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        
            this.PuntosService.ListDetallePuntosEmpresarias(objPuntos)
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
            state.Campana.toLowerCase().includes(filterValue)
            || state.Concepto.toLowerCase().includes(filterValue)
            || state.Numero.toLowerCase().includes(filterValue)


        );
    }

    getTotalSaldo() {
        return this.ListPuntos.map(t => t.Cantidad).reduce((acc, value) => acc + value, 0);
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

    onNoClick(): void {
        this.dialog.closeAll();
      }


      onClose(): void {
        this.bottomSheet.dismiss();
    }



}