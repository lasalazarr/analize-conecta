import { Component, ViewChild, OnInit ,Inject, ElementRef} from '@angular/core';
import { PuntosService } from 'app/ApiServices/PuntosService';
import { E_Puntos } from 'app/Models/E_Puntos';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { CarteraReporteInfo } from '../../../../../Models/CarteraReporteInfo';
import { AdminService } from 'app/ApiServices/AdminService';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { amchartsModel } from 'app/Models/amchartsModel';
import { CarteraReportePrimeNG } from 'app/Models/CarteraReportePrimeNG';
import { CarteraReportePerfil } from 'app/Models/CarteraReportePerfil';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';




@Component({
    moduleId: module.id,
    selector: 'render2carteracoor',
    templateUrl: 'render2-cartera-coor.component.html',
    styleUrls: ['render2-cartera-coor.component.scss']
})
//
export class Render2CarteraCoorComponent implements OnInit {
    public gridOptions: any;
  public gridColumnApi:any;
  public gridApi; 
  public frameworkComponents;
  public columnDefs;
  public rowData: Array<CarteraReportePerfil> = new Array<CarteraReportePerfil>();
  public params : any 

  public cols: any[];


  constructor(private adminS:AdminService,private communicationService:CommunicationService,public dialogRef: MatDialogRef<Render2CarteraCoorComponent>,@Inject(MAT_DIALOG_DATA) public data: any
  ,private puntosS:PuntosService) { }
  ngOnInit() {
    debugger
    this.params = this.data.data.objeto.SubLista; 
    this.communicationService.showLoader.next(true);
    
      this.rowData = this.params
      this.communicationService.showLoader.next(false);
    

    this.columnDefs = [
      { headerName: 'Director',  field: 'Director' },
      { headerName: 'Corriente',    width:100,   field: 'Corriente' },
      { headerName: '_7_14',        width:100,   field: '_7_14' },
      { headerName: '_15_21',       width:100,   field: '_15_21' /*,cellRenderer: 'renderPuntosMontoComponent'*/},
      { headerName: '_22_30',       width:100,   field: '_22_30' /*,cellRenderer: 'renderPuntosMontoComponent'*/},
      { headerName: '_31',          width:100,   field: '_31' /*,cellRenderer: 'renderPuntosMontoComponent'*/},
      { headerName: 'TotalGeneral', width:100,   field: 'TotalGeneral' /*,cellRenderer: 'renderPuntosMontoComponent'*/},
      { headerName: 'Corriente%',    width:100,   field: 'CorrientePor' },
      { headerName: '_7_14%',        width:100,   field: '_7_14Por' },
      { headerName: '_15_21%',       width:100,   field: '_15_21Por' /*,cellRenderer: 'renderPuntosMontoComponent'*/},
      { headerName: '_22_30%',       width:100,   field: '_22_30Por' /*,cellRenderer: 'renderPuntosMontoComponent'*/},
      { headerName: '_31%',          width:100,   field: '_31Por' /*,cellRenderer: 'renderPuntosMontoComponent'*/},
    ];
/*
    this.frameworkComponents = {
      renderCarteraCoorComponent: RenderCarteraCoorComponent
    };

    this.frameworkComponents = {
      renderCarteraCoorComponent: RenderCarteraCoorComponent
    };*/
  }

  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;  
  }

cerrar(){
  this.dialogRef.close();
}
}