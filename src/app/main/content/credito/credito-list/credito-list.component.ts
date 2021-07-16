import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSelectChange } from '@angular/material';
import { AdminService } from 'app/ApiServices/AdminService';
import { InformacionCreditos } from 'app/Models/InformacionCreditos';
import _ from 'lodash';
import { DetalleSolicitudCredito } from './detalle-solicitud-credito/detalle-solicitud-credito.component';
import { SolicitudFisicaComponent } from './solicitud-fisica/solicitud-fisica.component';

@Component({
    selector: 'app-credito-list',
    templateUrl: './credito-list.component.html',
    styleUrls: ['./credito-list.component.scss']
})
export class CreditoListComponent implements OnInit {
    ListCredits: Array<InformacionCreditos>;
    tipoConsulta = [
        { Nombre: "cedula", value: 1 },

        {
            Nombre: "fecha", value: 2
        },

        {
            Nombre: "Gestionado", value: 3
        },
        {
            Nombre: "Fisico", value: 4
        },

    ]
    EsFisico
    FechaFin
    TipoSeleccionado = 1
    Cedula: string;
    FechaInicio: string;
    mensaje: string;
    gestionado: boolean;
    constructor(private adminService: AdminService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {

    }


    search() {
        this.mensaje = ""
        let input = new DtoCredito()
        input.FechaFin = this.FechaFin
        input.FechaInicio = this.FechaInicio
        input.gestionado = this.gestionado
        input.cedula = this.Cedula
        input.EsFisico = this.EsFisico
        this.adminService.ObtenerSolicitudesCredito(input).subscribe(x => {
            this.ListCredits = x
            if (x.length == 0) {
                this.mensaje = "No se encuentran registros para la busqueda realizada"

            }

        })
    }

    cambiarTipo(event: MatSelectChange) {

        this.FechaFin = null
        this.FechaInicio = null
        this.Cedula = null
        this.gestionado = null
        this.EsFisico = null
        if (event.value == 3) {
            this.gestionado = false
        }
        if (event.value == 4) {
            this.EsFisico = false
        }
    }
    openDetalleSocilitud(item) {
        const ref = this.dialog.open(DetalleSolicitudCredito, {
            panelClass: '',
            width: '450px',
            data: item
        });
        ref.afterClosed().subscribe((x) => {
            if (!_.isNil(x) && !_.isNil(x.Id)) {
                let itemFinded = this.ListCredits.find(item => item.Id == x.Id)
                itemFinded.CLASIFICACIONC = x.CLASIFICACIONC
                itemFinded.Observacion = x.Observacion
                itemFinded.Gestionado = x.Gestionado
                itemFinded.plazo_credito = x.plazo_credito
                itemFinded.cupo_asignado = x.cupo_asignado
                itemFinded.DOCOMPLETA = x.DOCOMPLETA
                itemFinded.ESCREDITO = x.ESCREDITO
                itemFinded.NSOLICITUD = x.NSOLICITUD


            }
        })
    }

    enviaWhatsapp(item: InformacionCreditos) {
        let mensaje = ""
        let safariWindow = window.open("https://www.whatsapp.com");
        const anulado = "r";
        const listClai = ["AAA", "AA", "A", "ANL", "R"]
        const clasificalitionfinded = item.CLASIFICACIONC.toLowerCase() === anulado || !listClai.some(x => x.toLowerCase() === item.CLASIFICACIONC.toLowerCase())
            ? "Rechazado" : "Aprobado";

        mensaje = "https://api.whatsapp.com/send?phone=593" + item.celular1.trim() + "&text=Hola, " +
            "Estimada " + item.NombreCompleto + " tu crédito fue " + clasificalitionfinded

        setTimeout(() => {
            safariWindow.location.href = mensaje
        }, 500);

    }
    create() {
        const ref = this.dialog.open(SolicitudFisicaComponent, {
            panelClass: '',
            width: '450px',
            disableClose: false,
            hasBackdrop: true

        });
        ref.afterClosed().subscribe((x) => {
            if (!_.isNil(x) && !_.isNil(x.Id)) {
            }
        })

    }
}

export class DtoCredito {
    public FechaInicio: string
    public FechaFin: string
    public cedula: string
    public gestionado: boolean
    EsFisico: boolean;
}


