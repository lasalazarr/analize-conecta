import { Component, OnInit, NgZone, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'app/ApiServices/UserService';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { E_Cliente } from 'app/Models/E_Cliente';
import { PdfInscripcion } from 'app/Models/PdfInscripcion';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { forkJoin, Subject } from 'rxjs';
import { E_TipoDocumento } from 'app/Models/E_TipoDocumento';
import { E_Provincia } from 'app/Models/E_Provincia';
import { E_Canton } from 'app/Models/E_Canton';
import { E_Parroquia } from 'app/Models/E_Parroquia';
import _ from 'lodash';
import { MatDialog, MatSelectChange } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { AdminService } from 'app/ApiServices/AdminService';
import { SolicitudCredito } from 'app/Models/SolicitudCredito';
import { DireccionXUsuario } from 'app/Models/DireccionXUsuario';
import { getLocations } from '../../Ubicacion/seleccion-direccion/seleccion-direccion.component';
import { PdfContrato } from 'app/Models/PdfContrato';
import moment from 'moment';
import { NombreMes } from 'app/Enums/Enumerations';
import { Router } from '@angular/router';
import { ModalPopUpComponent } from '../../ModalPopUp/modalpopup.component';
import { EquisfaxM } from 'app/Models/equisfax';
import { ValidarCredito } from 'app/Models/ValidarCredito';

@Component({
    selector: 'app-formulario-incripcion-creditos',
    templateUrl: './formulario-incripcion-creditos.component.html',
    styleUrls: ['./formulario-incripcion-creditos.component.scss']
})
export class FormularioIncripcionCreditosComponent implements OnInit {
    ListProvincia: E_Provincia[];
    ListTipoDocumento: E_TipoDocumento[];
    @Input() validarSolicitud: boolean;
    formImage: FormGroup
    minDate: Date;
    public equisfaxx:string;
    lodash = _
    maxDate: Date;
    form = new FormGroup({
        TipoCedula: new FormControl("", Validators.required),
        NumeroCedula: new FormControl("", Validators.required),
        PrimerNombre: new FormControl("", Validators.required),
        SegundoNombre: new FormControl("", Validators.required),
        PrimerApellido: new FormControl("", Validators.required),
        SegundoApellido: new FormControl("", Validators.required),
        FechaNacimiento: new FormControl("", Validators.required),
        Genero: new FormControl("", Validators.required),
        Lider: new FormControl("", Validators.required),
        Nacionalidad: new FormControl("", Validators.required),
        DireccionDomicilio: new FormControl("", Validators.required),
        NumeroCelular1: new FormControl("", Validators.required),
        Telefono1: new FormControl("", Validators.required),
        CorreoElectronico: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]),
    })
    public ListGenero: Array<any> = [
        { IdGenero: "F", Nombre: 'FEMENINO' },
        { IdGenero: "M", Nombre: 'MASCULINO' },
    ];
    ListCanton: E_Canton[];
    ListParroquia: E_Parroquia[];
    user: E_SessionUser;
    listaDirecciones: any[];
    direccionseleccionada: DireccionXUsuario;
    cedulaValida: boolean;
    CalificacionC: string;
    validacionDirecciones: boolean = false;
    mensageDireccion: string;

    public bandera : boolean;

    tipocedula:string;
    constructor(private userService: UserService,
        protected sanitizer: DomSanitizer,
        private clienteService: ClienteService,
        private adminservice: AdminService,
        private parameterService: ParameterService,
        private communicationService: CommunicationService,
        private ngZone: NgZone, private router: Router,
        public dialog: MatDialog,
    ) { }


    ngOnInit() {
        let user = this.userService.GetCurrentCurrentUserNow()
        this.user = user
        
     
        this.form.valueChanges.subscribe(() => console.log(this.form))
        this.formImage = new FormGroup({
            CedulaDelantera: new FormControl(null, Validators.required),
            CedulaTrasera: new FormControl(null, Validators.required),
            Servicios: new FormControl(null, Validators.required),
            Contrato: new FormControl(null, Validators.required),
            Inscripcion: new FormControl(null, Validators.required),
        });
        
        this.clienteService.CedulaValida(user.Cedula).subscribe(x => {
            this.cedulaValida = x
        })
        this.adminservice.ObtenerDatosPDF(user.Cedula).subscribe(x => {
            this.form.controls["Genero"].setValue(x.SEXO)
            if(x.TIPODOCUMENTO==1){
                this.tipocedula = "C"; 
            }else if(x.TIPODOCUMENTO == 4){
                this.tipocedula = "E"; 
            }
                      
            this.form.controls["TipoCedula"].setValue(Number(x.TIPODOCUMENTO))
            this.form.controls["SegundoNombre"].setValue(x.NOMBRE2)
            this.form.controls["PrimerApellido"].setValue(x.APELLIDO1)
            this.form.controls["SegundoApellido"].setValue(x.APELLIDO2)
            this.form.controls["PrimerNombre"].setValue(x.NOMBRE1)
        }
        )
        const sessionUser = this.userService.GetCurrentCurrentUserNow()
        this.form.controls["Nacionalidad"].setValue("Ecuatoriana")
        let objClienteResquest: E_Cliente = new E_Cliente()
        objClienteResquest.Nit = sessionUser.Cedula
        objClienteResquest.Vendedor = sessionUser.IdVendedor
        this.clienteService.ValidaExisteEmpresariaNombre(objClienteResquest).subscribe((x) => {
            this.CalificacionC = x.ClasificacionC;
         
            this.form.controls["NumeroCedula"].setValue(x.DocumentoEmpresaria)
            this.form.controls["NumeroCelular1"].setValue(String(x.Celular1).trim())
            this.form.controls["Telefono1"].setValue(String(x.Telefono1).trim())
            this.form.controls["CorreoElectronico"].setValue(String(x.Email).trim())
        })
        this.parameterService.listarLider(user).subscribe(x => {
            let findedLeader = x.find(lider => lider.IdLider == String(user.IdLider).trim())
            if (!_.isNil(findedLeader)) {
                this.form.controls["Lider"].setValue(findedLeader.Nombres + ' ' + (!_.isNil(findedLeader.ApellidoUno) ? findedLeader.ApellidoUno : ""))
            } else {
                this.form.controls["Lider"].setValue(x[0].Nombres + ' ' + (!_.isNil(x[0].ApellidoUno) ? x[0].ApellidoUno : ""))
            }
        })
        const chainSubcriptions = []
        chainSubcriptions.push(this.parameterService.listarTipoDocumento(sessionUser))
        chainSubcriptions.push(this.parameterService.listarProvincia())
        this.communicationService.showLoader.next(true)
        forkJoin(chainSubcriptions).subscribe((response: [Array<E_TipoDocumento>, Array<E_Provincia>]) => {
            this.ListTipoDocumento = response[0];
            this.ListProvincia = response[1];
            this.communicationService.showLoader.next(false)
        })


        this.clienteService
            .ObtenerDireccionesXUsuario(user.Cedula)
            .subscribe((x: Array<DireccionXUsuario>) => {
                if (x.length == 0) {
                    this.mensageDireccion =
                        "No tienes ninguna dirección Asignada por favor actualiza tus datos";
                    this.validacionDirecciones = true
                }
            })





    }

    actualizarDatos() {

        this.router.navigate(['/ubicaciongeneral']);
    }
    enviarFormulario() {

        let pdfObj = new PdfInscripcion()
        const tipodoc = this.ListTipoDocumento.find(x => x.Id == this.form.controls.TipoCedula.value)
        pdfObj.TipoCedula = _.isNil(tipodoc) ? 'CÉDULA DE CIUDADANÍA' : tipodoc.Nombre
        pdfObj.NumeroCedula = this.form.controls.NumeroCedula.value
        pdfObj.PrimerNombre = this.form.controls.PrimerNombre.value
        pdfObj.SegundoNombre = this.form.controls.SegundoNombre.value
        pdfObj.PrimerApellido = this.form.controls.PrimerApellido.value
        pdfObj.SegundoApellido = this.form.controls.SegundoApellido.value
        pdfObj.FechaNacimiento = this.form.controls.FechaNacimiento.value
        pdfObj.Genero = this.form.controls.Genero.value
        pdfObj.Nacionalidad = this.form.controls.Nacionalidad.value
        pdfObj.Lider = this.form.controls.Lider.value

        pdfObj.Provincia = this.direccionseleccionada.NombreProvincia
        pdfObj.Parroquia = this.direccionseleccionada.NombreParroquia
        pdfObj.Canton = this.direccionseleccionada.NombreCanton
        pdfObj.DireccionDomicilio = this.direccionseleccionada.Direccion
        pdfObj.DetalleDireccion = this.direccionseleccionada.PuntoReferencia
        pdfObj.NumeroCelular1 = this.form.controls.NumeroCelular1.value
        pdfObj.Telefono1 = this.form.controls.Telefono1.value

        pdfObj.CorreoElectronico = this.form.controls.CorreoElectronico.value

        pdfObj.NombreCompleto = pdfObj.PrimerNombre + ' ' + pdfObj.SegundoNombre + ' ' + pdfObj.PrimerApellido + ' ' + pdfObj.SegundoApellido
        this.userService.ImprimirIncripcion(pdfObj).subscribe(x => {
            var newBlob = new Blob([x], { type: "application/pdf" });
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }
            const data = window.URL.createObjectURL(newBlob);
            var link = document.createElement('a');
            link.href = data;
            
            link.download = "Inscripcion.pdf";
           
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view:  window.open( data, "_blank") }));
            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });

        this.enviarContrato()
    }

    changeProvincia(y: MatSelectChange) {

        if (!_.isNil(y.value)) {


            this.parameterService.listarCanton(y.value).subscribe((x: Array<E_Canton>) => {
                this.ListCanton = x;
            });
        }
    }


    changeCanton(y: MatSelectChange) {

        if (!_.isNil(y.value)) {

            var objCanton: E_Canton = new E_Canton();
            objCanton.CodCiudad = y.value.CodCiudad.substring(3);
            objCanton.CodEstado = this.form.controls.Provincia.value.CodEstado.substring(1);

            this.parameterService.listarParroquia(objCanton)
                .subscribe((x: Array<E_Parroquia>) => {
                    this.ListParroquia = x;
                });
        }
    }

    requiredFileType(type: string, file: any): boolean {
        if (file) {
            const extension = file.name.split('.')[1].toLowerCase();
            if (type.toLowerCase() !== extension.toLowerCase()) {
                return false
            }

            return true;
        }

        return true;
    }



    uploadFileAndSetPreview(event, fieldname) {
        const file = event.target.files[0]

        if (file) {


            this.formImage.patchValue({
                [fieldname]: file
            });

            this.formImage.get(fieldname).updateValueAndValidity();

            const reader = new FileReader();
            reader.onload = () => {
                // this.preview = reader.result as string;
                // this.preview = this.sanitizer.bypassSecurityTrustUrl(reader.result as string) as string;
            }
            reader.readAsDataURL(file)

        } else {
            this.formImage.patchValue({
                file: ''
            });
            this.formImage.get(fieldname).updateValueAndValidity();
        }
    }
    guardarDocumentos() {


        let subjectRequest = new Subject()
        let counter = 0;
        let extensions = {}
        const controls = Object.keys(this.formImage.controls)
        controls.forEach(x => {
            let file = this.formImage.controls[x].value
            extensions[x] = '.' + file.name.split(".")[1].toLowerCase();
            this.clienteService.GuardarArchivoFTP(this.user.Cedula + x, file).subscribe((x) => {
                if (x) {
                    counter++
                }
                if (counter >= controls.length) {
                    subjectRequest.next(true)
                }
            })
        })

        this.communicationService.showLoader.next(true)
        subjectRequest.subscribe(() => {
            let inputSolicitud = new SolicitudCredito();
            inputSolicitud.Cedula = this.user.Cedula
            const repo = "https://www.lineadirectaec.com/lineadirectaec.com/imagenes/"
            inputSolicitud.DocumentoCedulaTrasera = repo + this.user.Cedula + "CedulaTrasera" + extensions["CedulaTrasera"]
            inputSolicitud.DocumentoCedulaDelantera = repo + this.user.Cedula + "CedulaDelantera" + extensions["CedulaDelantera"]
            inputSolicitud.DocumentoServicios = repo + this.user.Cedula + "Servicios" + extensions["Servicios"]
            inputSolicitud.DocumentoContrato = repo + this.user.Cedula + "Contrato" + extensions["Contrato"]
            inputSolicitud.DocumentoInscripcion = repo + this.user.Cedula + "Inscripcion" + extensions["Inscripcion"]
            inputSolicitud.NombreEmpresaria = this.form.controls.PrimerNombre.value + ' ' + this.form.controls.SegundoNombre.value + ' ' + this.form.controls.PrimerApellido.value + ' ' + this.form.controls.SegundoApellido.value

            let user = this.userService.GetCurrentCurrentUserNow()
            this.user = user
        
            let cli = new ValidarCredito();
            cli.nit = user.Cedula;

            this.adminservice.ValidarCreditos(cli).subscribe(x => {  
                if(x != null){
                    this.bandera = true;
                }else{
                    this.bandera = false;
                }
           
             if (this.bandera){

             

            let equis = new EquisfaxM();
            equis.Documento = this.user.Cedula;
            equis.tipodocumento=this.tipocedula;
            this.adminservice.equisfax(equis).subscribe(x => {                
                this.communicationService.showLoader.next(false)                
                if(x=="A"  || x=="ANL"){
                    this.equisfaxx="Estimada/o su calificación es A cupo de $80.00 se encuentra en estado pendiente de aprobación ";
                }else if(x=="AA"){
                    this.equisfaxx="Estimada/o su calificación es AA cupo de $150.00 se encuentra en estado pendiente de aprobación ";
                }else if(x=="AAA"){
                    this.equisfaxx="Estimada/o su calificación es AAA cupo de $200.00 se encuentra en estado pendiente de aprobación ";
                }else  if(x=="R"){
                    this.equisfaxx="Estimada/o su calificación es Rechazada por el momento no puede acceder al crédito, recuerde que puede obtener los mismos descuentos con sus compras de contado";
                } else {
                    this.equisfaxx="Estimada/o su calificación es Rechazada por el momento no puede acceder al crédito, recuerde que puede obtener los mismos descuentos con sus compras de contado";
                }  
                if(this.equisfaxx==""){
                    const ref = this.dialog.open(ModalPopUpComponent, {
                        panelClass: 'dialogInfocustom',
                        width: '450px',
                        data: { TipoMensaje: "Ok", Titulo: "Registro Solicitud Crédito", Mensaje: this.equisfaxx }
                    });
                    ref.afterClosed().subscribe(() => { this.router.navigate(['/principal']) })
                }  else{
                    this.adminservice.RegistrarSolicitudCredito(inputSolicitud).subscribe(x => {                              
                        this.communicationService.showLoader.next(false)
                        const ref = this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Ok", Titulo: "Registro Solicitud Crédito", Mensaje: this.equisfaxx }
                        });
                        ref.afterClosed().subscribe(() => { this.router.navigate(['/principal']) })
                    })
                }          
                
            })
        }else{
            this.equisfaxx="Tu solicitud de crédito se registro con exito"
            this.adminservice.RegistrarSolicitudCredito(inputSolicitud).subscribe(x => {                              
                this.communicationService.showLoader.next(false)
                const ref = this.dialog.open(ModalPopUpComponent, {
                    panelClass: 'dialogInfocustom',
                    width: '450px',
                    data: { TipoMensaje: "Ok", Titulo: "Registro Solicitud Crédito", Mensaje: this.equisfaxx }
                });
                ref.afterClosed().subscribe(() => { this.router.navigate(['/principal']) })
            })
        }
        })

    });
    }

    enviarContrato() {
        let pdfObj = new PdfContrato()
        pdfObj.CiudadContrato = this.direccionseleccionada.NombreCanton;
        pdfObj.Nacionalidad = this.form.controls.Nacionalidad.value;
        pdfObj.NombreCompleto = this.form.controls.PrimerNombre.value + ' ' + this.form.controls.SegundoNombre.value + ' ' + this.form.controls.PrimerApellido.value + ' ' + this.form.controls.SegundoApellido.value
        pdfObj.DireccionCompleta = this.direccionseleccionada.Direccion
        pdfObj.Cedula = this.form.controls.NumeroCedula.value;
        pdfObj.DiasContrato = moment(new Date()).format("DD");
        pdfObj.MesContrato = NombreMes.find(x => x.Valor == moment(new Date()).month()).Nombre;
        pdfObj.AnoContrato = moment(new Date()).format("YY");
        pdfObj.MesNumero = String(moment(new Date()).month() + 1)

        this.userService.ImprimirContrato(pdfObj).subscribe(x => {
            var newBlob = new Blob([x], { type: "application/pdf" });
            if (window.navigator && window.navigator.msSaveOrOpenBlob ) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }
            const data = window.URL.createObjectURL(newBlob);
            var link = document.createElement('a');
            link.href = data;
            link.download = "Contrato.pdf";
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window.open( data, "_blank")}));
            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });

    }

    onselectedAddress(event: DireccionXUsuario) {
        this.direccionseleccionada = event
        this.form.controls["DireccionDomicilio"].setValue(this.direccionseleccionada.Direccion)

    }
}
