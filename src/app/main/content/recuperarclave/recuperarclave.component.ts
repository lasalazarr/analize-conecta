//import { Component, OnInit } from '@angular/core';
import { Component, Inject, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ParameterService } from "app/ApiServices/ParametersServices";
import { GenerateMask } from "app/Tools/MaskedLibrary";
//import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {
    MatDialog,
    MatBottomSheetRef,
    MatDialogRef,
    MAT_DIALOG_DATA,
    MAT_BOTTOM_SHEET_DATA,
} from "@angular/material";
import { PhotoTool } from "app/Tools/PhotoTool";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../../ApiServices/UserService";
//import { MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";

import {
    EstadosClienteEnum,
    IntermediarioEnum,
    ComoTeEnterasteEnum,
    ParametrosEnum,
    UnidadNegocioEnum,
    CatalogoInteresEnum,
    GruposUsuariosEnum,
} from "app/Enums/Enumerations";

import { E_Cliente } from "app/Models/E_Cliente";

import { E_Regional } from "app/Models/E_Regional";
import { E_SessionUser } from "app/Models/E_SessionUser";
import { E_Vendedor } from "app/Models/E_Vendedor";
import { E_Lider } from "app/Models/E_Lider";
import { E_TipoDocumento } from "app/Models/E_TipoDocumento";
import { E_Provincia } from "app/Models/E_Provincia";
import { E_Canton } from "app/Models/E_Canton";
import { E_Parroquia } from "app/Models/E_Parroquia";
import { E_SessionEmpresaria } from "app/Models/E_SessionEmpresaria";
import { ValidarDocumento } from "app/Tools/ValidarDocumento";
import { E_Parametros } from "app/Models/E_Parametros";
import { ClienteService } from "app/ApiServices/ClienteService";
import { ModalPopUpComponent } from "../ModalPopUp/modalpopup.component";
import { E_ExceptionError } from "app/Models/E_ExceptionError";
import { ExceptionErrorService } from "app/ApiServices/ExceptionErrorService";
import "rxjs/add/observable/throw";
import { catchError, tap } from "rxjs/operators";
import { ErrorLogExcepcion } from "app/Models/ErrorLogExcepcion";
import * as _ from "lodash";
import { forkJoin } from "rxjs";
import { CommunicationService } from "app/ApiServices/CommunicationService";

import { ValidatorFn, AbstractControl } from "@angular/forms";

function equalsValidator(otherControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const value: any = control.value;
        const otherValue: any = otherControl.value;
        return otherValue === value
            ? null
            : { notEquals: { value, otherValue } };
    };
}

export const CustomValidators = {
    equals: equalsValidator,
};

export interface DialogData {
    Usuario: string;
}

@Component({
    moduleId: module.id,
    selector: "recuperarclave",
    templateUrl: "recuperarclave.component.html",
    styleUrls: ["recuperarclave.component.scss"],
})
export class RecuperarClaveComponent implements OnInit {
    NumeroDocumento;
    CorreoElectronico;
    Nombre;
    clave1;
    clave2;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    SaveInProgress: boolean;
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[];
    MaskedNumberNoDecimal: any[];
    form: FormGroup;
    formErrors: any;

    minDate: Date;
    maxDate: Date;

    public SessionEmpresaria: E_SessionEmpresaria = new E_SessionEmpresaria();

    public objParametrosResponse: E_Parametros = new E_Parametros();

    public SessionUser: E_SessionUser = new E_SessionUser();

    /// public Nombre: string;
    public descripcion: string;
    public checkedActivo: boolean;
    EstadoFormulario: boolean;

    public PermitirPedidoMinimoxDefecto: string;
    public ValorTPedMinimoxDefecto: number;

    // Horizontal Stepper
    constructor(
        private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private Matdialog: MatDialog,
        private Router: Router,
        private UserService: UserService,
        private ClienteService: ClienteService,
        public dialog: MatDialog,
        private ExceptionErrorService: ExceptionErrorService,
        private CommunicationService: CommunicationService,
        private bottomSheetRef: MatBottomSheetRef<RecuperarClaveComponent>,
        private activatedRoute: ActivatedRoute,
        private communicationService: CommunicationService,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
        private ngzone: NgZone
    ) {
        this.formErrors = {
            NumeroDocumento: {},
            Nombre: {},

            CorreoElectronico: {},
        };
    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(["/mainpageadmin"]);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(ModalPopUpComponent, {
            panelClass: "dialogInfocustom",
            width: "450px",
            data: {
                TipoMensaje: "Error",
                Titulo: "Actualizacion Empresarias",
                Mensaje: "Se guardo la Actualizacion con exitosamente!.",
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed");
            //this.Mensaje = result; //AQUI RECIBE LOS DATOS DEL POPUP CERRADO. OJO PARA PEDIDO.
        });

        //TODO:MRG: Produce un error  at new ErrorLogExcepcion pero guarda en la BD. Corregir
        //TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:2:14)
        throw new ErrorLogExcepcion(
            "PedidosPrincipalComponent",
            "openDialog()",
            "Prueba Error",
            this.SessionUser.Cedula,
            this.ExceptionErrorService
        );
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            NumeroDocumento: [undefined, [Validators.required]],
            Nombre: [undefined, [Validators.required]],
            CorreoElectronico: ["", [Validators.required, Validators.email]],
        });

        this.NumeroDocumento = this.data.Usuario;
        //   if (this.NumeroDocumento != undefined){
        //      this.ValidateDocument()
        // }
    }

    ValidateDocument() {
        try {
            if (
                this.form.value.NumeroDocumento != "" &&
                this.form.value.NumeroDocumento != undefined
            ) {
                //var okDoc = this.pc_verificar(this.form.value.NumeroDocumento)
                //console.log('okDoc:' + okDoc)
                if (true) {
                    var objClienteResquest: E_Cliente = new E_Cliente();
                    objClienteResquest.Nit = this.form.value.NumeroDocumento;

                    //..............................................................................

                    this.communicationService.showLoader.next(true);

                    this.ClienteService.ConsultaExisteEmpresariaNombre(
                        objClienteResquest
                    ).subscribe((x: E_Cliente) => {
                        this.ngzone.run(() => {
                            if (x.Nit != undefined) {
                                this.Nombre = x.NombreEmpresariaCompleto;
                                this.form.controls["Nombre"].setValue(
                                    x.NombreEmpresariaCompleto
                                );
                                this.CorreoElectronico = x.Email;
                                this.form.controls[
                                    "CorreoElectronico"
                                ].setValue(x.Email.trim());
                                if (this.CorreoElectronico == undefined) {
                                    const dialogRef = this.dialog.open(
                                        ModalPopUpComponent,
                                        {
                                            panelClass: "dialogInfocustom",
                                            width: "450px",
                                            data: {
                                                TipoMensaje: "Error",
                                                Titulo: "Correo Invalido",
                                                Mensaje:
                                                    "El Correo Electronico no es Valido. Por favor comunicate con Sericio al Cliente.",
                                            },
                                        }
                                    );

                                    throw new ErrorLogExcepcion(
                                        "RecuperarClaveComponent",
                                        "ValidateDocument()",
                                        x.Error.Descripcion,
                                        this.SessionUser.Cedula,
                                        this.ExceptionErrorService
                                    );
                                    //---------------------------------------------------------------------------------------------------------------
                                }
                            } else {
                                this.BorrarDatos();

                                //---------------------------------------------------------------------------------------------------------------
                                //Mensaje de Error.
                                const dialogRef = this.dialog.open(
                                    ModalPopUpComponent,
                                    {
                                        panelClass: "dialogInfocustom",
                                        width: "450px",
                                        data: {
                                            TipoMensaje: "Error",
                                            Titulo: "Usuarios",
                                            Mensaje:
                                                "El Usuario no existe. Por favor verifique.",
                                        },
                                    }
                                );

                                throw new ErrorLogExcepcion(
                                    "RecuperarClaveComponent",
                                    "ValidateDocument()",
                                    x.Error.Descripcion,
                                    this.SessionUser.Cedula,
                                    this.ExceptionErrorService
                                );
                                //---------------------------------------------------------------------------------------------------------------
                            }
                            this.communicationService.showLoader.next(false);
                        });
                    });
                }
            }
        } catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                width: "450px",
                panelClass: "dialogInfocustom",
                data: {
                    TipoMensaje: "Error",
                    Titulo: "Usuario",
                    Mensaje: "No se pudo validar el Usuario.",
                },
            });

            throw new ErrorLogExcepcion(
                "ActualizaEmpresariaEcComponent",
                "ValidateDocument()",
                error.message,
                this.SessionUser.Cedula,
                this.ExceptionErrorService
            );

            //---------------------------------------------------------------------------------------------------------------
        }
    }

    ConfirmData() {
        this.confirmDialogRef = this.Matdialog.open(
            FuseConfirmDialogComponent,
            { panelClass: "dialogInfocustom" }
        );
        this.confirmDialogRef.componentInstance.confirmMessage =
            "¿Estas seguro de realizar esta acción?";
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.EnviarInfo();
            }
            this.confirmDialogRef = null;
        });
    }

    EnviarInfo() {
        var objCliente: E_Cliente = new E_Cliente();

        try {
            objCliente.Nit = this.form.value.NumeroDocumento;

            this.RecuperaClaveEmpresaria(objCliente);
        } catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                panelClass: "dialogInfocustom",
                width: "450px",
                data: {
                    TipoMensaje: "Error",
                    Titulo: "Actualizacion de  Empresaria",
                    Mensaje: "No se pudo guardar la actualizacion empresaria.",
                },
            });

            throw new ErrorLogExcepcion(
                "ActualizaEmpresariaEcComponent",
                "EnviarInfo()",
                error.message,
                this.SessionUser.Cedula,
                this.ExceptionErrorService
            );

            //---------------------------------------------------------------------------------------------------------------
        }
    }

    private RecuperaClaveEmpresaria(objCliente: E_Cliente) {
        try {
            var objClienteResponse: E_SessionUser = new E_SessionUser();
            this.ClienteService.RecuperarClave(objCliente).subscribe(
                (x: E_SessionUser) => {
                    objClienteResponse = x;

                    if (x.Error == undefined) {
                        //Mensaje de OK

                        const dialogRef = this.dialog.open(
                            ModalPopUpComponent,
                            {
                                panelClass: "dialogInfocustom",
                                width: "450px",
                                data: {
                                    TipoMensaje: "Ok",
                                    Titulo: "Recuperación  de contraseña",
                                    Mensaje:
                                        "Se envio el correo de recuperación de contraseña exitosamente!",
                                },
                            }
                        );
                    } else {
                        //---------------------------------------------------------------------------------------------------------------
                        //Mensaje de Error.
                        const dialogRef = this.dialog.open(
                            ModalPopUpComponent,
                            {
                                panelClass: "dialogInfocustom",
                                width: "450px",
                                data: {
                                    TipoMensaje: "Error",
                                    Titulo: "Recuperacion de Contraseña",
                                    Mensaje:
                                        "No se pudo enviar correo con usuario y clave .",
                                },
                            }
                        );

                        throw new ErrorLogExcepcion(
                            "ActualizaEmpresariaEcComponent",
                            "CrearUsuarioyClave()",
                            x.Error.Descripcion,
                            this.SessionUser.Cedula,
                            this.ExceptionErrorService
                        );
                        //---------------------------------------------------------------------------------------------------------------
                    }
                }
            );

            //this.BorrarDatos();
            //this.Router.navigate(['/detallecliente']);
            this.bottomSheetRef.dismiss();
        } catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                panelClass: "dialogInfocustom",
                width: "450px",
                data: {
                    TipoMensaje: "Error",
                    Titulo: "Actualizacion Empresaria",
                    Mensaje: "No se pudo guardar la empresaria.",
                },
            });

            throw new ErrorLogExcepcion(
                "ActualizaEmpresariaEcComponent",
                "RegistrarEmpresaria()",
                error.message,
                this.SessionUser.Cedula,
                this.ExceptionErrorService
            );

            //---------------------------------------------------------------------------------------------------------------
        }
    }

    /// <summary>
    /// Valida si la cedula de ecuador es valida para ingresar al sistema.
    /// </summary>
    /// <param name="cedula"></param>
    /// <returns></returns>
    public pc_verificar(cedula: string) {
        try {
            var a: number;
            var c: number;
            var x: number;
            var b: number;
            var d: number;
            var ap: number = 0;
            var at: number = 0;

            for (a = 0; a < 9; a = a + 2) {
                b = Number(cedula.substring(a, 1));
                b = b + b;
                Number(b);
                if (b > 9) {
                    b = b - 9;
                }
                ap = ap + b;
            }
            for (c = 1; c <= 8; c = c + 2) {
                d = Number(cedula.substring(c, 1));
                at = at + d;
            }
            x = ap + at;
            do {
                x = x - 10;
            } while (x > 0);
            var di: number = Math.abs(x);
            var ver: string = cedula.substring(a - 1, 1);
            var dig: string = di.toString();
            if (ver == dig) {
                return true;
                //MessageBox.Show("CEdula buena");
            } else {
                return false;
                // MessageBox.Show("CEdula mal");
            }
        } catch (Exception) {
            return false;
        }
    }

    BorrarDatos() {
        this.form.setValue({
            NumeroDocumento: "",
            Nombre: "",
            CorreoElectronico: "",
        });
    }
    public onStepperSelectionChange(evant: any) {
        var elmnt = document.getElementById("forms");
        elmnt.scrollTop = 100 + (evant.selectedIndex + 1) * 50;
    }
}
