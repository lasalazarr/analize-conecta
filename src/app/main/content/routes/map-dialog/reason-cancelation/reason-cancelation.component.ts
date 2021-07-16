import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-reason-cancelation',
  templateUrl: './reason-cancelation.component.html',
  styleUrls: ['./reason-cancelation.component.scss']
})
export class ReasonCancelationComponent implements OnInit {

  reasonCancelation: any;
  genericsReasons: any[] = [
    { value: 1, text: "Direccion Incorrecta" },
    { value: 2, text: "Error en Georeferencia" },
    { value: 3, text: "Cliente no contesta se pone alistado" },
    { value: 4, text: "No hay quien reciba" },
    { value: 5, text: "Cliente ya no desea recibir el catálogo" }, 
    { value: 6, text: "Cliente desea catátogo digital" }, 
    { value: 7, text: "Número telefónico incorrecto" },
    { value: 8, text: "Cliente retira en Punto Glod" }, 
    { value: 9, text: "Cliente ya recibio catálogo en pedido" } 
  ];

  constructor(
    public dialogRef: MatDialogRef<ReasonCancelationComponent>
  ) { }

  ngOnInit() {
  }

  cancelar(){
    this.dialogRef.close(this.reasonCancelation);
  }
  
  cerrar(){
    this.dialogRef.close();
  }
}
