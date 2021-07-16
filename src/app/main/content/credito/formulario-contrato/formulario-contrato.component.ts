import { Component, OnInit } from '@angular/core';
import { E_Provincia } from 'app/Models/E_Provincia';
import { E_TipoDocumento } from 'app/Models/E_TipoDocumento';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { E_Canton } from 'app/Models/E_Canton';
import { E_Parroquia } from 'app/Models/E_Parroquia';
import { UserService } from 'app/ApiServices/UserService';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { E_Cliente } from 'app/Models/E_Cliente';
import { forkJoin } from 'rxjs';
import { PdfInscripcion } from 'app/Models/PdfInscripcion';
import { MatSelectChange } from '@angular/material';
import _ from 'lodash';
import { PdfContrato } from 'app/Models/PdfContrato';
import moment from 'moment';
import { NombreMes } from 'app/Enums/Enumerations';


@Component({
    selector: 'app-formulario-contrato',
    templateUrl: './formulario-contrato.component.html',
    styleUrls: ['./formulario-contrato.component.scss']
})
export class FormularioContratoComponent implements OnInit {

    form = new FormGroup({
        CiudadContrato: new FormControl("", Validators.required),
        Nacionalidad: new FormControl("", Validators.required),
        NombreCompleto: new FormControl("", Validators.required),
        DireccionCompleta: new FormControl("", Validators.required),
        Cedula: new FormControl(""),
        FechaContrato: new FormControl("", Validators.required),
    })

    constructor(private userService: UserService) { }


    ngOnInit() {
    }


    enviarFormulario() {

        let pdfObj = new PdfContrato()
        pdfObj.CiudadContrato = this.form.controls.CiudadContrato.value;
        pdfObj.Nacionalidad = this.form.controls.Nacionalidad.value;
        pdfObj.NombreCompleto = this.form.controls.NombreCompleto.value;
        pdfObj.DireccionCompleta = this.form.controls.DireccionCompleta.value;
        pdfObj.Cedula = this.form.controls.Cedula.value;
        pdfObj.DiasContrato = moment(this.form.controls.FechaContrato.value).format("DD");
        pdfObj.MesContrato = NombreMes.find(x => x.Valor == moment(this.form.controls.FechaContrato.value).month()).Nombre;
        pdfObj.AnoContrato = moment(this.form.controls.FechaContrato.value).format("YY");
        pdfObj.MesNumero = String(moment(this.form.controls.FechaContrato.value).month() + 1)
        
        this.userService.ImprimirContrato(pdfObj).subscribe(x => {
            var newBlob = new Blob([x], { type: "application/pdf" });
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }
            const data = window.URL.createObjectURL(newBlob);
            var link = document.createElement('a');
            link.href = data;
            link.download = "Contrato.pdf";
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });

    }


}
