import {
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
    AfterViewChecked,
    Input,
} from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from "@angular/forms";
import _ from "lodash";
import { E_Cliente } from "app/Models/E_Cliente";
import { ClienteService } from "app/ApiServices/ClienteService";
import { UserService } from "app/ApiServices/UserService";
import { CommunicationService } from "app/ApiServices/CommunicationService";
import { ModalPopUpComponent } from "../ModalPopUp/modalpopup.component";
import { MatDialog, MatBottomSheet } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { mergeMap } from "rxjs/operators";
import { ConfirmAdressComponent } from "@fuse/components/confirm-adress/confirm-adress.component";
import * as XLSX from 'xlsx';
import { E_Puntos } from 'app/Models/E_Puntos';
import { AdminService } from 'app/ApiServices/AdminService';
import { E_CatalogoFile } from 'app/Models/E_CatalogoFile';


@Component({
    moduleId: module.id,
    selector: "subircatalogo",
    templateUrl: "subircatalogo.component.html",
    styleUrls: ["subircatalogo.component.scss"],
})
export class SubirCatalogoComponent implements OnInit {
   

    public mensaje2:string
    public mensaje3:string
    public mostrar:boolean
    public arrayBuffer:any;
    public file:File;
    public archivo : any;
    public masivo:Array<E_CatalogoFile> = new Array<E_CatalogoFile>();
    // Horizontal Stepper
    constructor(
        private formBuilder: FormBuilder,
        private clienteService: ClienteService,
        private userService: UserService,
        private communicationService: CommunicationService,
        private dialog: MatDialog,
        private bottomSheet: MatBottomSheet,
        private activatedroute: ActivatedRoute,private AdminService:AdminService
    ) {
        
    }

    ngOnInit() {
        
    }
    

    incomingfile(event) 
  {
    this.file= event.target.files[0]; 

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        this.archivo = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        console.log(this.archivo);
        let puntos= new E_CatalogoFile();
 
        this.archivo.forEach(element => {
          
          puntos= new E_CatalogoFile()    
          puntos.Catalogo = element.Catalogo;  
          puntos.Estado = element.Activo; 
          puntos.Categoria = element.CATEGORIA;
          puntos.CatalogoReal = element.CatalogoReal;  
          puntos.Ciclo = element.Ciclo;  
          puntos.Genero = element.GENERO;   
          puntos.Grupo = element.GRUPO ;   
          puntos.Nombre = element.NOMBRE;    

          puntos.Orden = element.Orden; 
          puntos.Pagina = element.PAGINA; 
          puntos.Publico = element.PPUBLICO; 
          puntos.Plu = element.Plu; 
          puntos.PrecioPuntos = element.PrecioPuntos; 
          puntos.Puntos = element.Puntos; 
          puntos.Referencia = element.Referencia; 
          puntos.VisibleApp = element.VisibleAPP; 
          puntos.IdCorto = element.id_corto;    
         
          this.masivo.push(puntos);
        });


    }
    fileReader.readAsArrayBuffer(this.file);
  }

  CargarArchivo() {
    this.communicationService.showLoader.next(true)
     this.mensaje2=""
     if(this.masivo !== null){
       this.AdminService.SubirCatalogo(this.masivo).subscribe(x=>{
        this.communicationService.showLoader.next(false)
         if(x){
          const dialogRef = this.dialog.open(ModalPopUpComponent, {
            width: '450px',
            data: { TipoMensaje: "Exito", Titulo: "Subir catalogo", Mensaje: "Exito el cargar el catalogo" }
        });
         }else{
          const dialogRef = this.dialog.open(ModalPopUpComponent, {
            width: '450px',
            data: { TipoMensaje: "Error", Titulo: "Subir catalogo", Mensaje: "Error al cargar el catalogo. Intente de nuevo." }
        });
         }
       })
     }  
  }
}
