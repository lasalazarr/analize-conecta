import { Component } from '@angular/core';
import { DetallePedidoService } from 'app/ApiServices/DetallePedidoService';
import { E_PLU } from 'app/Models/E_PLU';
import { DetallePedidoComponent } from '../detallepedido.component';

@Component({
    moduleId: module.id,
    selector: 'render-delete',
    templateUrl: 'render-delete.component.html',
    styleUrls: ['render-delete.component.scss']
})
export class RenderDeleteComponent  {
    params;
    resultDialog:any;
    PermiteEliminar: boolean = true;
    constructor(
        private DetallePedidoService: DetallePedidoService
        ) {
    }

    agInit(params): void {    
    
        this.params = params;

        if(this.params.data.Disponible==false)
        {
            this.PermiteEliminar  = false;           
        }
       
        
   }

   onClick(): void {
    
       var component =  this.params.context as DetallePedidoComponent
       var xx: E_PLU = this.params.data;
       var restul = this.DetallePedidoService.EliminarItemPedido(xx);;
       component.cargarDatos();
       

    /*const dialogRef = this.dialog.open(DialogParameterComponent, {        
        data: this.params.data
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.resultDialog = result;
      });*/
      // this.params.action(this.params);
   }
}
