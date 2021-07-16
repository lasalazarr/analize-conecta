import { Component, Inject,ViewEncapsulation, OnInit,Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { E_Wallet } from 'app/Models/E_Wallet';
import { PedidoService } from 'app/ApiServices/PedidoService';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { EdicionEmpresariaComponent } from '../EdicionEmpresaria/edicionempresaria.component';
import { ActualizaEmpresariaEcComponent } from '../ActualizaEmpresariaEc/actualizaempresariaec.component';
import moment from 'moment';


export interface DialogData {
  Nit: string;

}

@Component({
  selector: 'detallecliente',
  templateUrl: 'detallecliente.component.html',
  styleUrls: ['detallecliente.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class DetalleClienteComponent implements OnInit {
  TextColor: any
  Nit: string
  Fechacompra: string;
  editar: boolean;
  public WalletResp: E_Wallet = new E_Wallet()
  constructor(
    public dialogRef: MatDialogRef<DetalleClienteComponent>,
    private bottomSheet: MatBottomSheet,
    private PedidoService: PedidoService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: E_Cliente) { }
   

  ngOnInit() {

    this.editar= false; 

    if (this.data.ClasificacionC!='SIN ' && this.data.CupoAsignado>0)
    {
      this.editar= true
      
    }
   /* if (this.data.TipoMensaje == 'Error') {
      this.TextColor = 'blue';
    }
    else {
      this.TextColor = 'green';
    }*/
    this.Fechacompra= moment(this.data.UltimaCompra).format('D MMMM YYYY'); 
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

 
  openActualizaEmpresaria(Cedula: String,Departamento: string,Ciudad: string): void {
   // this.dialogRef.close();
    this.bottomSheet.open(EdicionEmpresariaComponent, {
        panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
        data: {  Nit: Cedula, Departamento: Departamento, Ciudad: Ciudad }
    });
     
            
    }    
   

   

}
