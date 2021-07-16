import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_PLU } from 'app/Models/E_PLU';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from 'app/ApiServices/UserService';
import { DetallePedidoService } from 'app/ApiServices/DetallePedidoService';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
import { DetallePedidosComponent } from '../DetallePedidos/detallepedidos.component';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { IfStmt } from '@angular/compiler';
import _ from 'lodash';

export interface DialogData {
    CodigoRapido: string;
    NombreProductoCompleto: string;
    NombreProd: string;
    Color: string;
    Talla: string;
    ValorUnitario: number;
    NombreImagen: string;
    PLU: number;
    Titulo: string;
    Mensaje: string;
    PrecioPuntos: number;
    Disponible: string;
    PrecioEmpresaria: number;
    PrecioCatalogoSinIVA: number;
    PrecioEmpresariaSinIVA: number;
    IVAPrecioEmpresaria: number;
    IVAPrecioCatalogo: number;
    PorcentajeIVA: number;
    ExcentoIVA: boolean;
    PuntosGanados: number;

}

@Component({
    selector: 'imagenarticulo',
    templateUrl: 'imagenarticulo.component.html',
    styleUrls: ['imagenarticulo.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class ImagenArticuloComponent implements OnInit {
    TextColor: any
    form: FormGroup;
    public SessionEmpresaria: E_SessionEmpresaria = new E_SessionEmpresaria()

    public Cantidad: number = 1;
    lodash = _
    public SessionUser: E_SessionUser = new E_SessionUser()
    ValorUnitario: number;

    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private ExceptionErrorService: ExceptionErrorService,
        private UserService: UserService,
        private DetallePedidoService: DetallePedidoService,
        private bottomSheet: MatBottomSheet,
        public dialogRef: MatDialogRef<ImagenArticuloComponent>,

        @Inject(MAT_DIALOG_DATA) public data: DialogData) {

        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()


        this.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow();
        



    }



    ngOnInit() {
        this.ValorUnitario = this.data.ValorUnitario
        /* if (this.data.TipoMensaje == 'Error') {
           this.TextColor = 'blue';
         }
         else {
           this.TextColor = 'green';
         }*/

        this.form = this.formBuilder.group({
            Cantidad: [undefined, [Validators.required]],


        });



    }
    CalcularTotales() {

    }
 


    onNoClick(): void {
        this.dialogRef.close();
    }

}
