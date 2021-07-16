import { Component, Inject, ViewEncapsulation, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { E_Wallet } from 'app/Models/E_Wallet';
import { PedidoService } from 'app/ApiServices/PedidoService';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { InformacionCreditos } from 'app/Models/InformacionCreditos';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'app/ApiServices/AdminService';
import { SolicitudCredito } from 'app/Models/SolicitudCredito';
import { ModalPopUpComponent } from 'app/main/content/ModalPopUp/modalpopup.component';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { Subject } from 'rxjs';
import { ClienteService } from 'app/ApiServices/ClienteService';


export interface DialogData {
    Nit: string;

}

@Component({
    selector: 'edit-credit-document',
    templateUrl: 'edit-credit-document.component.html',
    styleUrls: ['edit-credit-document.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class EditCreditDocumentComponent implements OnInit {
    TextColor: any
    Nit: string
    public WalletResp: E_Wallet = new E_Wallet()
    qualityList = []
    form: FormGroup;
    formImage: FormGroup
    constructor(
        public dialogRef: MatDialogRef<EditCreditDocumentComponent>,
        private bottomSheet: MatBottomSheet,
        private PedidoService: PedidoService,
        public dialog: MatDialog,
        private communicationService: CommunicationService,
        @Inject(MAT_DIALOG_DATA) public data: InformacionCreditos,
        private clienteService: ClienteService,
        private formBuilder: FormBuilder,
        private adminservice: AdminService
    ) { }


    ngOnInit() {

        this.formImage = new FormGroup({
            Documento: new FormControl(null, Validators.required),

        });
    }

    uploadFileAndSetPreview(event, fieldname) {
        const file = event.target.files[0]

        if (file) {


            this.formImage.patchValue({
                [fieldname]: file
            });

            this.formImage.get(fieldname).updateValueAndValidity();

            const reader = new FileReader();
            reader.onload = () => {
                // this.preview = reader.result as string;
                // this.preview = this.sanitizer.bypassSecurityTrustUrl(reader.result as string) as string;
            }
            reader.readAsDataURL(file)

        } else {
            this.formImage.patchValue({
                file: ''
            });
            this.formImage.get(fieldname).updateValueAndValidity();
        }
    }


    guardarDocumentos() {


        let subjectRequest = new Subject()
        let counter = 0;
        let extensions = {}
        const controls = Object.keys(this.formImage.controls)
        controls.forEach(x => {
            let file = this.formImage.controls[x].value
            extensions[x] = '.' + file.name.split(".")[1].toLowerCase();
            this.clienteService.GuardarArchivoFTP(this.data.Cedula + this.data.typeUpdateDocument, file).subscribe((x) => {
                if (x) {
                    counter++
                }
                if (counter >= controls.length) {
                    subjectRequest.next(true)
                }
            })
        })

        this.communicationService.showLoader.next(true)
        subjectRequest.subscribe(() => {
            debugger
            let inputSolicitud = new SolicitudCredito();
            inputSolicitud.Cedula = this.data.Cedula
            inputSolicitud.Id = this.data.Id
            const repo = "https://www.lineadirectaec.com/lineadirectaec.com/imagenes/"
            let stringDocument = repo + this.data.Cedula + this.data.typeUpdateDocument + extensions["Documento"]

            switch (this.data.typeUpdateDocument) {
                case "CedulaDelantera":
                    inputSolicitud.DocumentoCedulaDelantera = stringDocument
                    break;
                case "CedulaTrasera":
                    inputSolicitud.DocumentoCedulaTrasera = stringDocument

                    break;
                case "Servicios":
                    inputSolicitud.DocumentoServicios = stringDocument
                    break;
                case "Contrato":
                    inputSolicitud.DocumentoContrato = stringDocument
                    break;
                case "Inscripcion":
                    inputSolicitud.DocumentoInscripcion = stringDocument
                    break;
                default:
                    break;
            }

            this.adminservice.ActualizarDocumentoCredito(inputSolicitud).subscribe(x => {
                this.communicationService.showLoader.next(false)
                const ref = this.dialog.open(ModalPopUpComponent, {
                    panelClass: 'dialogInfocustom',
                    width: '450px',
                    data: { TipoMensaje: "Ok", Titulo: "Atención", Mensaje: "actualización realizada" }
                });
                ref.afterClosed().subscribe(() => { this.dialogRef.close() })
            })
        })

    }
}
