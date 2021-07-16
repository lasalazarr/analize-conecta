import { Component, Inject, ViewEncapsulation, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { E_Wallet } from 'app/Models/E_Wallet';
import { PedidoService } from 'app/ApiServices/PedidoService';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { InformacionCreditos } from 'app/Models/InformacionCreditos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'app/ApiServices/AdminService';
import { SolicitudCredito } from 'app/Models/SolicitudCredito';
import { ModalPopUpComponent } from 'app/main/content/ModalPopUp/modalpopup.component';
import * as _ from 'lodash';

import { DatePipe } from '@angular/common';

export interface DialogData {
    Nit: string;

}

@Component({
    selector: 'detalle-reporte-pedidos',
    templateUrl: 'detalle-reporte-pedidos.component.html',
    styleUrls: ['detalle-reporte-pedidos.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class DetalleReportePedidos implements OnInit {
    TextColor: any
    Nit: string
    public WalletResp: E_Wallet = new E_Wallet()
    qualityList = []
    form: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<DetalleReportePedidos>,
        @Inject(MAT_DIALOG_DATA) public data: any,

    ) { }


    ngOnInit() {
       
    }

  












}
