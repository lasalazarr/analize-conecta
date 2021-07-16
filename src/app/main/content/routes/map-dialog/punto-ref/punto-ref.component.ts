import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-punto-ref',
  templateUrl: './punto-ref.component.html',
  styleUrls: ['./punto-ref.component.scss']
})
export class PuntoRefComponent implements OnInit {

  puntoReferencia:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PuntoRefComponent>) { }

  ngOnInit() {
    this.puntoReferencia = this.data;
  }

  ok() {
    this.dialogRef.close(this.puntoReferencia);
  }

}
