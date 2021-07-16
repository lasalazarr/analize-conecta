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
    selector: 'modalpopup',
    templateUrl: 'modalpopup.component.html',
    styleUrls: ['modalpopup.component.scss']
})
export class ModalPopUpComponent implements OnInit {
    TextColor: any
    constructor(
        public dialogRef: MatDialogRef<ModalPopUpComponent>,
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
