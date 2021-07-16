import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { DireccionXUsuario } from "app/Models/DireccionXUsuario";

@Component({
  selector: "fuse-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"],
})
export class FuseConfirmDialogComponent {
  public confirmMessage: string;
  public listDireccion: Array<DireccionXUsuario> = new Array<DireccionXUsuario>();
  constructor(public dialogRef: MatDialogRef<FuseConfirmDialogComponent>) {}
}
