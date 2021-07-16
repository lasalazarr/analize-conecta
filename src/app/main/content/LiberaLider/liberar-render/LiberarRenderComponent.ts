import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AdminpuntosComponent } from '../../admin/adminpuntos/adminpuntos.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ModalPopUpComponent } from '../../ModalPopUp/modalpopup.component';
import { LiberaLiderComponent } from '../liberalider.component';


@Component({
  selector: 'app-liberar-render',
  templateUrl: './liberar-render.component.html',
  styleUrls: ['./liberar-render.component.scss']
})
export class LiberarRenderComponent implements ICellRendererAngularComp {
  public params: any;
  public activo : boolean
  public checkedd : boolean
  constructor(public dialog: MatDialog) { }



  agInit(params: any): void {
    this.params = params;
    this.activo = this.params.value;
    this.checkedd = this.activo
  }

  public invokeParentMethod() {
    this.params.context.componentParent.methodFromParent(
      `Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`
    );
  }

  refresh(): boolean {
    return false;
  }

  AbrirModal() {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'my-panel',
      data: { data: { objeto: this.params.data, tipoO: 1 } }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.resultado) {
        
      }
    });
  }

  public onChange(event){
    //debugger
      let contexto = this.params.context as LiberaLiderComponent;
      let valoran = this.params.data.Valor

      if(event.checked == true){
        let valorr = contexto.Saldo + this.params.data.Valor
        if(valorr <= 0){
            contexto.Saldo += this.params.data.Valor
            this.params.data[this.params.colDef.field] = event.checked; 
          }else{
           
            this.params.data[this.params.colDef.field] = false; 
            event.checked=false;
            this.activo=false;
            this.checkedd=false;
            event.source._checked = false

            const dialogRef = this.dialog.open(ModalPopUpComponent, {
              width: '450px',
              data: { TipoMensaje: "Exito", Titulo: "Liberacion de pedidos", Mensaje: "Valores seleccionados superan el saldo disponible." }
          });
          }
      }else{
        this.params.data[this.params.colDef.field] = event.checked; 
        contexto.Saldo -= this.params.data.Valor
      }   
  }


  

}
