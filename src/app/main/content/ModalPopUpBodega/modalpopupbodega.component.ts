import { Component, Inject,ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ParameterService } from 'app/ApiServices/ParametersServices';
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
import { E_Bodegas } from 'app/Models/E_Bodegas';


export interface DialogData {
    Titulo: string;
    Bodega: string;
  
}
export interface ReturnsData {
    
  
  Bodega: string
  NombreBodega:string
  
}
@Component({
  selector: 'modalpopupbodega',
  templateUrl: 'modalpopupbodega.component.html',
  styleUrls: ['modalpopupbodega.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class ModalPopUpBodegaComponent implements OnInit {
  TextColor: any
  formErrors: any;
  form: FormGroup;
  public ReturnData: ReturnsData;
  public ListBodega: Array<E_Bodegas> = new Array<E_Bodegas>();
  public objBodega : E_Bodegas = new E_Bodegas();
  public SessionUser: E_SessionUser = new E_SessionUser();
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  public ListMotivo: Array<any> = [
    { Id: "1", Nombre: 'Agregar prenda' },
    { Id: "2", Nombre: 'Quitar prenda' },
    { Id: "3", Nombre: 'Otro' },
    

];
  constructor(private formBuilder: FormBuilder,
    private Matdialog: MatDialog,
    private ParameterService: ParameterService,
    private Router: Router,
    private PedidoService: PedidoService,
    private ExceptionErrorService: ExceptionErrorService,
    private UserService: UserService,
    public dialogRef: MatDialogRef<ModalPopUpBodegaComponent>,
    public dialog: MatDialog,
    /* conflicto @Inject(MAT_BOTTOM_SHEET_DATA) public data2: DialogData, */
    @Inject(MAT_DIALOG_DATA) public data: E_PedidosCliente) {
        this.formErrors = {
            MotivoAnulacion: {}
        };
     }

  ngOnInit() {
    this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
    this.ParameterService.listarBodegaReserva(this.objBodega)
    .subscribe((x: Array<E_Bodegas>) => {
        this.ListBodega = x
    })
    this.form = this.formBuilder.group({
        MotivoAnulacion: [undefined, [Validators.required]],
       

    });

  }

  Anular() {
  //  this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {panelClass: 'dialogInfocustom'});
  //  this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar Anulacion?';
  //  this.confirmDialogRef.afterClosed().subscribe(result => {
  //      if (result) { this.EnviarInfo(); }
  //      this.confirmDialogRef = null;
  //  });
  this.ReturnData = {Bodega:  this.objBodega.Bodega, NombreBodega: this.objBodega.Nombre}
  this.dialogRef.close(this.ReturnData);

}

SelectedDespacharA(y) {

  this.objBodega = y.value;
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
