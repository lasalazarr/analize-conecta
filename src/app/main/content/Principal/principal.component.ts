import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { ParameterService } from 'app/ApiServices/ParametersServices';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
//import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
//import { E_Imagen } from 'app/Models/E_Imagen';
//import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { E_Cliente } from 'app/Models/E_Cliente';
import _ from 'lodash';
import { AdminService } from 'app/ApiServices/AdminService';
import { HomeConfiguration } from 'app/Models/HomeConfiguration';
//import { E_Departamentos } from 'app/Models/E_Departamentos';
//import { E_Vehiculo } from 'app/Models/E_Vehiculo';
//import { E_Municipios } from 'app/Models/E_Municipios';

@Component({
    moduleId: module.id,
    selector: 'principal',
    templateUrl: 'principal.component.html',
    styleUrls: ['principal.component.scss'],

})
export class PrincipalComponent implements OnInit {
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    MunicipioSeleccionado: any
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    DepartamentoSeleccionado: any
    show = false;
    public Nombre: string;
    public descripcion: string;
    public checkedActivo;
    public SessionUser: E_SessionUser = new E_SessionUser()
    ListHome: HomeConfiguration[];
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private UserService: UserService,
        private Router: Router,
        private communication: CommunicationService,
        private clienteService: ClienteService,
        private adminService: AdminService
    ) {

        this.formErrors = {
            Nombre: {}

        };

    }



    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/principal'])
    }
    ngOnInit() {
        this.adminService.ObtenerHomeConfig().subscribe(x => this.ListHome = x)
      

        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal

        this.form = this.formBuilder.group({
            Nombre: ['', [Validators.required]]

        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.communication.validateUserAfterLogin.next(true)
        let user = this.UserService.GetCurrentCurrentUserNow();
        var objCliente: E_Cliente = new E_Cliente();
        objCliente.Nit = user.Cedula;

        this.clienteService.ListClienteSVDNxNit(objCliente).subscribe((x) => {
            if (!_.isNil(x) && x.Actudatos == 1) {
                this.Router.navigate(['/ubicaciongeneral', { envi: true }])
            }

        });

    }

    onFormValuesChanged() {

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

    EnviarInfo() {


    }

    openBlank(url) {
        window.open(url);
    }

    nueva() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow();

        if (this.SessionUser.IdGrupo == "50" || this.SessionUser.IdGrupo == "80" || this.SessionUser.IdGrupo == "99") {
          //  this.Router.navigate(['/articulos', JSON.stringify(input)]);
        } else {
            this.Router.navigate(['/pedidosprincipal']);
        }

    }

    accion(item: HomeConfiguration) {



        let input = { OnlyItem: true, item: item }
        if (!_.isNil(item.UrlInterno)){
            this.Router.navigate([item.UrlInterno]);
        }
        else if (!_.isNil(item.Url)) {
            window.open(item.Url);
        } else {
            this.SessionUser = this.UserService.GetCurrentCurrentUserNow();
            if (this.SessionUser.IdGrupo == "50" || this.SessionUser.IdGrupo == "80"
            || this.SessionUser.IdGrupo == "99") {
                this.Router.navigate(['/articulos', JSON.stringify(input)]);
            } else {
                this.Router.navigate(['/pedidosprincipal']);
            }

        }


    }
}

