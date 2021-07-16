import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'app/ApiServices/PedidoService';

@Component({
    selector: 'app-boton-pagos',
    templateUrl: './boton-pagos.component.html',
    styleUrls: ['./boton-pagos.component.scss']
})
export class BotonPagosComponent implements OnInit {
    codigoCompra: string
    constructor(private pedidoService: PedidoService) { }

    ngOnInit() {
      //  this.pedidoService.GetPurchaseCode().subscribe(x => this.codigoCompra = x)
    }

    comprar(){
        window.location.replace("http://localhost:59054/envio_vpos2.aspx");

    }
}
