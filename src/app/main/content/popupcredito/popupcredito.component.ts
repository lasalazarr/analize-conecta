import { Component, OnInit, Inject } from '@angular/core';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EstadosPedidoEnum } from 'app/Enums/Enumerations';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';

@Component({
    selector: 'app-popupcredito',
    templateUrl: './popupcredito.component.html',
    styleUrls: ['./popupcredito.component.scss']
})
export class PopupcreditoComponent implements OnInit {
    tokenInput: string;
    existeError: boolean =false;;
    descripcionError: string;
    constructor(
        public dialogRef: MatDialogRef<PopupcreditoComponent>,
        private clienteService: ClienteService,
        private pedidoService: PedidoService,
        @Inject(MAT_DIALOG_DATA) public data) { }

    ngOnInit() {
    }

    validartoken() {
        this.clienteService.ValidarToken(this.tokenInput, this.data.nit).subscribe(x => {
            if(!x.existError){
                this.actualizarPedido(this.data.nroPedido);
                this.dialogRef.close(true)
            }else{
              this.existeError = x.existError;
              this.descripcionError = x.Descripcion;
            }
        }
        )
    }
    actualizarPedido(nroPedido: string){
        let pedido = new E_PedidosCliente;
        pedido.Numero = nroPedido;
        pedido.IdEstado = EstadosPedidoEnum.Procesado;
        this.pedidoService.ActualizarPedido(pedido).subscribe(x=>{
            console.log(x,"PedidoActualizado");
        })
    }

}
