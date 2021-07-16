import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';


export interface DialogData {
    Titulo: string;
    Mensaje: string;
    TipoMensaje: string;

    Numero: string;

    Valor: string;
    Portal: string;
    Zona: string;
    Campana: string;
    Catalogo: string;
    FechaCreacion: string;


    Nit: string;
    NombreEmpresaria: string;
    TotalPrecioCatalogo: number;
    CantidadArticulos: number;
    PuntosPedido: string;
    TusPuntos: number;
    CuantosPuntosUsaras: string;
    TotalPagar: number;
    ValorPuntos: number;
    PrecioEmpresariaTotal: number;
    PrecioPuntosTotal: number;
    MensajeError: string;
    DescuentoPts: number;
    PuntosGanados: number;
    ValorPagarPagoPuntos: number;
    ValorMinimoParaPuntos: number;
    ValorFleteCobrar: number;
    ValorFletePuntosCobrar: number;
    PuntosGastados: number;
}

export interface ReturnsData {
    PuntosUsar: number;
    TotalPagar: number;
    DescuentoPuntos: number;
    EnviandoPedido: boolean;
    PuntosGanados: number;
    ValorPagarPagoPuntos: number;
    AplicarPuntosGanados: boolean;
    PagarFletePuntos: boolean;
}

@Component({
    selector: 'resumenpedido',
    templateUrl: 'resumenpedido.component.html',
    styleUrls: ['resumenpedido.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class ResumenPedidoComponent implements OnInit {

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    TextColor: any
    form: FormGroup;
    formErrors: any;
    SaveInProgress
    public txt_PuntosUsar: number = 0;
    public PuntosGanadosCalculo: number = 0;
    public AplicarPuntosGanados: boolean = true;
    public FechaHora: Date;
    checked: boolean = true;

    public ValorFleteSumar: number = 0;
    public PagarFletePuntosCheck: boolean = false;
    DisableTipoFlete: boolean = false;
    ReservarPedidoBtnOk: boolean = true;;
    public ReturnData: ReturnsData[];

    constructor(private formBuilder: FormBuilder,
        public dialogRef: MatBottomSheetRef<ResumenPedidoComponent>,
        //  private Matdialog: MatDialog, public dialog: MatDialog,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {


        this.form = this.formBuilder.group({
            txt_PuntosUsar: [undefined, [Validators.required]]
        });


    }



    ngOnInit() {
        /* if (this.data.TipoMensaje == 'Error') {
           this.TextColor = 'blue';
         }
         else {
           this.TextColor = 'green';
         }*/

        //-----------------------
        this.PuntosGanadosCalculo = Math.floor(this.data.PuntosGanados);

        //Valor Minimo Para puntos 
        if (this.data.TotalPrecioCatalogo < this.data.ValorMinimoParaPuntos) {
            this.PuntosGanadosCalculo = 0;
            this.AplicarPuntosGanados = false;
        }

        //-----------------------



        this.form = this.formBuilder.group({
            txt_PuntosUsar: [undefined, [Validators.required]],


        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });


        this.formErrors = {
            txt_PuntosUsar: {}
        };

        //-----------------------------------------
        //Fecha Hora
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        this.FechaHora = new Date();
        //-----------------------------------------

        this.data.PuntosGastados = 0;

        //Oculta la opcion de pagar flete con puntos si el tipo flete seleccionado es punto de venta o 0.
        if (this.data.ValorFleteCobrar > 0) {
            this.DisableTipoFlete = true;
        }

    }

    onFormValuesChanged() {

        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    onNoClick(): void {
        this.dialogRef.dismiss();
    }

    ConfirmData() {

        var TotalPagarRet = Number(this.data.TotalPagar);
        var DescuentoPtsRet = Number(this.data.DescuentoPts);

        this.ReturnData = [{
            PuntosUsar: this.data.PuntosGastados, TotalPagar: Number(TotalPagarRet.toFixed(2)),
            DescuentoPuntos: Number(DescuentoPtsRet.toFixed(2)), EnviandoPedido: true,
            PuntosGanados: this.PuntosGanadosCalculo, ValorPagarPagoPuntos: this.data.ValorPagarPagoPuntos,
            AplicarPuntosGanados: this.AplicarPuntosGanados, PagarFletePuntos: this.PagarFletePuntosCheck
        }]
        this.dialogRef.dismiss(this.ReturnData);

    }


    CalcularTotalPagar(): void {

        this.PuntosGanadosCalculo = this.data.PuntosGanados;

        //Calcula el total de puntos gastados + pago de flete con puntos
        if (!this.checked == true) {
            this.data.PuntosGastados = Number(this.form.value.txt_PuntosUsar) + Number(this.data.ValorFletePuntosCobrar);
        }
        else {
            this.data.PuntosGastados = Number(this.form.value.txt_PuntosUsar);
        }

        //Mis puntos deben ser siempre >= a los puntos digitados a usar + pago flete con puntos.
        if (this.data.TusPuntos >= this.data.PuntosGastados) {
            //if (this.data.TusPuntos >= this.form.value.txt_PuntosUsar) {
            this.data.MensajeError = "";
            var ValorPunto = this.data.PrecioEmpresariaTotal / this.data.PrecioPuntosTotal;
            var ValorUsar = 0;
            var TotalPagar = 0;
            var DescuentoPtsTemp = 0;

            //Se valida que si se digitan mas puntos de los necesarios se debe utilizar unicamente los que requiere el pedido.
            if (this.data.PuntosGastados > this.data.PrecioPuntosTotal) {
                ValorUsar = this.data.PrecioPuntosTotal * ValorPunto;
                this.data.DescuentoPts = 0;
                this.data.MensajeError = "INGRESO MAS PUNTOS DE LOS NECESARIOS";
                DescuentoPtsTemp = (this.data.PrecioPuntosTotal / this.data.PrecioPuntosTotal) * 100;

                //Si se paga el pedido completo con puntos no debe sumar puntos ganados.
                this.data.PuntosGanados = 0;
                this.ReservarPedidoBtnOk = false; //deshabilita el boton de reserva sino cumple con puntos.
            }
            else {
                ValorUsar = this.data.PuntosGastados * ValorPunto;
                DescuentoPtsTemp = (this.data.PuntosGastados / this.data.PrecioPuntosTotal) * 100;

                //Si se paga el pedido parcial con puntos sumar puntos ganados * % descuento de puntos.
                var PuntosGanadosTemp = 0;
                PuntosGanadosTemp = Math.floor(this.PuntosGanadosCalculo - (this.PuntosGanadosCalculo * (DescuentoPtsTemp / 100)));
                this.PuntosGanadosCalculo = PuntosGanadosTemp;

                this.ReservarPedidoBtnOk = true;
            }

            TotalPagar = Number((this.data.PrecioEmpresariaTotal - ValorUsar).toFixed(2));

            if (TotalPagar >= 0) {
                this.data.TotalPagar = Number(TotalPagar.toFixed(2));
                this.data.ValorPagarPagoPuntos = Number(TotalPagar.toFixed(2));
            }
            else {
                this.data.TotalPagar = 0;
            }

            this.data.DescuentoPts = Number(DescuentoPtsTemp.toFixed(2));

        }
        else {
            this.txt_PuntosUsar = 0;
            this.data.TotalPagar = Number((this.data.PrecioEmpresariaTotal * 1).toFixed(2));
            this.data.DescuentoPts = 0;
            this.data.MensajeError = "PUNTOS INSUFICIENTES";
            this.ReservarPedidoBtnOk = false; //deshabilita el boton de reserva sino cumple con puntos.
        }


        //Valor Minimo Para puntos 
        if (this.data.TotalPrecioCatalogo < this.data.ValorMinimoParaPuntos) {
            this.PuntosGanadosCalculo = 0;
            this.AplicarPuntosGanados = false;
        }




    }


    changeValue(value) {
        this.checked = !value;
        //alert('entro: ' + this.data.ValorFletePuntosCobrar);

        if (!this.checked == true) {
            this.data.PuntosGastados = Number(this.form.value.txt_PuntosUsar) + Number(this.data.ValorFletePuntosCobrar);
            this.PagarFletePuntosCheck = true;
        }
        else {
            this.data.PuntosGastados = Number(this.form.value.txt_PuntosUsar);
            this.PagarFletePuntosCheck = false;
        }

        //Mis puntos deben ser siempre >= a los puntos digitados a usar + pago flete con puntos.
        if (this.data.TusPuntos >= this.data.PuntosGastados) {
            this.ReservarPedidoBtnOk = true;
            this.data.MensajeError = "";
        }
        else {
            this.ReservarPedidoBtnOk = false;
            this.CalcularTotalPagar();
        }

    }

}
