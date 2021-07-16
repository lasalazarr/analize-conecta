import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sectors-dialog',
  templateUrl: './sectors-dialog.component.html',
  styleUrls: ['./sectors-dialog.component.scss']
})
export class SectorsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SectorsDialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public sectors: any[]) 
  {
    dialogRef.disableClose = true;
    sectors.forEach(item => {
      item.guid = this.createUUID();
    });
  }

  ngOnInit() {
  }

  remove(guid:any) {
    this.sectors = this.sectors.filter(item => {
      return item.guid != guid;
    });
  }

  add() {
    this.sectors.push({
      Id: 0,
      Nombre: '',
      ParroquiaId: '',
      ZonaId: 0,
      guid: this.createUUID()
    });
  }

  createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }

}
