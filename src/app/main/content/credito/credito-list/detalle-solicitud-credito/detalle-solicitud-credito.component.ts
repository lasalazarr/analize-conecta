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
import { EditCreditDocumentComponent } from '../edit-credit-document/edit-credit-document.component';

import { DatePipe } from '@angular/common';

export interface DialogData {
    Nit: string;

}

@Component({
    selector: 'detalle-solicitud-credito',
    templateUrl: 'detalle-solicitud-credito.component.html',
    styleUrls: ['detalle-solicitud-credito.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class DetalleSolicitudCredito implements OnInit {
    TextColor: any
    Nit: string
    public WalletResp: E_Wallet = new E_Wallet()
    qualityList = []
    form: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<DetalleSolicitudCredito>,
        private bottomSheet: MatBottomSheet,
        private PedidoService: PedidoService,
        public dialog: MatDialog,
        private adminService: AdminService,
        @Inject(MAT_DIALOG_DATA) public data: InformacionCreditos,
        private formBuilder: FormBuilder,
        private datepipe: DatePipe
    ) { }


    ngOnInit() {
        console.log(this.data)
        this.qualityList = ["AAA", "AA", "A", "ANL", "R"]
        this.form = this.formBuilder.group({
            quality: [undefined, [Validators.required]],
            observation: [undefined,],
            gestionado: [undefined,],
            plazo_credito: [undefined,],
            cupo_asignado: [undefined,],
            DOCOMPLETA: [undefined,],
            ESCREDITO: [undefined,],
            NSOLICITUD: [undefined,],

        });
        this.form.controls.quality.setValue(this.data.CLASIFICACIONC.trim())
        this.form.controls.observation.setValue(this.data.Observacion)
        this.form.controls.gestionado.setValue(this.data.Gestionado)
        this.form.controls.plazo_credito.setValue(this.data.plazo_credito)

        this.form.controls.cupo_asignado.setValue(this.data.cupo_asignado)

        this.form.controls.DOCOMPLETA.setValue(this.data.DOCOMPLETA)

        this.form.controls.ESCREDITO.setValue(this.data.ESCREDITO)

        this.form.controls.NSOLICITUD.setValue(_.isNil(this.data.NSOLICITUD) ? "" : this.data.NSOLICITUD.trim())
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    open(pdf) {
        window.open(pdf);

    }

    SaveQualificafication() {
        const inputSolicitud = new SolicitudCredito();
        inputSolicitud.Cedula = this.data.Cedula
        inputSolicitud.CLASIFICACIONC = this.form.controls.quality.value
        inputSolicitud.Observacion = this.form.controls.observation.value
        inputSolicitud.Gestionado = this.form.controls.gestionado.value
        inputSolicitud.plazo_credito = this.form.controls.plazo_credito.value
        inputSolicitud.cupo_asignado = this.form.controls.cupo_asignado.value
        inputSolicitud.DOCOMPLETA = this.form.controls.DOCOMPLETA.value
        inputSolicitud.ESCREDITO = this.form.controls.ESCREDITO.value
        inputSolicitud.NSOLICITUD = this.form.controls.NSOLICITUD.value



        this.adminService.ActualizarCalificacionCredito(inputSolicitud).subscribe((x) => {
            if (x) {
                const ref = this.dialog.open(ModalPopUpComponent, {
                    panelClass: 'dialogInfocustom',
                    width: '450px',
                    data: { TipoMensaje: "Ok", Titulo: "Atención", Mensaje: "Se registro la Actualización de calificación!" }
                });
                ref.afterClosed().subscribe(() => this.dialogRef.close(
                    {
                        Id: this.data.Id,
                        CLASIFICACIONC: inputSolicitud.CLASIFICACIONC,
                        Observacion: inputSolicitud.Observacion,
                        Gestionado: inputSolicitud.Gestionado,
                        plazo_credito: inputSolicitud.plazo_credito,
                        cupo_asignado: inputSolicitud.cupo_asignado,
                        DOCOMPLETA: inputSolicitud.DOCOMPLETA,
                        ESCREDITO: inputSolicitud.ESCREDITO,
                        NSOLICITUD: inputSolicitud.NSOLICITUD,

                    }))

                    this.enviaWhatsapp(inputSolicitud)
            }

        })
    }

    editDocument(type: string) {
        let input = _.cloneDeep(this.data)
        input.typeUpdateDocument = type
        const ref = this.dialog.open(EditCreditDocumentComponent, {
            panelClass: '',
            width: '450px',
            data: input
        });
        ref.afterClosed().subscribe((x) => {
            if (!_.isNil(x) && !_.isNil(x.Id)) {

            }
        })
    }


    enviaWhatsapp(item: SolicitudCredito) {
        let mensaje = ""
        let safariWindow = window.open("https://www.whatsapp.com");
        const anulado = "r";
        const listClai = ["AAA", "AA", "A", "ANL", "R"]
        const clasificalitionfinded = item.CLASIFICACIONC.toLowerCase() === anulado || !listClai.some(x => x.toLowerCase() === item.CLASIFICACIONC.toLowerCase())
            ? "Rechazado" : "Aprobado";

        mensaje = "https://api.whatsapp.com/send?phone=593" + this.data.celular1.trim() + "&text=" + this.GenerarTexto(item)

        setTimeout(() => {
            safariWindow.location.href = mensaje
        }, 500);

    }

    GenerarTexto(item: SolicitudCredito) {
        const anulado = "r";
        const listClai = ["AAA", "AA", "A", "ANL", "R"]
        const clasificalitionfinded = item.CLASIFICACIONC.toLowerCase() === anulado || !listClai.some(x => x.toLowerCase() === item.CLASIFICACIONC.toLowerCase())
            ? "Rechazado" : "Aprobado";


        let textoRechazado = "Crédito Rechazado , Estimada/o Cliente. Glod le informa que se ha gestionado su solicitud de Crédito, siendo su estado RECHAZADO." +
            "Lamentamos este resultado y le recordamos que usted puede realizar una nueva Solicitud después de haber transcurrido 6 meses," +
            "recuerde que puede realizar sus compras de Contado con los mismos beneficios."

        let textoAprobado = " Crédito Aprobado No." + this.data.Id.toString() + "  Estimada/o Cliente, Glod le informa que se ha gestionado su solicitud de Crédito, siendo su estado APROBADO." +
            "Favor tome en cuenta la siguiente información antes de realizar su primer pedido. " +
            "Fecha de activación: " + this.datepipe.transform(new Date(), 'short') +
            ", Valor: $" + item.cupo_asignado + ", Plazo: " + item.plazo_credito + " días, Monto mínimo de pedido: $50, 00" +
            "Adicional :" + item.Observacion

        return clasificalitionfinded == "Aprobado" ? textoAprobado : textoRechazado
    }











}
