import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { PuntosService } from 'app/ApiServices/PuntosService';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public params : any 
  public tipoO:number
  public valor:string

  public puntos:number
  public bonopunto:number
  constructor(public dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any
  ,private parametroService:ParameterService,private puntosS:PuntosService) { }

  ngOnInit() {
   // debugger
    this.params = this.data.data.objeto; 
    this.tipoO = this.data.data.tipoO
    if(this.tipoO==1){
      this.valor = this.params.Valor
    }else if(this.tipoO==2){
      this.valor = this.params.Nombre
    }else if(this.tipoO==5){
      this.puntos = this.params.Puntos
      this.bonopunto = this.params.Bonopuntos
    }
  }

  Aceptar(){
    //debugger
    if(this.tipoO==1){
      this.params.Valor = this.valor
      this.parametroService.UpdateParametro(this.params).subscribe(x=>{
        if(x){
          this.dialogRef.close({resultado:true});
        }else{
          
        }
      })
    }else if(this.tipoO==2){
      this.params.Nombre =this.valor 
      this.puntosS.actualizarConcepto(this.params).subscribe(x=>{
        if(x){
          this.dialogRef.close({resultado:true});
        }else{
          
        }
      })
    }else if(this.tipoO==3){
      this.params.Nombre =this.valor 
      this.puntosS.eliminarNivelPuntos(this.params).subscribe(x=>{
        if(x){
          this.dialogRef.close({resultado:true});
        }else{
          
        }
      })
    }else if(this.tipoO==4){
      this.params.Nombre =this.valor 
      this.puntosS.eliminarNivelPuntosCantidad(this.params).subscribe(x=>{
        if(x){
          this.dialogRef.close({resultado:true});
        }else{
          
        }
      })
    }else if(this.tipoO==5){
      this.params.Puntos =this.puntos 
      this.params.Bonopuntos =this.bonopunto 
      this.puntosS.actualizarRegla2(this.params).subscribe(x=>{
        if(x){
          this.dialogRef.close({resultado:true});
        }else{
          
        }
      })
    }
    
  }

  Cancelar(){
    this.dialogRef.close({resultado:false});
  }

}
