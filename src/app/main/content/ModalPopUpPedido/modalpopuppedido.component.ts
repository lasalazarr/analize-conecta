import { Component, Inject, OnInit, DoCheck, AfterContentInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { DetallePedidosComponent } from '../DetallePedidos/detallepedidos.component';
import _ from 'lodash';
import { PopupcreditoComponent } from '../popupcredito/popupcredito.component';
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';


export interface DialogData {
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;
  FechaHora: string;
  spinerr: boolean;
  Nit: string;
  NombreEmpresaria: string;
  NumeroPedidoReservado: string;
  SaldoPagar: string;
  Valorciva: string;
  Valorsiva: string;
  Valoriva: string;
  Numerooperacion: string;
  codAsoCardHolderWallet: string;
  purchaseVerification: string;
  acquirerId: string;
  idCommerce: string;
  purchaseCurrencyCode: string;
  Nombre1: string;
  Apellido1: string;
  Email: string;
  purchaseAmount: string;
  MontoPagar: number;
  ValorTotalPedido: number;
  ValorComisiont:  number;
  CreditoAprobado: boolean;
}

@Component({
    selector: 'modalpopuppedido',
    templateUrl: 'modalpopuppedido.component.html',
    styleUrls: ['modalpopuppedido.component.scss'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('show', style({
                opacity: 1
            })),
            state('hide', style({
                opacity: 0
            })),

            transition('show => hide', animate('1500ms ease-out')),
            transition('hide => show', animate('1500ms ease-in'))
        ])
    ]
})
export class ModalPopUpPedidoComponent implements OnInit{
    TextColor: any
  
  public reserva1: string;
  public reserva2: string;
  public reserva3: string;
  public reserva6: string;
  public reserva9: string;
  public reserva10: string;
  public ValortotalPedido: number;
  public PedidoNotificado: boolean = false;
  public visibleLocalizacionC: boolean = false;
    show = true;
    IsButtonEnable: boolean = false
    constructor(
        public dialogRef: MatBottomSheetRef<ModalPopUpPedidoComponent>,
        private Router: Router,
        private PedidoService: PedidoService,
        private ClienteService: ClienteService,
        private communicationService: CommunicationService,
        private bottomSheet: MatBottomSheet,
        public dialog: MatBottomSheet,
        public dialog2: MatDialog,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data:DialogData) { }


    get jey() {
        return this.show ? 'show' : "hide";
    }

    ngOnInit() {
        this.reserva2 = !_.isNil(this.data.purchaseAmount) ? this.data.purchaseAmount.trim() : null;
        this.reserva3 = !_.isNil(this.data.Valoriva) ? this.data.Valoriva.trim() : null;
        this.reserva9 = !_.isNil(this.data.Valorsiva) ? this.data.Valorsiva.trim() : null;
        this.reserva10 =!_.isNil(this.data.Valorciva) ? this.data.Valorciva.trim() : null; 
        this.IsButtonEnable = this.data.CreditoAprobado
    }

    onCloseClick(): void {
        this.PedidoService.NotificaPedido(this.data.NumeroPedidoReservado, this.data.ValorTotalPedido).subscribe((x: boolean) => {
            this.PedidoNotificado  = x 
            console.log(this.PedidoNotificado, "this.PedidoNotificado");
    })
        this.Router.navigate(["/principal/"])
        this.dialogRef.dismiss();
    }

    onVerDetalleClick(): void {
        this.PedidoService.NotificaPedido(this.data.NumeroPedidoReservado, this.data.ValorTotalPedido).subscribe((x: boolean) => {
            this.PedidoNotificado  = x 
            console.log(this.PedidoNotificado, "this.PedidoNotificado");
    })
        this.openBottomSheet();
    }

    openBottomSheet(): void {
      
        this.bottomSheet.open(DetallePedidosComponent, {
            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
            data: { TipoMensaje: "Error", Titulo: "Detalle Pedido", Mensaje: "Detalle del Pedido.", NumeroPedidoReservado: this.data.NumeroPedidoReservado }
        });
        this.Router.navigate(["/principal/"])
        // this.dialogRef.dismiss();
    }

    openPopUpCredito() {
        this.PedidoService.NotificaPedido(this.data.NumeroPedidoReservado, this.data.ValorTotalPedido).subscribe((x: boolean) => {
            this.PedidoNotificado  = x 
            console.log(this.PedidoNotificado, "this.PedidoNotificado");
    })

        const dialogRef = this.dialog2.open(PopupcreditoComponent, {
            panelClass: 'dialogInfocustom',
            width: '450px',
            data: { nit: this.data.Nit, nroPedido: this.data.NumeroPedidoReservado }
        });          

          
        this.ClienteService.SolicitarToken(this.data.Nit)
            .subscribe((x) => {
                if (x.existError) 
                    console.error("Ocurrio un error en el envío del token" + x.Descripcion);
            })

            dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog result: ${result}`); 
                if(result) {
                    this.finDePedido();
                }
        });
    }
    finDePedido(){
        const dialogRef = this.dialog2.open(ModalPopUpComponent, {
            panelClass: 'dialogInfocustom',
            width: '450px',
            data: { TipoMensaje: "Ok", Titulo: "Pedido liberado", Mensaje: "Se liberó el pedido exitosamente!" }
        });

        this.Router.navigate(["/principal/"])
        this.dialogRef.dismiss();
    }
  PagarPedido(){
    this.PedidoService.NotificaPedido(this.data.NumeroPedidoReservado, this.data.ValorTotalPedido).subscribe((x: boolean) => {
        this.PedidoNotificado  = x 
        console.log(this.PedidoNotificado, "this.PedidoNotificado");
})
    let falsebutton=  document.getElementById("BotonPagos") 
    if(!_.isNil(falsebutton)){
        falsebutton.click();
    }
  }
}
