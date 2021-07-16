import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { DialogComponent } from 'app/main/content/dialog/dialog.component';
import { AdminpuntosComponent } from '../../adminpuntos.component';
import { CarguePuntosComponent } from '../cargue-puntos.component';

@Component({
  selector: 'app-render-cargue-puntos',
  templateUrl: './render-cargue-puntos.component.html',
  styleUrls: ['./render-cargue-puntos.component.scss']
})
export class RenderConceptosComponent implements ICellRendererAngularComp  {
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
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'my-panel',
      data: { data: {objeto:this.params.data,tipoO:2}}
    });         
    dialogRef.afterClosed().subscribe(result => {
      if(result.resultado){  
        let contexto = this.params.context as CarguePuntosComponent
            contexto.cargarParemtrosPuntos()
      }
    }); 
  }

}
