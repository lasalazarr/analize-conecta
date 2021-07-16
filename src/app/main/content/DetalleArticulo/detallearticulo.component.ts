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
import { DetallePedidoComponent } from '../DetallePedido/detallepedido.component';
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
    TipoMensaje: string;
    PorcentajeDescuento: number;
    PrecioPuntos: number;
    Disponible: string;
    PrecioEmpresaria: number;
    CarpetaImagenes: string;
    TipoEnvio: string;
    CodCiudadDespacho: string;
    PrecioCatalogoSinIVA: number;
    PrecioEmpresariaSinIVA: number;
    IVAPrecioEmpresaria: number;
    IVAPrecioCatalogo: number;
    PorcentajeIVA: number;
    ExcentoIVA: boolean;
    PuntosGanados: number;
    ValorFleteCobrar: number;
    ClienteFinal: string;
    Bodega: string;
    PuntoEnvio: string;
    DatosEnvioSeleccionado: string
    Inventario: number
}

@Component({
    selector: 'detallearticulo',
    templateUrl: 'detallearticulo.component.html',
    styleUrls: ['detallearticulo.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class DetalleArticuloComponent implements OnInit {
    TextColor: any
    form: FormGroup;
    public SessionEmpresaria: E_SessionEmpresaria = new E_SessionEmpresaria()

    public Cantidad: number = 1;
    lodash = _
    public SessionUser: E_SessionUser = new E_SessionUser()
    ValorUnitario: number;
    public privilegio : string;
    public esprovilegio: boolean;

    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private ExceptionErrorService: ExceptionErrorService,
        private UserService: UserService,
        private DetallePedidoService: DetallePedidoService,
        private bottomSheet: MatBottomSheet,
        private bottomSheetRef: MatBottomSheetRef<DetalleArticuloComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData) {

        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()


        this.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow();
        data.CarpetaImagenes = this.SessionEmpresaria.CarpetaImagenes;



    }



    ngOnInit() {
        this.ValorUnitario = this.data.ValorUnitario

        if(this.SessionUser.Privilegio=='True'){
            this.esprovilegio= true;
         } else{
            this.esprovilegio= false;
            }
        
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
    onAdicionarArticulo(): void {

        var DetallePedido: E_PLU = new E_PLU()

        var CantidadDisponible = this.form.value.Cantidad;
        if (this.data.Disponible == "SI") {
            DetallePedido.Disponible = true;
        }
        else {
            CantidadDisponible = 0;
            DetallePedido.Disponible = false;
        }

        if (this.data.ExcentoIVA == true) {
            this.data.IVAPrecioCatalogo = 0;
            this.data.IVAPrecioEmpresaria = 0;
        }

        var PrecioCatIVA = (this.data.PrecioCatalogoSinIVA + this.data.IVAPrecioCatalogo);
        var PrecioEmpre = PrecioCatIVA - (PrecioCatIVA * (this.data.PorcentajeDescuento / 100));

        DetallePedido.CodigoRapido = this.data.CodigoRapido;
        DetallePedido.NombreProducto = this.data.NombreProductoCompleto;
        DetallePedido.PrecioConIVA = Number((PrecioCatIVA * Number(this.form.value.Cantidad)).toFixed(2));
        DetallePedido.PorcentajeDescuento = this.data.PorcentajeDescuento;
        DetallePedido.Cantidad = CantidadDisponible;//*this.form.value.Cantidad;
        DetallePedido.PrecioCatalogoTotalConIVA = Number(this.form.value.Cantidad) * PrecioCatIVA;
        DetallePedido.PrecioEmpresaria = Number((PrecioEmpre * Number(this.form.value.Cantidad)).toFixed(2));
        DetallePedido.PrecioEmpresariaCons = PrecioEmpre;
        DetallePedido.PrecioPuntos = Number(this.form.value.Cantidad) * Number(this.data.PrecioPuntos);
        DetallePedido.PLU = this.data.PLU;

        DetallePedido.PrecioCatalogoSinIVA = this.data.PrecioCatalogoSinIVA * Number(this.form.value.Cantidad);
        DetallePedido.PrecioEmpresariaSinIVA = this.data.PrecioEmpresariaSinIVA; // Siempre debe ser * cantidad = 1
        DetallePedido.IVAPrecioCatalogo = this.data.IVAPrecioCatalogo * Number(this.form.value.Cantidad);
        DetallePedido.IVAPrecioCatalogoCons = this.data.IVAPrecioCatalogo;//jj
        DetallePedido.IVAPrecioEmpresaria = this.data.IVAPrecioEmpresaria; // Siempre debe ser * cantidad = 1
        DetallePedido.PorcentajeIVA = this.data.PorcentajeIVA;
        DetallePedido.ExcentoIVA = this.data.ExcentoIVA;

        DetallePedido.PuntosGanados = Math.floor((this.data.PuntosGanados - (this.data.PuntosGanados * (this.data.PorcentajeDescuento / 100))) * Number(this.form.value.Cantidad));
        DetallePedido.CantidadPedida = Number(this.form.value.Cantidad);

        this.DetallePedidoService.SetCurrentDetallePedido(DetallePedido);

        this.bottomSheetRef.dismiss();
        this.openBottomSheet();
    }

    //MRG: POR AQUI SIEMPRE ENTRA PARA ADICIONAR ARTICULO TBN CAMBIAR CODIGO DE PEDIDOS PRINCIPAL MISMO METODO openBottomSheet().
    openBottomSheet(): void {
        //this.bottomSheet.open(DetallePedidoComponent);

        this.bottomSheet.open(DetallePedidoComponent, {
            panelClass: 'bottomStyleSheet', //MRG: poner este para el style del popup.
            data: {
                TipoMensaje: "Error", Titulo: "Detalle Pedido", Mensaje: "Detalle del Pedido.", TipoEnvio: this.data.TipoEnvio, CodCiudadDespacho: this.data.CodCiudadDespacho, ValorFleteCobrar: this.data.ValorFleteCobrar,
                ClienteFinal: this.data.ClienteFinal, Bodega: this.data.Bodega, PuntoEnvio: this.data.PuntoEnvio, showButtonSend: (!_.isNil(this.data.DatosEnvioSeleccionado) && !_.isEmpty(this.data.DatosEnvioSeleccionado))
            }
        });

    }

    CalacularResta(): void {
        if ((this.form.value.Cantidad - 1) > 0) {
            this.Cantidad = this.form.value.Cantidad - 1;
        }
        else {

            this.Cantidad = 1;
        }

    }

    CalcularSuma(): void {
        this.Cantidad = this.form.value.Cantidad + 1;
    }

    onNoClick(): void {
        this.bottomSheetRef.dismiss();
    }

}
