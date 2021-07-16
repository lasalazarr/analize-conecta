import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewChecked, Inject, Input } from '@angular/core';
import _ from 'lodash';

import { MatDialog, MatDialogRef, MatSelect, MAT_DIALOG_DATA, MatSelectChange, MatBottomSheet } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'politicas',
    templateUrl: 'politicas.component.html',
    styleUrls: ['politicas.component.scss'],
})
export class PoliticasComponent implements OnInit {
    mensaje: string;
    items: string[];
    titulo: string;
    constructor(        
        public dialogRef: MatDialogRef<PoliticasComponent>,

        @Inject(MAT_DIALOG_DATA) public data: any

    ) {

    }
    ngOnInit(): void {
        this.titulo = `Cambios y devoluciones`
        this.items =[
            "Fáciles de gestionar y sin costo alguno. "
            , "Se aceptan cambios solo en productos que correspondan a la misma referencia, por falla de fabricación."
            , "• Se cambiarán en talla y color hasta 8 días después de emitida la factura."
            , "• Los cambios se harán dependiendo del stock."
            , "• No se aceptarán cambios ni devoluciones en ropa interior."
            , "• No tendrán cambio las prendas control como fajas, bodys, prendas íntimas, ni trajes de baño."
            , "• Las prendas ubicadas en la sección de ofertas o promociones no tienen cambio ni devolución."
            , "• Es requisito que las prendas tengan su etiqueta y código de barras para realizar su cambio."
        ]
        
        
    
    }

  
}

