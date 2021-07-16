import { Component, ViewChild, OnInit , ElementRef} from '@angular/core';
import { PuntosService } from 'app/ApiServices/PuntosService';
import { E_Puntos } from 'app/Models/E_Puntos';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { CarteraReporteInfo } from '../../../../Models/CarteraReporteInfo';
import { AdminService } from 'app/ApiServices/AdminService';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { amchartsModel } from 'app/Models/amchartsModel';

@Component({
    moduleId: module.id,
    selector: 'reportecarterag',
    templateUrl: 'reportecarterag.component.html',
    styleUrls: ['reportecarterag.component.scss']
})
//
export class ReporteCarteraGComponent implements OnInit {
    public gridOptions: any;
  public gridColumnApi:any;
  public gridApi; 
  public frameworkComponents;
  public columnDefs;
  public rowData: Array<CarteraReporteInfo> = new Array<CarteraReporteInfo>();
  public rowData2: Array<CarteraReporteInfo> = new Array<CarteraReporteInfo>();



  constructor(private adminS:AdminService,private communicationService:CommunicationService) { }

    amchart(entrada: Array<CarteraReporteInfo>){
        am4core.useTheme(am4themes_animated);
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        let lista = new Array<amchartsModel>();
        
        
        lista.push({ Name:"Corriente",value:((entrada[0].Corriente/entrada[0].TotalGeneral)*100 )} );
        lista.push({ Name:"7_14",value:  ((entrada[0]._7_14/entrada[0].TotalGeneral)*100 )} );
        lista.push({ Name:"15_21",value: ((entrada[0]._15_21/entrada[0].TotalGeneral)*100 ) } );
        lista.push({ Name:"22_30",value: ((entrada[0]._22_30/entrada[0].TotalGeneral)*100 ) } );
        lista.push({ Name:"31",value: ((entrada[0]._31/entrada[0].TotalGeneral)*100 ) } );
        
        chart.data = lista;
        
        // Create axes
        
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "Name";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        
        categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
            if (target.dataItem && target.dataItem.index && 2 == 2) {
            return dy + 25;
            }
            return dy;
        });
        
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        
        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "Name";
        series.tooltipText = "{valueY.value}"
        series.name = "value";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.verticalCenter = "bottom";
        labelBullet.label.dy = -3;
        labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#,###.00')}";
        
        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
        this.communicationService.showLoader.next(false);
    }
  ngOnInit() {
    this.communicationService.showLoader.next(true);
    this.adminS.GetCarteraGeneral("A").subscribe(x=>{
      
      this.rowData = x.filter(x=>x.ESCREDITOEMP!="2")
      this.rowData2 = x.filter(x=>x.ESCREDITOEMP=="2")
      debugger
      this.amchart(this.rowData2);
    })


    this.columnDefs = [
      { headerName: 'ESCREDITOEMP', width:100,  field: 'ESCREDITOEMP' },
      { headerName: 'Corriente',    width:150,   field: 'Corriente' },
      { headerName: '_7_14',        width:150,   field: '_7_14' },
      { headerName: '_15_21',       width:150,   field: '_15_21' /*,cellRenderer: 'renderPuntosMontoComponent'*/},
      { headerName: '_22_30',       width:150,   field: '_22_30' /*,cellRenderer: 'renderPuntosMontoComponent'*/},
      { headerName: '_31',          width:150,   field: '_31' /*,cellRenderer: 'renderPuntosMontoComponent'*/},
      { headerName: 'TotalGeneral', width:150,   field: 'TotalGeneral' /*,cellRenderer: 'renderPuntosMontoComponent'*/}
    ];

    this.frameworkComponents = {
      //renderPuntosMontoComponent: RenderPuntosMontoComponent
    };

    /*this.frameworkComponents = {
      renderIpdatePuntopComponent: RenderIpdatePuntopComponent
    };*/
  }

  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;  
  }


}