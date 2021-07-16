import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewChecked, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import _ from 'lodash';
import { E_Cliente } from 'app/Models/E_Cliente';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { UserService } from 'app/ApiServices/UserService';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { E_DepositoP } from 'app/Models/E_DepositoP';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import { E_SessionUser } from 'app/Models/E_SessionUser';
declare var google: any;
export interface DialogData {
    
    Pedido: string;
    Cedula: string;

    
}






@Component({
    moduleId: module.id,
    selector: 'registropago',
    templateUrl: 'registropago.component.html',
    styleUrls: ['registropago.component.scss'],
})
export class RegistroPagoComponent implements OnInit {

    form: FormGroup;
    FechaDocumento: any;
    SaveInProgress: boolean;
    public ListBanco: Array<any> = [
        {Id: "PICHINCHA",  Nombre: 'PICHINCHA CORRIENTE' },
        {Id: "GUAYAQUIL", Nombre: 'GUAYAQUIL' },
        {Id: "PRODUBANCO", Nombre: 'PRODUBANCO' },
        {Id: "INTERNACIONAL", Nombre: 'INTERNACIONAL' },
        {Id: "BOLIVARIANO", Nombre: 'BOLIVARIANO' },
        {Id: "PICHINCHAA", Nombre: 'PICHINCHA AHORRO' },
        {Id: "LOJA", Nombre: 'LOJA' },
        {Id: "RUMINAHUI", Nombre: 'RUMINAHUI' },
        {Id: "AMAZONAS", Nombre: 'AMAZONAS' },

    ];

    public ListTipo: Array<any> = [
        { Nombre: 'Depósito' },
        { Nombre: 'Transferencia' },
     

    ];
    public SessionUser: E_SessionUser = new E_SessionUser()
    formErrors: any;
    minDate: Date;
    public ExistenDocumento:boolean = true;
    public NumeroDocumento: string ='';
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private clienteService: ClienteService,
        private userService: UserService,
        private ExceptionErrorService: ExceptionErrorService,
        public dialogRef: MatDialogRef<RegistroPagoComponent>,
        private communicationService: CommunicationService,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.formErrors = {
            TipoDocumento: {},
            Banco: {},
            NumeroDocumento: {},
            MontoDocumento:{},
            FechaDocumento:{},
            Observaciones: {}
        };
        
    }



    ngOnInit() {

        
        this.minDate = new Date(1990, 0, 1);

        this.form = this.formBuilder.group({
            TipoDocumento:[undefined, [Validators.required]],
            Banco:  [undefined, [Validators.required]],
            NumeroDocumento: [undefined, [Validators.required]],
            MontoDocumento: [undefined, [Validators.required]],
            FechaDocumento:[undefined, [Validators.required]],
            Observaciones: ['']
        });
        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
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




    Guardar() {
     


        try {
            this.communicationService.showLoader.next(true);
            var objDeposito: E_DepositoP = new E_DepositoP();
            this.SessionUser = this.userService.GetCurrentCurrentUserNow()
            if (this.SessionUser.IdGrupo == "50" || this.SessionUser.IdGrupo == "80" || this.SessionUser.IdGrupo == "99") {
   
            objDeposito.Usuario = this.SessionUser.Cedula;
            }else{
                objDeposito.Usuario = this.data.Cedula;
            }
            

            objDeposito.TipoDocumento = this.form.value.TipoDocumento;
            objDeposito.Banco = this.form.value.Banco;
            objDeposito.Numero = this.form.value.NumeroDocumento;
            objDeposito.Monto = this.form.value.MontoDocumento;
            objDeposito.FechaDocumento = this.form.value.FechaDocumento;
            objDeposito.Observacion = this.form.value.Observaciones;
            objDeposito.Pedido = this.data.Pedido;
            var objDepositoResponse: E_DepositoP = new E_DepositoP();
            this.clienteService.RegistrarPago(objDeposito)
                .subscribe((x: E_DepositoP) => {
                    objDepositoResponse = x;
                    this.communicationService.showLoader.next(false);
                    if (x.Error == undefined) {
                        
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Ok", Titulo: "Registro Pago", Mensaje: "Se registro el pago exitosamente!" }
                        });
                        this.dialogRef.close();

                   
                    }
                    

                });

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.  
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                panelClass: 'dialogInfocustom',
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Registro Empresaria", Mensaje: "No se pudo guardar la empresaria." }
            });

            throw new ErrorLogExcepcion("RegistroEmpresariaEcComponent", "RegistrarEmpresaria()", error.message, this.data.Pedido, this.ExceptionErrorService);

            //---------------------------------------------------------------------------------------------------------------
        }

    }

  ValidateDocument(){
    var objDocumento: E_DepositoP = new E_DepositoP();
    var objDocumentoResp: E_DepositoP = new E_DepositoP();
    if (this.form.value.NumeroDocumento != '' && this.form.value.NumeroDocumento != undefined) {
        objDocumento.Numero = this.form.value.NumeroDocumento;
        this.clienteService.ValidaDeposito(objDocumento).subscribe((x: E_DepositoP)  => {
            objDocumentoResp = x;
        if (objDocumentoResp  !=  null) {

            this.ExistenDocumento= true;
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                                
                panelClass: 'dialogInfocustom',
                height: 'auto',
                data: { TipoMensaje: "", Titulo: "Atención", Mensaje: "El Documento "+ this.form.value.NumeroDocumento+" ya se encuentra registrado , por favor verificar." }
            });
            this.form.value.NumeroDocumento= '';
          
        }else{
            this.ExistenDocumento=false;
        }

        })
    }
    
}
Borrar(){
    this.form.setValue({
        NumeroDocumento:""
    });

}
}

