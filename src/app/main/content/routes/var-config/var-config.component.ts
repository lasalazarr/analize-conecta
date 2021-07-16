import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatListOption, MatSelectionList } from '@angular/material';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Parametros } from 'app/Models/E_Parametros';
import { ModalPopUpComponent } from '../../ModalPopUp/modalpopup.component';

@Component({
  selector: 'app-var-config',
  templateUrl: './var-config.component.html',
  styleUrls: ['./var-config.component.scss']
})
export class VarConfigComponent implements OnInit {

  @ViewChild(MatSelectionList, { })
  private selectionList: MatSelectionList;
  time: number = null;
  distance: number = null;
  stops: number = null;
  result: string = null;
  parameters: E_Parametros[] = [];
  filteredParameters: E_Parametros[] = [];
  selectedVar:E_Parametros = new E_Parametros();
  readonly kmDeliveryParamId: number = 82;
  readonly timeDeliveryParamId: number = 95;
  readonly stopDeliveryParamId: number = 96;
  kmDeliveryParam: E_Parametros;
  timeDeliveryParam: E_Parametros;
  stopDeliveryParam: E_Parametros;
  filter:string = '';

  constructor(private dialog: MatDialog,
              private paramSrv: ParameterService,
              private communicationSrv: CommunicationService) { }

  ngOnInit() {
    this.communicationSrv.showLoader.next(true);
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.paramSrv.listarParametros().toPromise().then(paramenters => {
      this.parameters = paramenters.sort((a, b) => {
        return a.Nombre.charCodeAt(0) - b.Nombre.charCodeAt(0);
      });
      
      this.filteredParameters = this.parameters;
      this.kmDeliveryParam = this.parameters.find(x => x.Id == this.kmDeliveryParamId);
      this.timeDeliveryParam = this.parameters.find(x => x.Id == this.timeDeliveryParamId);
      this.stopDeliveryParam = this.parameters.find(x => x.Id == this.stopDeliveryParamId);
      this.communicationSrv.showLoader.next(false);
    });
  }

  calc() {
    if (this.time != null && this.distance != null && this.stops != null)
    {
      let value = (this.time * parseFloat(this.timeDeliveryParam.Valor)) + (this.distance * parseFloat(this.kmDeliveryParam.Valor)) + (this.stops * parseFloat(this.stopDeliveryParam.Valor));
      this.result = '$ ' + value.toFixed(2);
    }
    else
    {
      this.result = null;
      this.dialog.open(ModalPopUpComponent, {
        panelClass: "dialogInfocustom",
        width: "450px",
        data: {
          TipoMensaje: "",
          Titulo: "Mensaje",
          Mensaje: 'Por favor introduce el valor de las variables',
        },
      });
    }
  }

  onItemSelect(param:E_Parametros, list:MatSelectionList) {
    if (list.selectedOptions.selected.length > 0)
      this.selectedVar = param;
    else
      this.selectedVar = new E_Parametros();
  }

  filterVars() {
    this.filteredParameters = this.parameters;
    if (this.filter != undefined && this.filter != null && this.filter != '')
    {
      this.filteredParameters = this.parameters.filter(x => {
        return x.Nombre.toLowerCase().includes(this.filter.toLowerCase());
      });
    }
  }

  save() {
    this.communicationSrv.showLoader.next(true);
    if (this.selectedVar.Id == null || this.selectedVar.Id == undefined)
    {
      this.paramSrv.AddParameter(this.selectedVar).then(response => {
        this.paramSrv.listarParametros().toPromise().then(paramenters => {
          this.parameters = paramenters.sort((a, b) => {
            return a.Nombre.charCodeAt(0) - b.Nombre.charCodeAt(0);
          });
          
          this.filteredParameters = this.parameters;
          this.selectedVar = new E_Parametros();
          this.communicationSrv.showLoader.next(false);

          this.dialog.open(ModalPopUpComponent, {
            panelClass: "dialogInfocustom",
            width: "450px",
            data: {
              TipoMensaje: "",
              Titulo: "Mensaje",
              Mensaje: 'Parámetro creado correctamente',
            },
          });
        });

      }, error => {
        this.communicationSrv.showLoader.next(false);
        console.log(error);
        this.dialog.open(ModalPopUpComponent, {
          panelClass: "dialogInfocustom",
          width: "450px",
          data: {
            TipoMensaje: "",
            Titulo: "Mensaje",
            Mensaje: 'Ocurrió un problema, por favor intenta de nuevo',
          },
        });
      });
    } else {
      
      this.paramSrv.UpdateParametro(this.selectedVar).toPromise().then(response => {
        this.communicationSrv.showLoader.next(false);

        this.dialog.open(ModalPopUpComponent, {
          panelClass: "dialogInfocustom",
          width: "450px",
          data: {
            TipoMensaje: "",
            Titulo: "Mensaje",
            Mensaje: 'Parámetro actualizado correctamente',
          },
        });

      }, error => {
        this.communicationSrv.showLoader.next(false);
        console.log(error);
        this.dialog.open(ModalPopUpComponent, {
          panelClass: "dialogInfocustom",
          width: "450px",
          data: {
            TipoMensaje: "",
            Titulo: "Mensaje",
            Mensaje: 'Ocurrió un problema, por favor intenta de nuevo',
          },
        });
      });
    }
  }

}
