import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { PuntosService } from 'app/ApiServices/PuntosService';
import { E_PuntosConceptos } from '../../../../../Models/E_PuntosConceptos';
import { RenderConceptosComponent } from './render-conceptos/render-conceptos.component';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styleUrls: ['./conceptos.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class ConceptosComponent implements OnInit {

  public gridOptions: any;
  public gridColumnApi:any;
  public gridApi; 
  public frameworkComponents;
  public columnDefs;
  public rowData: Array<E_PuntosConceptos> = new Array<E_PuntosConceptos>();

  public Ids:number
  public Cadena:string
  public mensaje:string
  public visible:boolean=false

  constructor(private puntosS:PuntosService,private communicationService:CommunicationService) { }

  ngOnInit() {
    this.puntosS.ListarConceptosPuntos().subscribe(x=>{
      
      this.rowData = x
    })


    this.columnDefs = [
      { headerName: 'Id', width: 50,      field: 'Id_regla' },
      { headerName: 'Nombre',   field: 'Nombre' },
      { headerName: 'Editar',  field: 'Id_regla' ,cellRenderer: 'renderConceptosComponent'}
    ];

    this.frameworkComponents = {
      renderConceptosComponent: RenderConceptosComponent
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
    this.puntosS.ListarConceptosPuntos().subscribe(x=>{
      
      this.rowData = x
    })
  }

  Abrir(){
    this.visible=!this.visible;
  }
  Agregar(){
    this.communicationService.showLoader.next(true)

    this.mensaje=""
    let puntosC= new E_PuntosConceptos();
    puntosC.Id_regla=this.Ids
    puntosC.Nombre=this.Cadena
    this.puntosS.AgregarConcepto(puntosC).subscribe(x=>{
      this.communicationService.showLoader.next(false)
      if(!x){
        this.mensaje="Error. Intente de nuevo";
      }else{
        this.puntosS.ListarConceptosPuntos().subscribe(x=>{
          
          this.rowData = x
        })
      }
    })
  }

}
