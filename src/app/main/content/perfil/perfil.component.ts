import { Component, Inject, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { MatPaginator, MatDialogRef, MatSort, MatTableDataSource, MatDialog, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { UserService } from 'app/ApiServices/UserService';
import { MatSelectModule } from '@angular/material/select';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { E_Cliente } from 'app/Models/E_Cliente';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Provincia } from 'app/Models/E_Provincia';
import { E_Canton } from 'app/Models/E_Canton';
import { E_Parroquia } from 'app/Models/E_Parroquia';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { EstadosClienteEnum, IntermediarioEnum, ComoTeEnterasteEnum, ParametrosEnum, UnidadNegocioEnum, CatalogoInteresEnum, GruposUsuariosEnum } from "app/Enums/Enumerations";
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import 'rxjs/add/observable/throw';
import { catchError, tap } from 'rxjs/operators';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';
import { E_Lider } from 'app/Models/E_Lider';
import { E_Vendedor } from 'app/Models/E_Vendedor';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageSelectionComponent } from './image-selection/image-selection.component';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'perfil',
    templateUrl: 'perfil.component.html',
    styleUrls: ['perfil.component.scss']
})
export class PerfilComponent implements OnInit {
    public SessionUser: E_SessionUser = new E_SessionUser()
    public ObjCliente: E_Cliente = new E_Cliente()
    private CodigoParroquias: string
    isLinear = false;
    @ViewChild('lImage') lImage: ElementRef
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    Empresariadatos: E_SessionEmpresaria;
    Region: string;
    Vendedor: string;
    Zona: string;
    EmailLider: string;
    TelefonoLider: string;
    formErrors: any;
    SucceSave: boolean;
    SaveInProgress: boolean;
    dataURL: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    DireccionDomicilio;
    NumeroCelular;
    Whatsapp;
    Imagen;
    chat;
    texto;
    public ProvinciaCliente: string = "";
    public CiudadCliente: string;
    public NombreEmpresariaCompleto: string;
    public ParroquiaCliente: string;
    public ProvinciaSeleccionado: string = ""; //PROVINCIA = DEPARTAMENTO
    public ListProvincia: Array<E_Provincia> = new Array<E_Provincia>();

    public CantonSeleccionado: string = ""; //CANTON = MUNICIPIO
    public ListCanton: Array<E_Canton> = new Array<E_Canton>();
    CorreoElectronico: any;
    public ParroquiaSeleccionado: string = ""; //PARROQUIA = CORREGIMIENTO
    public ListParroquia: Array<E_Parroquia> = new Array<E_Parroquia>();
    public SessionEmpresaria: E_SessionEmpresaria = new E_SessionEmpresaria()
    preview: string;
    viewImage: boolean;
    ImageAvatar: string;

    constructor(public dialog: MatDialog, public parametrosservice: ParameterService,
        private userService: UserService,
        private Matdialog: MatDialog,
        private ClienteService: ClienteService,
        private ExceptionErrorService: ExceptionErrorService,
        private CommunicationService: CommunicationService,
        private _formBuilder: FormBuilder,
        private clienteservice: ClienteService,
        private Router: Router
    ) {
        this.formErrors = {
            Provincia: {},
            Canton: {},
            Parroquia: {},
            DireccionDomicilio: {},
            NumeroCelular: {},
            CorreoElectronico: {},
            Imagen: {}
        };
    }


    ngOnInit() {

        this.SessionUser = this.userService.GetCurrentCurrentUserNow()
        this.refreshImage();

        var objClienteResquest: E_Cliente = new E_Cliente()
        objClienteResquest.Nit = this.SessionUser.Cedula;



        this.CommunicationService.showLoader.next(true)

        this.firstFormGroup = this._formBuilder.group({
            Cedula: ['', Validators.required],
            Grupo: ['', Validators.required],
            Region: ['', Validators.required],
            Vendedor: ['', Validators.required],
            Provincia: [undefined, [Validators.required]],
            Canton: [undefined, [Validators.required]],
            Parroquia: [undefined, [Validators.required]],
            DireccionDomicilio: [undefined, [Validators.required]],
            NumeroCelular: [undefined, [Validators.required]],
            CorreoElectronico: ['', [Validators.required, Validators.email]],
            EmailLider: [''],
            TelefonoLider: [''],
            NombreEmpresariaCompleto: ['', Validators.required]
        });



        var objClienteResquest: E_Cliente = new E_Cliente()
        var objCliente: E_Cliente = new E_Cliente()
        objClienteResquest.Nit = this.SessionUser.Cedula
        objClienteResquest.Vendedor = this.SessionUser.IdVendedor
        this.CiudadCliente = this.SessionUser.CodCiudad;
        this.ParroquiaCliente = this.SessionUser.CodigoParroquia;
        this.CodigoParroquias = this.SessionUser.CodigoParroquia;
        if (this.SessionUser.Imagen == undefined || this.SessionUser.Imagen == "") {
            this.Imagen = "profile.jpg";
        } else {
            this.Imagen = this.SessionUser.Imagen
        }


        var x = this.clienteservice.ValidaExisteEmpresariaNombre(objClienteResquest).subscribe((x: E_SessionEmpresaria) => {

            if (x.Error == undefined) {
                this.Empresariadatos = x;
                this.NumeroCelular = !_.isNil(x.Celular1) ? x.Celular1.trim() : null;
                this.DireccionDomicilio = !_.isNil(x.DireccionPedidos) ? x.DireccionPedidos.trim() : null;
                this.CorreoElectronico = !_.isNil(x.Email) ? x.Email.trim() : null;
                this.EmailLider = !_.isNil(x.EmailLider) ? x.EmailLider.trim() : null;
                this.TelefonoLider = !_.isNil(x.Celular2) ? x.Celular2.trim() : null;
                this.NombreEmpresariaCompleto = !_.isNil(x.NombreEmpresariaCompleto) ? x.NombreEmpresariaCompleto.trim() : null;


                this.parametrosservice.RegionxZona(this.SessionUser.IdVendedor).subscribe((x) => {
                    //

                    this.Region = x.NombreGerente;
                    this.chat = "https://api.whatsapp.com/send?phone=593" + this.NumeroCelular + "&text=&source=&data=";
                    this.texto = "Contacta tu Coordinador";

                });
                this.parametrosservice.VendedorxId(this.SessionUser.IdVendedor).subscribe((x) => {

                    this.Vendedor = x.Nombre;
                });

                this.parametrosservice.ZonaxId(this.SessionUser.IdZona).subscribe((x) => {

                    this.Zona = x.Descripcion;
                });
                this.CommunicationService.showLoader.next(false)
            }
        });

        this.ParroquiaSeleccionado = this.ParroquiaCliente
        this.ProvinciaCliente = this.CiudadCliente.substr(0, 3);
        this.ProvinciaSeleccionado = this.CiudadCliente.substr(0, 3);
        this.parametrosservice.listarProvincia()
            .subscribe((x: Array<E_Provincia>) => {
                this.ListProvincia = x;
                const toSelect = this.ListProvincia.find(c => c.CodEstado == this.ProvinciaCliente);
                this.firstFormGroup.get('Provincia').setValue(toSelect);
                this.ProvinciaSeleccionado = toSelect.CodEstado;

                this.parametrosservice.listarCanton(toSelect)
                    .subscribe((x: Array<E_Canton>) => {
                        this.ListCanton = x;
                        const toSelectC = this.ListCanton.find(c => c.CodCiudad == this.CiudadCliente);
                        this.firstFormGroup.get('Canton').setValue(toSelectC);
                        this.CantonSeleccionado = toSelectC.CodCiudad;
                        var objCanton: E_Canton = new E_Canton();
                        objCanton.CodCiudad = toSelectC.CodCiudad.substring(3);
                        objCanton.CodEstado = this.ProvinciaSeleccionado.substring(1);


                    });


            });

        var objCanton: E_Canton = new E_Canton();
        objCanton.CodCiudad = this.CiudadCliente.substring(3);;
        objCanton.CodEstado = this.ProvinciaSeleccionado.substring(1);

        this.ParroquiaSeleccionado = this.ParroquiaCliente
        this.parametrosservice.listarParroquia(objCanton)
            .subscribe((x: Array<E_Parroquia>) => {
                this.ListParroquia = x;
                const toSelectP = this.ListParroquia.find(c => c.Codigo == this.CodigoParroquias);
                if (!_.isNil(toSelectP)) {
                    this.firstFormGroup.get('Parroquia').setValue(toSelectP);
                    this.ParroquiaSeleccionado = toSelectP.Codigo;
                }
            });

        if (this.SessionUser.IdGrupo == '50' || this.SessionUser.IdGrupo == '80') {

            this.chat = "https://api.whatsapp.com/send?phone=593" + this.NumeroCelular + "&text=&source=&data=";

        }

        /*this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', Validators.required]
        });*/


    }

    private refreshImage() {
        if (!_.isNil(this.SessionUser)) {
            this.ImageAvatar = this.SessionUser.Cedula + ".png?" + Math.random();
        }
    }

    public onStepperSelectionChange(evant: any) {
        var elmnt = document.getElementById("forms");
        elmnt.scrollTop = 100 + (evant.selectedIndex + 1) * 50;
    }


    private setProvincia(x: E_Provincia[]) {
        this.ListProvincia = x;
    }

    //Llama a los cantones en cascada. Canton = CIUDAD
    SelectedProvincia(y) {

        if (y.value != undefined && y.value != "-1") {

            var objProvincia: E_Provincia = new E_Provincia();
            objProvincia.CodEstado = y.value.CodEstado;
            this.ProvinciaSeleccionado = y.value.CodEstado;
            this.parametrosservice.listarCanton(objProvincia)
                .subscribe((x: Array<E_Canton>) => {
                    this.ListCanton = x;
                });
        }
    }


    //Llama a las parroquias en cascada. Parroquias = CORREGIMIENTOS
    SelectedCanton(y) {

        if (y.value != undefined && y.value != "-1") {

            var objCanton: E_Canton = new E_Canton();
            objCanton.CodCiudad = y.value.CodCiudad.substring(3);
            objCanton.CodEstado = this.ProvinciaSeleccionado.substring(1);


            this.parametrosservice.listarParroquia(objCanton)
                .subscribe((x: Array<E_Parroquia>) => {
                    this.ListParroquia = x;
                });
        }
    }


    SelectedParroquia(y) {

        var depObj = this.ListParroquia.find(x => x.CodigoParroquia == y.value);
        //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }

    ConfirmData() {
        this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, { panelClass: 'dialogInfocustom' });
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar esta acción?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) { this.EnviarInfo(); }
            this.confirmDialogRef = null;
        });

    }


    EnviarInfo() {
        var objLider: E_Lider = new E_Lider();
        var objVendedor: E_Vendedor = new E_Vendedor();
        var objCliente: E_Cliente = new E_Cliente();
        if (this.SessionUser.IdGrupo == "60") {
            try {
                objLider.Codciudad = this.firstFormGroup.value.Canton;
                objLider.Direccion = this.firstFormGroup.value.DireccionDomicilio;
                objLider.TelefonoDos = this.firstFormGroup.value.Whatsapp;
                objLider.TelefonoUno = this.firstFormGroup.value.NumeroCelular;
                objLider.Email = this.firstFormGroup.value.Email;
                objLider.IdLider = this.SessionUser.IdLider;
                objLider.Cedula = this.SessionUser.Cedula;

                this.ActualizaLider(objLider);
                objCliente.CodCiudad = this.firstFormGroup.value.Canton;
                objCliente.CodDepartamento = this.firstFormGroup.value.Provincia.CodEstado;
                objCliente.CodCiudad = this.firstFormGroup.value.Canton.CodCiudad;
                objCliente.CodigoParroquia = this.firstFormGroup.value.Parroquia.Codigo;
                objCliente.NombreParroquia = this.firstFormGroup.value.Parroquia.NombreParroquia;
                objCliente.DireccionPedidos = this.firstFormGroup.value.DireccionDomicilio;
                objCliente.Telefono1 = this.firstFormGroup.value.NumeroCelular;
                objCliente.Celular1 = this.firstFormGroup.value.NumeroCelular;
                objCliente.Email = this.firstFormGroup.value.CorreoElectronico;
                objCliente.Nit = this.SessionUser.Cedula;

                this.ActualizaEmpresaria(objCliente);

            }
            catch (error) {
                //---------------------------------------------------------------------------------------------------------------
                //Mensaje de Error.  
                const dialogRef = this.dialog.open(ModalPopUpComponent, {
                    panelClass: 'dialogInfocustom',
                    width: '450px',
                    data: { TipoMensaje: "Error", Titulo: "Edicion Perfil", Mensaje: "No se pudo guardar la actualizacion Perfil de Lider." }
                });

                throw new ErrorLogExcepcion("PerfilComponent", "EnviarInfo()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);

                //---------------------------------------------------------------------------------------------------------------
            }



        } else {
            if (this.SessionUser.IdGrupo == "52") {
                try {
                    objVendedor.CodigoCiudad = this.firstFormGroup.value.Canton;
                    objVendedor.Direccion = this.firstFormGroup.value.DireccionDomicilio;
                    objVendedor.TelefonoDos = this.firstFormGroup.value.Whatsapp;
                    objVendedor.TelefonoUno = this.firstFormGroup.value.NumeroCelular;
                    objVendedor.Email = this.firstFormGroup.value.Email;
                    objVendedor.IdVendedor = this.SessionUser.IdVendedor;
                    objVendedor.Cedula = this.SessionUser.Cedula;

                    this.ActualizaDirector(objVendedor);
                    objCliente.CodCiudad = this.firstFormGroup.value.Canton;
                    objCliente.CodDepartamento = this.firstFormGroup.value.Provincia.CodEstado;
                    objCliente.CodCiudad = this.firstFormGroup.value.Canton.CodCiudad;
                    objCliente.CodigoParroquia = this.firstFormGroup.value.Parroquia.Codigo;
                    objCliente.NombreParroquia = this.firstFormGroup.value.Parroquia.NombreParroquia;
                    objCliente.DireccionPedidos = this.firstFormGroup.value.DireccionDomicilio;
                    objCliente.Telefono1 = this.firstFormGroup.value.NumeroCelular;
                    objCliente.Celular1 = this.firstFormGroup.value.NumeroCelular;
                    objCliente.Email = this.firstFormGroup.value.CorreoElectronico;
                    objCliente.Nit = this.SessionUser.Cedula;

                    this.ActualizaEmpresaria(objCliente);

                }
                catch (error) {
                    //---------------------------------------------------------------------------------------------------------------
                    //Mensaje de Error.  
                    const dialogRef = this.dialog.open(ModalPopUpComponent, {
                        panelClass: 'dialogInfocustom',
                        width: '450px',
                        data: { TipoMensaje: "Error", Titulo: "Edicion Perfil", Mensaje: "No se pudo guardar la actualizacion Perfil de Lider." }
                    });

                    throw new ErrorLogExcepcion("PerfilComponent", "EnviarInfo()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);

                    //---------------------------------------------------------------------------------------------------------------
                }
            } else {
                try {
                    objCliente.CodCiudad = this.firstFormGroup.value.Canton;
                    objCliente.CodDepartamento = this.firstFormGroup.value.Provincia.CodEstado;
                    objCliente.CodCiudad = this.firstFormGroup.value.Canton.CodCiudad;
                    objCliente.CodigoParroquia = this.firstFormGroup.value.Parroquia.Codigo;
                    objCliente.NombreParroquia = this.firstFormGroup.value.Parroquia.NombreParroquia;
                    objCliente.DireccionPedidos = this.firstFormGroup.value.DireccionDomicilio;
                    objCliente.Telefono1 = this.firstFormGroup.value.NumeroCelular;
                    objCliente.Celular1 = this.firstFormGroup.value.NumeroCelular;
                    objCliente.Email = this.firstFormGroup.value.CorreoElectronico;
                    objCliente.Nit = this.SessionUser.Cedula;

                    this.ActualizaEmpresaria(objCliente);

                }
                catch (error) {
                    //---------------------------------------------------------------------------------------------------------------
                    //Mensaje de Error.  
                    const dialogRef = this.dialog.open(ModalPopUpComponent, {
                        panelClass: 'dialogInfocustom',
                        width: '450px',
                        data: { TipoMensaje: "Error", Titulo: "Edicion Perfil", Mensaje: "No se pudo guardar la actualizacion Perfil de Lider." }
                    });

                    throw new ErrorLogExcepcion("PerfilComponent", "EnviarInfo()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);

                    //---------------------------------------------------------------------------------------------------------------
                }

            }
        }

    }

    private ActualizaLider(objLider: E_Lider) {
        try {
            var objLiderResponse: E_Lider = new E_Lider();
            this.parametrosservice.ActualizarLider(objLider)
                .subscribe((x: E_Lider) => {
                    objLiderResponse = x;


                    if (x.Error == undefined) {
                        //Mensaje de OK


                        const dialogRef = this.dialog.open(ModalPopUpComponent, {

                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Ok", Titulo: "Actualizacion de  Perfil Lider", Mensaje: "Se registro la Actualizacion Perfil Lider exitosamente!" }
                        });



                    }
                    else {
                        //---------------------------------------------------------------------------------------------------------------
                        //Mensaje de Error. 
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Error", Titulo: "Actualizacion de Perfil Lider", Mensaje: "No se pudo Actualizar Perfil Lider." }
                        });

                        throw new ErrorLogExcepcion("ActualizaEmpresariaEcComponent", "CrearUsuarioyClave()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService);
                        //---------------------------------------------------------------------------------------------------------------
                    }

                });

            //this.BorrarDatos();
            // this.Router.navigate(['/detallecliente']);

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.  
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                panelClass: 'dialogInfocustom',
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Actualizacion Empresaria", Mensaje: "No se pudo guardar la empresaria." }
            });

            throw new ErrorLogExcepcion("ActualizaEmpresariaEcComponent", "ActualizaPerfil()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);

            //---------------------------------------------------------------------------------------------------------------
        }

    }

    private ActualizaEmpresaria(objCliente: E_Cliente) {
        try {
            var objClienteResponse: E_Cliente = new E_Cliente();
            this.ClienteService.ActualizarDireccionTelefono(objCliente)
                .subscribe((x: E_Cliente) => {
                    objClienteResponse = x;


                    if (x.Error == undefined) {
                        //Mensaje de OK


                        const dialogRef = this.dialog.open(ModalPopUpComponent, {

                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Ok", Titulo: "Actualizacion de  Empresaria", Mensaje: "Se registro la Actualizacion de empresaria exitosamente!" }
                        });



                    }
                    else {
                        //---------------------------------------------------------------------------------------------------------------
                        //Mensaje de Error. 
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Error", Titulo: "Actualizacion de Empresaria", Mensaje: "No se pudo crear usuario y clave de la empresaria." }
                        });

                        throw new ErrorLogExcepcion("ActualizaEmpresariaEcComponent", "CrearUsuarioyClave()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService);
                        //---------------------------------------------------------------------------------------------------------------
                    }

                });

            //this.BorrarDatos();
            //this.Router.navigate(['/detallecliente']);

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.  
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                panelClass: 'dialogInfocustom',
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Actualizacion Empresaria", Mensaje: "No se pudo guardar la empresaria." }
            });

            throw new ErrorLogExcepcion("ActualizaEmpresariaEcComponent", "RegistrarEmpresaria()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);

            //---------------------------------------------------------------------------------------------------------------
        }

    }


    private ActualizaDirector(objVendedor: E_Vendedor) {
        try {
            var objVendedorResponse: E_Vendedor = new E_Vendedor();
            this.parametrosservice.ActualizarDirector(objVendedor)
                .subscribe((x: E_Vendedor) => {
                    objVendedorResponse = x;


                    if (x.Error == undefined) {
                        //Mensaje de OK


                        const dialogRef = this.dialog.open(ModalPopUpComponent, {

                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Ok", Titulo: "Actualizacion de  Perfil Director", Mensaje: "Se registro la Actualizacion Perfil Director exitosamente!" }
                        });



                    }
                    else {
                        //---------------------------------------------------------------------------------------------------------------
                        //Mensaje de Error. 
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Error", Titulo: "Actualizacion de Perfil Director", Mensaje: "No se pudo Actualizar Perfil Director." }
                        });

                        throw new ErrorLogExcepcion("PerfilComponent", "ActualizarDirector()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService);
                        //---------------------------------------------------------------------------------------------------------------
                    }

                });

            //this.BorrarDatos();
            // this.Router.navigate(['/detallecliente']);

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.  
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                panelClass: 'dialogInfocustom',
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Actualizacion Director", Mensaje: "No se pudo Actualziar Director." }
            });

            throw new ErrorLogExcepcion("PerfilComponent", "ActualizarDirector()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService);

            //---------------------------------------------------------------------------------------------------------------
        }

    }

    EditarImagen() {
        const dialogRef = this.dialog.open(ImageSelectionComponent, {
            panelClass: 'dialogInfocustom',
            width: '450px',
            data: { usuario: this.SessionUser.Cedula }

        });
        dialogRef.afterClosed().forEach((x) => {
            this.refreshImage();
            this.CommunicationService.onReloadImage.next(true)
        })
    }
    CambioContrasena() {
        this.Router.navigate(['/cambiocontrasena'])

    }

}


