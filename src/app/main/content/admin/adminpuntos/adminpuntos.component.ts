import { Component, OnInit } from '@angular/core';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Parametros } from 'app/Models/E_Parametros';
import { RenderIpdatePuntopComponent } from './render-update-puntop/render-update-puntop.component';

@Component({
  selector: 'app-adminpuntos',
  templateUrl: './adminpuntos.component.html',
  styleUrls: ['./adminpuntos.component.scss']
})
export class AdminpuntosComponent implements OnInit {

  public gridOptions: any;
  public gridColumnApi:any;
  public gridApi; 
  public frameworkComponents;
  public columnDefs;
  public rowData: Array<E_Parametros> = new Array<E_Parametros>();

  constructor(private servicioparametro: ParameterService) { }

  ngOnInit() {
    this.servicioparametro.listarParametros().subscribe(x=>{
      this.rowData = x.filter(x => x.Nombre.includes('punto') )
    })


    this.columnDefs = [
      { headerName: 'Id', width: 50,      field: 'Id' },
      { headerName: 'Nombre',width: 250,   field: 'Nombre' },
      { headerName: 'Valor',    field: 'Valor'},
      { headerName: 'Concepto', field: 'Concepto' },
      { headerName: 'Tipo', width: 90,     field: 'Tipo' },
      { headerName: 'Estado', width: 80,   field: 'Estado'},
      { headerName: 'Editar', width: 80,   field: 'Id',cellRenderer: 'renderIpdatePuntopComponent'}
    ];

    this.frameworkComponents = {
      renderIpdatePuntopComponent: RenderIpdatePuntopComponent
    };
  }

  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;  
  }

  openAdicionarArticulo(event){
    this.servicioparametro.listarParametros().subscribe(x=>{
      this.rowData = x.filter(x => x.Nombre.includes('punto') )
    })

  }

  cargarParemtrosPuntos(){
    this.servicioparametro.listarParametros().subscribe(x=>{
      this.rowData = x.filter(x => x.Nombre.includes('punto') )
    })

  }

}
