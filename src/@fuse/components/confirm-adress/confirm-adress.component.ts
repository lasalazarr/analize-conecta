import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { DireccionXUsuario } from "app/Models/DireccionXUsuario";

@Component({
  selector: "confirm-adress",
  templateUrl: "./confirm-adress.component.html",
  styleUrls: ["./confirm-adress.component.scss"],
})
export class ConfirmAdressComponent {
  public confirmMessage: string;
  public listDireccion: Array<DireccionXUsuario> = new Array<DireccionXUsuario>();
  constructor(public dialogRef: MatDialogRef<ConfirmAdressComponent>) {}
}
