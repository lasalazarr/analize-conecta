import { Component, Inject,ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { DetallePedidosComponent } from '../DetallePedidos/detallepedidos.component';


export interface DialogData {
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;
}

@Component({
  selector: 'detallepfactu',
  templateUrl: 'detallepfactu.component.html',
  styleUrls: ['detallepfactu.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class detallepfactuComponent implements OnInit {
  TextColor: any
  muestradevol: boolean;
  muestraaduana: boolean;
  muestradespacho: boolean;
  muestralibero: boolean;
  linktracking: string;

  constructor(
    public dialogRef: MatDialogRef<detallepfactuComponent>,
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_DIALOG_DATA) public data: E_PedidosCliente) { }

  ngOnInit() {
    this.muestradevol= true
    this.muestraaduana= true
    this.muestradespacho= true
    this.muestralibero= true
    this.linktracking= ''
    
    if (this.data.Guia.startsWith('7') || this.data.Guia.startsWith('8')) 
    {
      this.linktracking = 'https://www.servientrega.com.ec/rastreo/guia/'+ this.data.Guia;
      this.data.OperadorLogistico='Servientrega'
    }
    else 
    if  (this.data.Guia.startsWith('W') || this.data.Guia.startsWith('w')) {
      this.linktracking = 'https://app.urbano.com.ec/plugin/etracking/etracking/?guia='+ this.data.Guia;
      this.data.OperadorLogistico='Urbano'
    } 

    if (this.data.MotivoNotaCredito==''){
      this.muestradevol= false;
    }
    if (this.data.NumeroDespacho==''){
      this.muestradespacho= false;
    }
    if (this.data.NumeroAduana==''){
      this.muestraaduana= false;
    }
    if (this.data.UsuarioLibero==''){
      this.muestralibero= false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  openResumenPedido(row: E_PedidosCliente): void {
    this.bottomSheet.open(DetallePedidosComponent, {
        panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
        data: { TipoMensaje: "Error", Titulo: "Detalle Pedido", Mensaje: "Detalle del Pedido.", NumeroPedidoReservado:  row.Numero ,FechaPedido : row.FechaCreacion,
        BotonPago: false }
      });       

  
}

}
