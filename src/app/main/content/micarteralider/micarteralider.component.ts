import { Component,ViewEncapsulation, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog,MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialogRef } from '@angular/material';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { CxCService } from 'app/ApiServices/CxCService';
import { E_CxC } from 'app/Models/E_CxC';
import { DetalleCarteraLiderComponent } from '../DetalleMiCarteraLider/detallecarteralider.component';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
export interface DialogData {
   
    Cedula: string;

}

@Component({
    moduleId: module.id,
    selector: 'micarteralider',
    templateUrl: 'micarteralider.component.html',
    styleUrls: ['micarteralider.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class micarteralidercomponent implements OnInit {
    displayedColumns = [ 'Nombre', 'Numero','Fecha', 'Deuda'];
    dataSource: MatTableDataSource<E_CxC>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListCxC: Array<E_CxC> = new Array<E_CxC>()

    constructor(public dialog: MatDialog,
        confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>,
        private CxCService: CxCService,
        private communicationService: CommunicationService,
        private bottomSheetRef: MatBottomSheetRef<micarteralidercomponent>,
        private UserService: UserService,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData) {       

    }

    ngOnInit() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        var objCxC: E_CxC = new E_CxC()
  
            objCxC.Nit= this.data.Cedula;
        
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

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}