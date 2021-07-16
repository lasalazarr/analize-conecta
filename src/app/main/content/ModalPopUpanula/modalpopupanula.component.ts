import { Component, Inject,ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import _ from 'lodash';


export interface DialogData {
    Titulo: string;
    Mensaje: string;
    TipoMensaje: string;
    NumeroPedidoReservado: string;
    FechaCreacion: string;
    Nit: string;
    BotonPago: boolean;
}

@Component({
  selector: 'modalpopupanula',
  templateUrl: 'modalpopupanula.component.html',
  styleUrls: ['modalpopupanula.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class ModalPopUpAnulaComponent implements OnInit {
  TextColor: any
  formErrors: any;
  form: FormGroup;
  public SessionUser: E_SessionUser = new E_SessionUser();
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  public ListMotivo: Array<any> = [
    { Id: "1", Nombre: 'Agregar prenda' },
    { Id: "2", Nombre: 'Quitar prenda' },
    { Id: "3", Nombre: 'Otro' },
    

];
  constructor(private formBuilder: FormBuilder,
    private Matdialog: MatDialog,
    private Router: Router,
    private PedidoService: PedidoService,
    private ExceptionErrorService: ExceptionErrorService,
    private UserService: UserService,
    public dialogRef: MatDialogRef<ModalPopUpAnulaComponent>,
    public dialog: MatDialog,
    /* conflicto @Inject(MAT_BOTTOM_SHEET_DATA) public data2: DialogData, */
    @Inject(MAT_DIALOG_DATA) public data: E_PedidosCliente) {
        this.formErrors = {
            MotivoAnulacion: {}
        };
     }

  ngOnInit() {
    this.SessionUser = this.UserService.GetCurrentCurrentUserNow()

    this.form = this.formBuilder.group({
        MotivoAnulacion: [undefined, [Validators.required]],
       

    });

  }

  Anular() {
    this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {panelClass: 'dialogInfocustom'});
    this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar Anulacion?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result) { this.EnviarInfo(); }
        this.confirmDialogRef = null;
    });

}

EnviarInfo(){

    var objPedidoRequest: E_PedidosCliente = new E_PedidosCliente()
    var objPedidoResponse: E_PedidosCliente = new E_PedidosCliente()
    objPedidoRequest.Numero = this.data.Numero;
    objPedidoRequest.Usuario = this.SessionUser.Cedula.trim() +' '+ this.SessionUser.NombreUsuario.trim() ;
    objPedidoRequest.MotivoAnulacion = this.form.value.MotivoAnulacion;


            this.PedidoService.AnulacionPedido(objPedidoRequest)
                .subscribe((x: E_PedidosCliente) => {
                    objPedidoResponse = x;
                    if (x.Error == undefined) {
                        //Mensaje de OK
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Ok", Titulo: "Anulación de Pedido", Mensaje: "Se registro la anulación de pedido exitosamente!" }
                        });

                        this.dialogRef.close();
                        this.Router.navigate(["/mispedidosanulados/"])
                   
                    }
                    else {
                        //---------------------------------------------------------------------------------------------------------------
                        //Mensaje de Error. 
                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            panelClass: 'dialogInfocustom',
                            width: '450px',
                            data: { TipoMensaje: "Error", Titulo: "Anulación de Pedido", Mensaje: "No se pudo Anular el Pedido." }
                        });

                        throw new ErrorLogExcepcion("AnulacionPedidoComponent", "CrearUsuarioyClave()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService);
                        //---------------------------------------------------------------------------------------------------------------
                    }
                });
}

  onNoClick(): void {
    this.dialogRef.close();
  }
    
}
