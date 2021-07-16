import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewChecked, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import _ from 'lodash';
import { E_Cliente } from 'app/Models/E_Cliente';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { UserService } from 'app/ApiServices/UserService';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';
import { MatDialog, MatDialogRef, MatSelect, MAT_DIALOG_DATA, MatSelectChange, MatBottomSheet } from '@angular/material';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { E_PedidosDetalleCliente } from 'app/Models/E_PedidosDetalleCliente';
import { E_PLU } from 'app/Models/E_PLU';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { DatosEnvioComponent, ReturnsData } from '../DatosEnvio/datosenvio.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { PoliticasComponent } from './politicas/politicas.component';

@Component({
    moduleId: module.id,
    selector: 'cambios',
    templateUrl: 'cambios.component.html',
    styleUrls: ['cambios.component.scss'],
})
export class CambiosComponent implements OnInit {
    @ViewChild('color') _matOptionDiv: MatSelect;
    @ViewChild('changeItem') _matOptionchangeItemDiv: MatSelect;

    @ViewChild('changeItemNew') _matOptionchangeItemNewDiv: MatSelect;

    lodash = _
    // Horizontal Stepper
    optionsChanges = [
        { value: 1, description: "DEFECTO DE FÁBRICA" }, { value: 2, description: "DEFECTO DE USO" }, { value: 3, description: "CAMBIO DE TALLA" }

    ]

    itemChanges: Array<E_PedidosDetalleCliente> = new Array<E_PedidosDetalleCliente>();
    reason: any
    hideDropdown = false
    hideDropdownitemChanges = false;
    hideDropdownitemNewChanges = false;
    itemNewChanges: E_PLU[] = [];
    itemNewChangeSelected: E_PLU
    E_PedidosDetalleCliente
    itemChangeSelected: E_PedidosDetalleCliente
    SessionEmpresaria: E_SessionEmpresaria;
    ListBodega = []
    NumeroDocumento: string;
    SessionUser: E_SessionUser;
    datosEnvio: ReturnsData;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private formBuilder: FormBuilder,
        private clienteService: ClienteService,
        private userService: UserService,
        private bottomSheet: MatBottomSheet,
        public dialogRef: MatDialogRef<CambiosComponent>,
        private communicationService: CommunicationService,
        private dialog: MatDialog,
        private pedidoService: PedidoService,
        @Inject(MAT_DIALOG_DATA) public data: any

    ) {

    }
    ngOnInit(): void {
        this.SessionUser = this.userService.GetCurrentCurrentUserNow()
        this.NumeroDocumento = String(this.data.Nit).trim()
        this.pedidoService.ListDetallePedidoCambio(this.data.Numero.trim()).subscribe(x => { this.itemChanges = x })
        this.ValidateDocument()
    }

    positionDropDown() {
        this.hideDropdown = true
        setTimeout(() => {
            this._matOptionDiv.open()
        }, 300);

    }
    positionDropDownitemChanges() {
        this.hideDropdownitemChanges = true
        setTimeout(() => {
            this._matOptionchangeItemDiv.open()
        }, 300);
    }
    positionDropDownitemNewChanges() {
        this.hideDropdownitemNewChanges = true
        setTimeout(() => {
            this._matOptionchangeItemNewDiv.open()
        }, 300);
    }

    closedItem($event) {
        if (!$event) {
            this.hideDropdownitemChanges = false
            this.hideDropdown = false
            this.hideDropdownitemNewChanges = false
        }
    }

    selectCloth(selection: MatSelectChange) {
        console.log(
            selection.value)
        const input = new E_PLU();
        input.Campana = this.userService.GetCurrentCurrentUserNow().Campana
        input.Referencia = String(selection.value.Referencia).trim()

        this.pedidoService.ListCatalogoxCambio(input).subscribe((x) => {
            this.itemNewChanges = x
        })
        this.itemNewChangeSelected = null

    }

    selectNewCloth() {

    }

    ValidateDocument() {
        try {
            this.communicationService.showLoader.next(true);
            sessionStorage.removeItem("CurrentDetallePedido");
            var objClienteResquest: E_Cliente = new E_Cliente()
            objClienteResquest.Nit = this.NumeroDocumento;
            var UsuarioInicioSesion: E_SessionUser = new E_SessionUser();
            UsuarioInicioSesion = this.userService.GetCurrentCurrentUserNow();
            objClienteResquest.Vendedor = UsuarioInicioSesion.IdVendedor;
            this.clienteService.ValidaExisteEmpresariaNombre(objClienteResquest).subscribe((x: E_SessionEmpresaria) => {
                this.communicationService.showLoader.next(false)
                if (x.Error == undefined) {
                    this.SessionEmpresaria = this.userService.GetCurrentCurrentEmpresariaNow()
                    this.ListBodega.push(this.SessionEmpresaria.Bodegas);
                }
            });
        }
        catch (error) {
            this.communicationService.showLoader.next(false)

            //---------------------------------------------------------------------------------------------------------------
        }
    }


    openDatosEnvio(): void {

        let documentEmpresaria = this.NumeroDocumento;
        //Si se encuentra la empresaria se abre la ventana, sino no se puede abrir.
        if (!_.isNil(documentEmpresaria) && !_.isEmpty(documentEmpresaria)) {




            const dialogRef = this.bottomSheet.open(DatosEnvioComponent,
                {
                    panelClass: 'bottomStyleSheet', //MRG: poner este para el style del popup.
                    data: {
                        Nit: documentEmpresaria,
                        Zona: this.SessionUser.IdZona,
                        EmpresariaLider: this.SessionEmpresaria.Empresaria_Lider,
                        TipoMensaje: "Error",
                        Titulo: "Datos Envío",
                        Mensaje: "Seleccione el metodo de envío.",
                        ListBodega: this.ListBodega,
                    }
                }
            )

            dialogRef.afterDismissed().subscribe((result: ReturnsData) => {
                this.datosEnvio = result
            });

        }
    }

    EnviarCambio() {
        if (!_.isNil(this.itemNewChangeSelected) && !_.isNil(this.NumeroDocumento) && !_.isNil(this.datosEnvio)) {

            this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, { panelClass: 'dialogInfocustom' });
            this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar esta acción?';
            this.confirmDialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.communicationService.showLoader.next(true);
                    this.dialogRef.close()
                    this.pedidoService.CreacionPedidoCambio(this.NumeroDocumento, this.data.Numero.trim(), this.itemNewChangeSelected.PLU, this.datosEnvio.Bodega, this.datosEnvio.IdDireccionXUsuario, this.datosEnvio.IdTipoEnvio)
                        .subscribe((x) => {
                            this.communicationService.showLoader.next(false);
                            if (!_.isNil(x) && !_.isNil(x.Numero)) {

                                this.dialog.open(ModalPopUpComponent, {
                                    panelClass: 'dialogInfocustom',
                                    width: '450px',
                                    data: { TipoMensaje: "", Titulo: "Atención", Mensaje: "cambio ejecutado nuevo pedido " + x.Numero }
                                });

                            } else {
                                this.dialog.open(ModalPopUpComponent, {
                                    panelClass: 'dialogInfocustom',
                                    width: '450px',
                                    data: { TipoMensaje: "Error", Titulo: "Atención", Mensaje: "Error al ejecutar el cambio." }
                                });
                            }

                        })

                }
                this.confirmDialogRef = null;
            });

        }
        else {
            this.dialog.open(ModalPopUpComponent, {
                panelClass: 'dialogInfocustom',
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Atención", Mensaje: "Porfavor diligenciar Datos." }
            });

        }

    }


    OpenPolitics() {
        this.dialog.open(PoliticasComponent, {
            panelClass: 'dialogInfocustom',
            width: '450px',
        });
    }
}

