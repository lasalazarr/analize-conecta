import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { PuntosService } from 'app/ApiServices/PuntosService';
import { E_Puntos } from 'app/Models/E_Puntos';
import { E_PuntosConceptos } from '../../../../../Models/E_PuntosConceptos';
import { RenderConceptosComponent } from './render-cargue-puntos/render-cargue-puntos.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cargue-puntos',
  templateUrl: './cargue-puntos.component.html',
  styleUrls: ['./cargue-puntos.component.scss'],
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
export class CarguePuntosComponent implements OnInit {

  public gridOptions: any;
  public gridColumnApi:any;
  public gridApi; 
  public frameworkComponents;
  public columnDefs;
  public rowData: Array<E_PuntosConceptos> = new Array<E_PuntosConceptos>();
  public listaConcepto: Array<E_PuntosConceptos> = new Array<E_PuntosConceptos>();

  public Ids:number
  public Cadena:string
  public mensaje:string
  public visible:boolean=false

  public Nit:number
  public PuntosP:number
  public PuntosG:number
  public PuntosR:number
  public PuntosE:number

  public PuntosN:string
  public PuntosC:string
  public SumaResta:string

  public PuntosCC:string

  public ListaPuntoDetalle:Array<E_Puntos> = new Array<E_Puntos>();
  public PuntosEmpre:E_Puntos

  public arrayBuffer:any;
  public file:File;
  public archivo : any;

  public mensaje2:string
  public mensaje3:string
  public mostrar:boolean

  public masivo:Array<E_Puntos> = new Array<E_Puntos>();
  public listaConcepto2: Array<E_PuntosConceptos> = new Array<E_PuntosConceptos>();
  constructor(private puntosS:PuntosService,private communicationService:CommunicationService) { }

  ngOnInit() {
    this.puntosS.ListarConceptosPuntos().subscribe(x=>{
      this.listaConcepto = x  
       let punto1:E_PuntosConceptos;
       punto1 ={ Id_regla:1,Nombre:"Empresarias inactivas"};
       let punto2:E_PuntosConceptos;
       punto2 ={ Id_regla:2,Nombre:"Pedidos anulados"};
       let punto3:E_PuntosConceptos;
       punto3 ={ Id_regla :3,Nombre:"Pedidos Pagos"};
       let punto4:E_PuntosConceptos;
       punto4 ={ Id_regla:4,Nombre:"Pedidos con devoluciones"};
       this.listaConcepto2.push(punto1)
       this.listaConcepto2.push(punto2)
       this.listaConcepto2.push(punto3)
       this.listaConcepto2.push(punto4)
       
      
    })


    this.columnDefs = [
      { headerName: 'IdPedido', width: 150,      field: 'IdPedido' },
      { headerName: 'Concepto',   field: 'Concepto' },
      { headerName: 'Fecha',   field: 'Fecha2' },
      { headerName: 'Campana',  field: 'Campana' /*,cellRenderer: 'renderConceptosComponent'*/},
      { headerName: 'Tipo',   field: 'Nombre' },
      { headerName: 'Puntos',   field: 'Puntos' }
    ];

   

    /*this.frameworkComponents = {
      renderIpdatePuntopComponent: RenderIpdatePuntopComponent
    };*/
  }

  Procesar(){
    this.mensaje3="";
    let puntoss = new E_Puntos()
    puntoss.Id_regla=+this.PuntosCC
    this.puntosS.HacerPuntos(puntoss).subscribe(x=>{
      if(x){
        this.mostrar = true;
        this.mensaje3="Proceso de puntos lanzado.";
      }else{
        this.mostrar = false;
        this.mensaje3="Error. Intente de nuevo";
      }
    })
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
    let puntos= new E_Puntos();
    puntos.IdPedido="N/A"
    puntos.Nombre=this.Nit.toString()
    puntos.Puntos = +this.PuntosN
    puntos.Concepto=this.PuntosC.toString()
    puntos.Tipo=this.SumaResta.toString()

    if(this.PuntosN !=='' && this.SumaResta !=='' && this.PuntosC !==''){
      this.puntosS.insertarMovimientoPuntosGenerico(puntos).subscribe(x=>{
        this.communicationService.showLoader.next(false)
        if(!x){
          this.mensaje="Error. Intente de nuevo";
        }else{
          this.puntosS.getTodosMovimientoPuntosPorEmpresaria(this.Nit.toString()).subscribe(x=>{
            this.ListaPuntoDetalle = x
            this.puntosS.getTotalPuntosPorEmpresaria(this.Nit.toString()).subscribe(x=>{
              this.PuntosEmpre = x
              this.PuntosP = x.PuntosSinPagar
              this.PuntosE = x.PuntosEfectivos
              this.PuntosR = x.PuntosRedimidos
             
            })
          })
        }
      })
    }
    
  }

  BuscarNit(){
    this.puntosS.getTodosMovimientoPuntosPorEmpresaria(this.Nit.toString()).subscribe(x=>{
     // debugger
      this.rowData = x
      this.puntosS.getTotalPuntosPorEmpresaria(this.Nit.toString()).subscribe(x=>{
        this.PuntosEmpre = x
        this.PuntosP = x.PuntosSinPagar
        this.PuntosE = x.PuntosEfectivos-x.PuntosRedimidos
        this.PuntosR = x.PuntosRedimidos
       
      })
    })
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
        let puntos= new E_Puntos();
 
        this.archivo.forEach(element => {
          //debugger
          puntos= new E_Puntos()
          puntos.IdPedido=element.Documento
          puntos.Nombre=element.Nit
          puntos.Puntos = element.Cantidad
          puntos.Concepto="4"
          puntos.Tipo=element.Tipo
          this.masivo.push(puntos);
        });


    }
    fileReader.readAsArrayBuffer(this.file);
  }

  CargarArchivo() {
    this.mensaje2=""
    if(this.masivo !== null){
      this.puntosS.insertarMovimientoPuntosGenericoList(this.masivo).subscribe(x=>{
        if(x){
          this.mostrar=true;
          this.mensaje2="Exito al cargar el archivo."
        }else{
          this.mostrar=false;
          this.mensaje2="Error. Intente de nuevo."
        }
      })
    }  
  }

}
