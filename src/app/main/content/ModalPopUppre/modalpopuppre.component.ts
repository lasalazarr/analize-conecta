import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

export interface DialogData {
    Titulo: string;
    Mensaje: string;
    TipoMensaje: string;
    usuario: string
}

@Component({
    selector: 'modalpopuppre',
    templateUrl: 'modalpopuppre.component.html',
    styleUrls: ['modalpopuppre.component.scss']
})
export class ModalPopUppreComponent implements OnInit {
    TextColor: any
    constructor(
        public dialogRef: MatDialogRef<ModalPopUppreComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    ngOnInit() {

        if (this.data.TipoMensaje == 'Error') {
            this.TextColor = 'red';
        }
        else {
            this.TextColor = 'black';
        }

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
