import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { PuntosService } from 'app/ApiServices/PuntosService';
import { E_Puntos } from 'app/Models/E_Puntos';
import { RenderPuntosEstadoComponent } from './render-puntos-estado/render-puntos-estado.component';

@Component({
  selector: 'app-puntos-xestado',
  templateUrl: './puntos-xestado.component.html',
  styleUrls: ['./puntos-xestado.component.scss']
})
export class PuntosXEstadoComponent implements OnInit {

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
    this.puntosS.getTodaslasreglasPuntosporCategoria().subscribe(x=>{
      //debugger
      this.rowData = x
    })


    this.columnDefs = [
      { headerName: 'Id', width: 50,      field: 'Id_regla' },
      { headerName: 'Decripcion',width: 350,    field: 'Decripcion' },
      { headerName: 'Puntos',width: 100,   field: 'Puntos' },
      { headerName: 'Bono puntos', width: 100,  field: 'Bonopuntos' },
      { headerName: 'Estado empresaria',width: 150,   field: 'Valor_unidades_a' },
      { headerName: 'Editar',   field: 'Id_regla' ,cellRenderer: 'renderPuntosEstadoComponent'}
    ];

    this.frameworkComponents = {
      renderPuntosEstadoComponent: RenderPuntosEstadoComponent
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
    this.puntosS.getTodaslasreglasPuntosporCategoria().subscribe(x=>{
      
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
    puntosC.Bonopuntos=this.Monto
    puntosC.Puntos=this.Puntos
    this.puntosS.agregarNivelPuntosCantidad(puntosC).subscribe(x=>{
      this.communicationService.showLoader.next(false)
      if(!x){
        this.mensaje="Error. Intente de nuevo";
      }else{
        this.puntosS.getTodaslasreglasPuntosporCategoria().subscribe(x=>{
      
          this.rowData = x
        })
      }
    })
  }

}
