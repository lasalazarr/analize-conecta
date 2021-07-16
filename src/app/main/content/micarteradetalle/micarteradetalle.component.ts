
import { Component,Inject,ViewEncapsulation, ViewChild, OnInit , ElementRef} from '@angular/core';
import { MatPaginator,MatDialogRef, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA,MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { CxCService } from 'app/ApiServices/CxCService';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { E_CxC } from 'app/Models/E_CxC';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { CommunicationService } from 'app/ApiServices/CommunicationService';


import * as XLSX from 'xlsx';
import { DetalleCarteraLiderComponent } from '../DetalleMiCarteraLider/detallecarteralider.component';

export interface DialogData {
    
    CedulaEmpresaria: string;
    NombreEmpresaria : string;
    BotonPago: boolean;
  }

@Component({
    moduleId: module.id,
    selector: 'micarteradetalle',
    templateUrl: 'micarteradetalle.component.html',
    styleUrls: ['micarteradetalle.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MiCarteraDetalleComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    displayedColumns: string []= [  'Numero','Fecha', 'Saldo'];
    dataSource: MatTableDataSource<E_CxC>;
    columnsToDisplay: string[] = this.displayedColumns.slice();

    public botonpago: boolean = false;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

   private CedulaEmpresaria: string
    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListCxC: Array<E_CxC> = new Array<E_CxC>()

    constructor(public dialog: MatDialog,
        private CxCService: CxCService,
        private bottomSheet: MatBottomSheet,
        private communicationService: CommunicationService,
        private bottomSheetRef: MatBottomSheetRef<MiCarteraDetalleComponent>,
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
        var objCxC: E_CxC = new E_CxC()
  
            objCxC.Nit= this.data.CedulaEmpresaria;
        
        this.communicationService.showLoader.next(true);

        
        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        //objCxC.Vendedor = "0008";
        this.CxCService.ListCxCLider(objCxC)
            .subscribe((x: Array<E_CxC>) => {
                this.ListCxC = x

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(x);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.communicationService.showLoader.next(false);

            })
    }
    getTotalSaldo() {
        return this.ListCxC.map(t => t.Saldo).reduce((acc, value) => acc + value, 0);
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

    openResumenPedido(row: E_CxC): void {
        const dialogRef = this.dialog.open(DetalleCarteraLiderComponent, {
            //width: '550px',
            
            panelClass: 'knowledgebase-article-dialog',
            data: row  
        });       

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            //this.Mensaje = result; //AQUI RECIBE LOS DATOS DEL POPUP CERRADO. OJO PARA PEDIDO.
        });
    }

    Close(){
        this.bottomSheetRef.dismiss();

    }

}