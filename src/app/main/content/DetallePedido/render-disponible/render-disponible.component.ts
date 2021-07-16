import { Component } from '@angular/core';
import { DetallePedidoService } from 'app/ApiServices/DetallePedidoService';
import { E_PLU } from 'app/Models/E_PLU';
import { DetallePedidoComponent } from '../detallepedido.component';

@Component({
    moduleId: module.id,
    selector: 'render-disponible',
    templateUrl: 'render-disponible.component.html',
    styleUrls: ['render-disponible.component.scss']
})
export class RenderDisponibleComponent  {
    params;
    resultDialog:any;
    DisponibleUp: boolean = false;
    DisponibleDown: boolean = false;
    constructor(
        private DetallePedidoService: DetallePedidoService
        ) {
    }

    agInit(params): void {    
    
        this.params = params;
        
        if(this.params.data.Disponible==true)
        {
            this.DisponibleUp  = true;
            this.DisponibleDown = false;
        }
        else    
        {
            this.DisponibleUp  = false;
            this.DisponibleDown = true;

        }
   }

  
}
