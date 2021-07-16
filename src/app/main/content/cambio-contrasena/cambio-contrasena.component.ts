import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { UserService } from 'app/ApiServices/UserService';
import { E_Usuario } from 'app/Models/E_Usuario';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { E_Cliente } from 'app/Models/E_Cliente';
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { MatDialog } from '@angular/material';
import _ from 'lodash';

@Component({
    selector: 'app-cambio-contrasena',
    templateUrl: './cambio-contrasena.component.html',
    styleUrls: ['./cambio-contrasena.component.scss']

})
export class CambioContrasenaComponent implements OnInit {

    public SessionUser: E_SessionUser = new E_SessionUser();
    public formcambioclave: FormGroup;
    public showPassword: boolean
    constructor(public UserService: UserService,
        private ClienteService: ClienteService,
        public dialog: MatDialog,

    ) {

    }
    ngOnInit(): void {
        let sessionUser = this.UserService.GetCurrentCurrentUserNow()
        this.formcambioclave = new FormGroup({

            oldPwd: new FormControl("", [Validators.required, this.validarClave(sessionUser.ClaveUsuario)]),
            newPwd: new FormControl('', Validators.required),
            confirmPwd: new FormControl('', Validators.required)
        });

        this.formcambioclave.setValidators([this.matchPwds()]);
        this.formcambioclave.valueChanges.subscribe(x => {
            console.log(this.formcambioclave)
        })
    }


    actualizarclave() {
        let objClienteResquest = this.UserService.GetCurrentCurrentUserNow()
        objClienteResquest.ClaveNueva = this.formcambioclave.controls.newPwd.value
        objClienteResquest.Nit = objClienteResquest.Cedula;
        objClienteResquest.CodCiudad = objClienteResquest.CodCiudad;
        if (objClienteResquest.IdGrupo == "52"){
            objClienteResquest.IdVendedor = objClienteResquest.IdVendedor;

        }else{
            objClienteResquest.IdVendedor = objClienteResquest.IdLider;

        }

        if (objClienteResquest.IdGrupo == "52" || objClienteResquest.IdGrupo == "60")  {

            this.ClienteService.ActualizaClaveDirectorLider(objClienteResquest)
                .subscribe((x: E_SessionUser) => {
                    if (_.isNil(x.Error)) {
                        this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Ok", Titulo: "Cambio Clave", Mensaje: "Se realizo el cambio de clave exitosamente!" }
                        });
                    }
                    else {
                        this.dialog.open(ModalPopUpComponent, {
                            width: '450px',
                            data: { TipoMensaje: "Error", Titulo: "Cambio Clave", Mensaje: "No se pudo realizar el cambio de clave." }
                        });
                    }

                })
            
        } else {
            this.ClienteService.ActualizaClaveEmpresaria(objClienteResquest)
            .subscribe((x: E_SessionUser) => {
                if (_.isNil(x.Error)) {
                    this.dialog.open(ModalPopUpComponent, {
                        panelClass: 'dialogInfocustom',
                        width: '450px',
                        data: { TipoMensaje: "Ok", Titulo: "Cambio Clave", Mensaje: "Se realizo el cambio de clave exitosamente!" }
                    });
                }
                else {
                    this.dialog.open(ModalPopUpComponent, {
                        width: '450px',
                        data: { TipoMensaje: "Error", Titulo: "Cambio Clave", Mensaje: "No se pudo realizar el cambio de clave." }
                    });
                }

            })
        }

    }
    shouldBe1234(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            let x = E_SessionUser;
            if (control.value !== "1234")
                resolve({ shouldBe1234: true });
            else
                resolve(null);
        });
    }

    matchPwds() {

        return (formGroup: FormGroup): { [key: string]: any } | null => {
            let newPwd = formGroup.get('newPwd')
            let confirmPwd = formGroup.get('confirmPwd');
            if (_.isNil(newPwd) || _.isNil(confirmPwd)) { return null }
            return confirmPwd.value != newPwd.value ? { 'diferentPass': true } : null;
        };



    }

    validarClave(ClaveUsuario: string) {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            let value = control.value;
            if (_.isNil(value) || value == ClaveUsuario) return null;
            return { 'missMatchPassword': true };;
        };
    }

}
