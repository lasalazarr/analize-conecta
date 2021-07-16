import { Component, Inject,ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { E_CxC } from 'app/Models/E_CxC';
import { RegistroPagoComponent } from '../RegistroPago/registropago.component';


export interface DialogData {
    Titulo: string;
    Mensaje: string;
    TipoMensaje: string;
    NumeroPedidoReservado: string;
    FechaCreacion: string;
    Nit: string;
    BotonPago: boolean;
}

@Component({
  selector: 'detallecarteralider',
  templateUrl: 'detallecarteralider.component.html',
  styleUrls: ['detallecarteralider.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class DetalleCarteraLiderComponent implements OnInit {
  TextColor: any
  constructor(
    public dialogRef: MatDialogRef<DetalleCarteraLiderComponent>,
    public dialog: MatDialog,
    /* conflicto @Inject(MAT_BOTTOM_SHEET_DATA) public data2: DialogData, */
    @Inject(MAT_DIALOG_DATA) public data: E_CxC) { }

  ngOnInit() {

   /* if (this.data.TipoMensaje == 'Error') {
      this.TextColor = 'blue';
    }
    else {
      this.TextColor = 'green';
    }*/

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
    openRegistroPago(factura:string, Nit: string): void {
        const dialogRef = this.dialog.open(RegistroPagoComponent, {
            //width: '550px',
            panelClass: 'knowledgebase-article-dialog',
            data: {
                Pedido: factura , Cedula:Nit
            }
        });
    }      
}
