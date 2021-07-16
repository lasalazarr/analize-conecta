import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { DialogComponent } from 'app/main/content/dialog/dialog.component';
import { Render2CarteraCoorComponent } from '../render2-cartera-coor/render2-cartera-coor.component';



@Component({
  selector: 'app-render-cartera-coor',
  templateUrl: './render-cartera-coor.component.html',
  styleUrls: ['./render-cartera-coor.component.scss']
})
export class RenderCarteraCoorComponent implements ICellRendererAngularComp  {
  public params: any;
  constructor(public dialog: MatDialog) { }

  
  
  agInit(params: any): void {
    
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.methodFromParent(
      `Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`
    );
  }

  refresh(): boolean {
    return false;
  }

  AbrirModal(){
    
    const dialogRef = this.dialog.open(Render2CarteraCoorComponent, {
      panelClass: 'my-panel',
      data: { data: {objeto:this.params.data,tipoO:5}}
    });         
    dialogRef.afterClosed().subscribe(result => {
      if(result.resultado){  
        /*let contexto = this.params.context as PuntosXEstadoComponent
            contexto.cargarParemtrosPuntos()*/
      }
    }); 
  }

}
