import {
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
    AfterViewChecked,
    Input,
} from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from "@angular/forms";
import _ from "lodash";
import { E_Cliente } from "app/Models/E_Cliente";
import { ClienteService } from "app/ApiServices/ClienteService";
import { UserService } from "app/ApiServices/UserService";
import { Router } from '@angular/router';
import { CommunicationService } from "app/ApiServices/CommunicationService";
import { ModalPopUpComponent } from "../../ModalPopUp/modalpopup.component";
import { MatDialog, MatBottomSheet } from "@angular/material";
import { SeleccionDireccionComponent } from "../seleccion-direccion/seleccion-direccion.component";
import { InfoUpdateDataComponent } from "../info-update-data/info-update-data.component";
import { ActivatedRoute } from "@angular/router";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { mergeMap } from "rxjs/operators";
import { ConfirmAdressComponent } from "@fuse/components/confirm-adress/confirm-adress.component";
declare var google: any;

@Component({
    moduleId: module.id,
    selector: "ubicaciongeneral",
    templateUrl: "ubicaciongeneral.component.html",
    styleUrls: ["ubicaciongeneral.component.scss"],
})
export class UbicacionGeneralComponent implements OnInit {
    @ViewChild(SeleccionDireccionComponent)
    SeleccionDireccion: SeleccionDireccionComponent;
    @Input() cedula: string;
    form: FormGroup;
    lodash = _;

    formErrors = {
        Direccion: null,
        Email: null,
        Celular: null,
    };
    mensageDireccion: string;

    // Horizontal Stepper
    constructor(
        private formBuilder: FormBuilder,
        private clienteService: ClienteService,
        private userService: UserService,
        private communicationService: CommunicationService,
        private dialog: MatDialog,
        private Router: Router,
        private bottomSheet: MatBottomSheet,
        private activatedroute: ActivatedRoute
    ) {
        if (_.isNil(this.cedula) || _.isEmpty(this.cedula)) {
            const user = this.userService.GetCurrentCurrentUserNow();
            this.cedula = user.Cedula;
        }

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            Email: new FormControl("", [
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
            ]),
            Celular: [undefined, undefined],
        });

        this.form.valueChanges.subscribe(() => {
            this.onInfoAddressFormValuesChanged();
        });        
         this.GetInfoEmail();
    }
    public GetInfoEmail() {
        var objCliente: E_Cliente = new E_Cliente();
        objCliente.Nit = this.cedula;
        this.clienteService
            .CargarDireccionTelefono(objCliente)
            .subscribe((x: E_Cliente) => {
                this.form.controls.Celular.setValue(x.Telefono1);
                this.form.controls.Email.setValue(String(x.Email).trim());
            });
    }

    // public GetAddressByOrder(pedido: string) {
    //     this.clienteService
    //         .CargarDireccionTelefonoPedido(pedido)
    //         .subscribe((x: DireccionXUsuario) => {
    //             console.log(x);
    //             this.form.controls.Celular.setValue(x.Telefono1);
    //             this.form.controls.Email.setValue(String(x.Email).trim());
    //         });
    // }

    onInfoAddressFormValuesChanged() {
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

    Guardar() {
        const cliente = new E_Cliente();
        this.mensageDireccion = "";
        if (this.SeleccionDireccion.listaDirecciones.length == 0) {
            this.mensageDireccion =
                "No tienes una dirección Asignada para este tipo";
        } else {
            cliente.Nit = this.cedula;
            cliente.Telefono1 = this.form.controls.Celular.value;
            cliente.Email = this.form.controls.Email.value;

            const confirmDialogRef = this.dialog.open(ConfirmAdressComponent, {
                panelClass: "dialogInfocustom",
            });
            confirmDialogRef.componentInstance.confirmMessage =
                "Verificar la dirección de envio";
            const direccionSeleccionada = this.SeleccionDireccion.listaDirecciones.find((x) => x.Tipo == this.SeleccionDireccion.TipoSelected);
            cliente.CodCiudad = direccionSeleccionada.Ciudad
            cliente.Departamento = direccionSeleccionada.Provincia
            cliente.CodigoParroquia = direccionSeleccionada.CodigoPostal
            cliente.ComoLlegar = direccionSeleccionada.PuntoReferencia
            cliente.IdPedido = this.activatedroute.snapshot.paramMap.get('idPedido');        
            confirmDialogRef.componentInstance.listDireccion = [direccionSeleccionada]
            confirmDialogRef
                .afterClosed()
                .pipe(
                    mergeMap((result) => {
                        if (result) {
                            this.communicationService.showLoader.next(true);
                            return this.clienteService.ActualizarDireccionTelefono(
                                cliente
                            );
                        }
                    })
                )
                .subscribe((client) => {
                    let info;
                    if (_.isNil(client.Error)) {
                        info = {
                            TipoMensaje: "",
                            Titulo: "Atención",
                            Mensaje: "Información actualizada",
                        };
                    } else {
                        info = {
                            TipoMensaje: "Error",
                            Titulo: "Atención",
                            Mensaje: "a ocurrido un error",
                        };
                    }
                    const dialogRef = this.dialog.open(ModalPopUpComponent, {
                        panelClass: "dialogInfocustom",
                        width: "450px",
                        data: info,
                    });

                    this.communicationService.showLoader.next(false);

                    this.SeleccionDireccion.Guardar();
                    this.Router.navigate(["/principal/"])
                }),
                (erro) => this.communicationService.showLoader.next(false);
        }
    }
}
