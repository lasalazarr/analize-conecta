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
import { E_TipoDocumento } from 'app/Models/E_TipoDocumento';
import { UserService } from 'app/ApiServices/UserService';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import _ from 'lodash';


export interface DialogData {
    Nit: string;

}

@Component({
    selector: 'solicitud-fisica',
    templateUrl: 'solicitud-fisica.component.html',
    styleUrls: ['solicitud-fisica.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class SolicitudFisicaComponent implements OnInit {
    TextColor: any
    Nit: string
    ListTipoDocumento: E_TipoDocumento[];

    public WalletResp: E_Wallet = new E_Wallet()
    qualityList = []
    formSolicitud: FormGroup;
    messageError: string;
    constructor(
        public dialogRef: MatDialogRef<SolicitudFisicaComponent>,
        private bottomSheet: MatBottomSheet,
        private PedidoService: PedidoService,
        public dialog: MatDialog,
        private communicationService: CommunicationService,
        @Inject(MAT_DIALOG_DATA) public data: InformacionCreditos,
        private clienteService: ClienteService,
        private formBuilder: FormBuilder,
        private adminservice: AdminService,
        private userService: UserService,
        private parameterService: ParameterService,
        private ClienteService: ClienteService
    ) { }


    ngOnInit() {
        let sessionUser = this.userService.GetCurrentCurrentUserNow()
        this.formSolicitud = new FormGroup({

            NumeroCedula: new FormControl(null, Validators.required),

        });
    }




    guardarDocumentos() {
        this.messageError = ""

        var objClienteResquest: E_Cliente = new E_Cliente()
        objClienteResquest.Nit = this.formSolicitud.value.NumeroCedula;
        this.ClienteService.ConsultaExisteEmpresariaNombre(objClienteResquest).subscribe((x: E_Cliente) => {
            console.log(x)
            if (!_.isNil(x) && !_.isNil(x.Nit)) {
                this.inscripcion(x)
            }
            else {
                this.messageError = "Cliente inexistente "
            }
        })
    }


    inscripcion(input: E_Cliente) {
        let inputSolicitud = new SolicitudCredito();
        inputSolicitud.Cedula = this.formSolicitud.value.NumeroCedula
        inputSolicitud.NombreEmpresaria = input.RazonSocial.trim();
        inputSolicitud.EsFisico = true
        this.adminservice.RegistrarSolicitudCredito(inputSolicitud).subscribe(x => {
            this.communicationService.showLoader.next(false)
            const ref = this.dialog.open(ModalPopUpComponent, {
                panelClass: 'dialogInfocustom',
                width: '450px',
                data: { TipoMensaje: "Ok", Titulo: "Cambio Clave", Mensaje: "Su solicitud ha sido guardada con éxito" }
            });
            ref.afterClosed().subscribe(() => { this.dialogRef.close() })
        })
    }
}
