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
import { ActivatedRoute } from '@angular/router';
export interface DialogData {
    purchaseVerification: string;
    acquirerId: string;
    idCommerce: string;
    purchaseOperationNumber: string;
    purchaseAmount: boolean;
    purchaseCurrencyCode: string;
    errorCode: string;
    errorMessage: string;
    bin: string;
    brand: string;
    paymentReferenceCode: string;
    reserved1: string;
    reserved22: string;
    reserved23: string;
   
  }

@Component({
    moduleId: module.id,
    selector: 'recepcionvos',
    templateUrl: 'recepcionvpos.component.html',
    styleUrls: ['recepcionvpos.component.scss']
})
export class RecepcionVposComponent implements OnInit {

public value: string;
public bin: string;
public brand: string;
public errorMessage: string;
public errorCode: string;
public authorizationCode :string;
  public paymentReferenceCode
  public reserved1
  public reserved22
  public reserved23
  public purchaseOperationNumber
  public purchaseAmount
  public recibo
  public SucceSave:boolean = false;
  public SucceSave1:boolean = false;
    constructor(public dialog: MatDialog, public parametrosservice: ParameterService,
        private userService: UserService,
        private Matdialog: MatDialog,
        private route: ActivatedRoute,
        private ClienteService: ClienteService,
        private ExceptionErrorService: ExceptionErrorService,
        private CommunicationService: CommunicationService,
        private _formBuilder: FormBuilder,
        private clienteservice: ClienteService, ) {
        
    }


    ngOnInit() {
        this.route.queryParamMap.subscribe(queryParams => {
            this.value = queryParams.get("purchaseVerification")
            this.errorCode = queryParams.get("errorCode")
            this.errorMessage = queryParams.get("errorMessage")
            this.authorizationCode = queryParams.get("authorizationCode")
            this.bin = queryParams.get("bin")
            this.brand = queryParams.get("brand")
            this.paymentReferenceCode = queryParams.get("paymentReferenceCode")
            this.reserved1 = queryParams.get("reserved1")
            this.reserved22 = queryParams.get("reserved22")
            this.reserved23 = queryParams.get("reserved23")
            this.purchaseOperationNumber = queryParams.get("purchaseOperationNumber")
            this.purchaseAmount = queryParams.get("purchaseAmount")
            this.recibo = queryParams.get("recibo")
            if (this.errorCode=="00"){
                this.SucceSave = true;
                this.SucceSave1 = false;
            }else{
                this.SucceSave1 = true;
                this.SucceSave = false;
            }

          })
    }

}


