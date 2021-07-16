import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/ApiServices/UserService';
import { E_Usuario } from 'app/Models/E_Usuario';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { AppSettings } from '../../../../app.settings';
import { Perfiles } from 'app/Enums/Enumerations';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { RecuperarClaveComponent } from '../../recuperarclave/recuperarclave.component';
import { RegistroEmpresariaComponent } from '../../RegistroEmpresaria/registroempresaria.component';
import _ from 'lodash';
import { RegisterComponent } from '../../new-register/register.component';
//import { AppSettings } from '../../../../models/AppSettings.model';


@Component({
    selector: 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class FuseLoginComponent implements OnInit {
    IsAdmin: boolean
    Loading: boolean;
    errorLogin: boolean;
    rememberme = false
    //@ViewChild('juta') juta: ElementRef
    @ViewChild('videoPlayer') videoplayer: ElementRef;
    @ViewChild("jojo") jojo: ElementRef
    videoSource = "assets/video/introapp.mp4"
    loginForm: FormGroup;
    loginFormErrors: any;
    public jey: string;
    lista: number[] = [];
    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private bottomSheet: MatBottomSheet,
        private Router: Router,
        private activatedRoute: ActivatedRoute,
        private UserService: UserService,
        private communicationService: CommunicationService,
    ) {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.loginFormErrors = {
            usuario: {},
            password: {}
        };

        if (AppSettings.Global().TipoAplicacion == 1) {
            this.jey = "none";
            var user: E_Usuario = new E_Usuario();
            user.UserName = "arg@gmail.com"
            user.Passwordd = btoa("123123")
            this.Loading = true
            this.UserService.Login(user).subscribe((x: E_SessionUser) => {

                /*if (x.error != undefined) {
                    if (x.error.Id == 1 || x.error.Id == 2) {
                        this.errorLogin = true
                        this.Loading = false
                        return
                    }
                }*/
                this.Loading = false
                /*if (this.UserService.GetCurrentCurrentUserNow().Id_Perfil == 1) {
                    this.Router.navigate(["/Carrousel/"])
                } else if (this.UserService.GetCurrentCurrentUserNow().Id_Perfil == 2) {
                    this.Router.navigate(["/mainpageadmin/"])
                } else if (this.UserService.GetCurrentCurrentUserNow().Id_Perfil == 3) {
                    this.Router.navigate(["/mainpagedirector/"])
                } else if (this.UserService.GetCurrentCurrentUserNow().Id_Perfil == 4) {
                    this.Router.navigate(["/mainpageindividuo1/"])
                } else if (this.UserService.GetCurrentCurrentUserNow().Id_Perfil == Perfiles.TransportadorCarro) {
                    this.Router.navigate(["/maintransportadorcarro/"])
                }*/


            })
        } else if (AppSettings.Global().TipoAplicacion == 2) {
            this.IsAdmin = true
        }

        this.activatedRoute.queryParamMap.subscribe((params :any)=> {
            if (params.params['newRegister']) {
                this.NewRegister();
            }
        });

    }

    /*focusin(){
        debugger;
        var x = this.juta.nativeElement.value;
        this.juta.nativeElement.focus()
        this.juta.nativeElement.value="";
    }*/

    ngOnInit() {
        var videoplay = this.videoplayer.nativeElement
        videoplay.muted = "muted";
        this.UserService.ClearCurrentCurrentUserNow()
        this.loginForm = this.formBuilder.group({
            usuario: ['', [Validators.required]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });

        sessionStorage.removeItem("CurrentDetallePedido");
        let rememberUser = localStorage.getItem("UserSaveRemember")
        if (!_.isNil(rememberUser)) {
            this.rememberme = true;
            this.loginNow(JSON.parse(rememberUser));
        }

    }

    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }
    loginNow(user?: E_Usuario) {
        if (_.isNil(user)) {
            var user = new E_Usuario();
            user.UserName = this.loginForm.value.usuario
            user.Passwordd = this.loginForm.value.password
        }

        this.Loading = true
//debugger
        // this.Router.navigate(["/principal/"])
        //this.communicationService.showLoader.next(true);
        //*MRG: Llamar a servicios
        this.UserService.Login(user).subscribe((x: E_SessionUser) => {

            if (x.Error != undefined) {
                if (x.Error.Id == 1 || x.Error.Id == 2) {
                    this.errorLogin = true
                    this.Loading = false
                    return
                }
            }
            this.Loading = false
            if (this.rememberme) {
                localStorage.setItem("UserSaveRemember", JSON.stringify(user))
            }
            if (x.IdGrupo == "50") {
                this.Router.navigate(["/principal/"])
            } else {
                this.Router.navigate(["/principal/"])
            }


        })
        //   ;

        //MRG: Valida un usuario tempooral y redirige.
        //if(user.UserName=="mao@mail.com"&& user.Passwordd=="MTIz")
        //{


        //}
    }

    openRecuperarClave(): void {
        // this.dialogRef.close();
        this.bottomSheet.open(RecuperarClaveComponent, {
            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
            data: { Usuario: this.loginForm.value.usuario }
        });

        //  this.bottomSheet.dismiss();         
    }

    Registro(): void {
        // this.dialogRef.close();
        this.bottomSheet.open(RegistroEmpresariaComponent, {
            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
            data: { Vendedor: '50157', Lider: '50157', IdGrupo: '60' }
        });

        //  this.bottomSheet.dismiss();         
    }

    NewRegister(): void {
        // this.dialogRef.close();
        this.bottomSheet.open(RegisterComponent, {
            panelClass: 'new-register',
            //MRG: poner este para el style del popup.
            data: { Vendedor: '50157', Lider: '50157', IdGrupo: '60' }
        });

        //  this.bottomSheet.dismiss();         
    }


}
