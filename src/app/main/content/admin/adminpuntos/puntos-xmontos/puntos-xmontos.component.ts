import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { PuntosService } from 'app/ApiServices/PuntosService';
import { E_Puntos } from 'app/Models/E_Puntos';
import { RenderPuntosMontoComponent } from './render-puntos-monto/render-puntos-monto.component';

@Component({
  selector: 'app-puntos-xmontos',
  templateUrl: './puntos-xmontos.component.html',
  styleUrls: ['./puntos-xmontos.component.scss']
})
export class PuntosXMontosComponent implements OnInit {

  public gridOptions: any;
  public gridColumnApi:any;
  public gridApi; 
  public frameworkComponents;
  public columnDefs;
  public rowData: Array<E_Puntos> = new Array<E_Puntos>();

  public Puntos:number
  public Monto:number
  public mensaje:string
  public visible:boolean=false

  constructor(private puntosS:PuntosService,private communicationService:CommunicationService) { }

  ngOnInit() {
    this.puntosS.getNivelesPuntos().subscribe(x=>{
      
      this.rowData = x
    })


    this.columnDefs = [
      { headerName: 'Id', width: 50,      field: 'Id_regla' },
      { headerName: 'Monto',    field: 'Valor_decimal_a' },
      { headerName: 'Puntos',   field: 'Puntos' },
      { headerName: 'Editar',   field: 'Id_regla' ,cellRenderer: 'renderPuntosMontoComponent'}
    ];

    this.frameworkComponents = {
      renderPuntosMontoComponent: RenderPuntosMontoComponent
    };

    /*this.frameworkComponents = {
      renderIpdatePuntopComponent: RenderIpdatePuntopComponent
    };*/
  }

  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;  
  }

  openAdicionarArticulo(event){
    alert('sisas')
  }

  cargarParemtrosPuntos(){
    this.puntosS.getNivelesPuntos().subscribe(x=>{
      
      this.rowData = x
    })
  }

  Abrir(){
    this.visible=!this.visible;
  }
  Agregar(){
    this.communicationService.showLoader.next(true)

    this.mensaje=""
    let puntosC= new E_Puntos();
    puntosC.Monto=this.Monto
    puntosC.Puntos=this.Puntos
    this.puntosS.agregarNivelPuntos(puntosC).subscribe(x=>{
      this.communicationService.showLoader.next(false)
      if(!x){
        this.mensaje="Error. Intente de nuevo";
      }else{
        this.puntosS.getNivelesPuntos().subscribe(x=>{
      
          this.rowData = x
        })
      }
    })
  }

}
