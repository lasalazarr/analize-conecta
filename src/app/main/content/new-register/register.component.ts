import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { ModalPopUppreComponent } from '../ModalPopUppre/modalpopuppre.component';
import { NewRegisterService } from './new-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    Names: [undefined, Validators.required],
    Mobile: [undefined, Validators.required],
    Email: [undefined, [Validators.required, Validators.email]
    ],
  });

  get namesField(){
    return this.registerForm.controls['Names'];
  }
  get mobileField(){
    return this.registerForm.controls['Mobile'];
  }
  get emailField(){
    return this.registerForm.controls['Email'];
  }
  // UI
  errorMessage: string = '';
  pageIsLoad = false;
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private ExceptionErrorService: ExceptionErrorService,
    private newRegisterService: NewRegisterService
  ) { }

  ngOnInit(): void {
  }

  signUp() {
    if (this.registerForm.valid) {
      this.pageIsLoad = true;
      let model = {
        Names: this.registerForm.controls['Names'].value,
        Mobile: this.registerForm.controls['Mobile'].value,
        Email: this.registerForm.controls['Email'].value,
      }
      this.newRegisterService.register(
          model)
        .subscribe((res) => {
          this.pageIsLoad = false;
         // this.router.navigate(['/login']);
         this.bottomSheet.dismiss();   
         const dialogRef = this.dialog.open(ModalPopUppreComponent, {
          panelClass: 'dialogInfocustom',
          width: '450px',
          data: { TipoMensaje: "Confirmacion", Titulo: "Unete", Mensaje: "Registro exitoso." }

      });

      //---------------------------------------------------------------------------------------------------------------

        }, (error) => {
          console.error(error)
          this.pageIsLoad = false;

          this.errorMessage = "Error al intentar registra el nuevo usuario";
        });
    }
  }
}
