import { NgModule } from "@angular/core";
import { MatButtonModule, MatDialogModule } from "@angular/material";

import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { CommonModule } from "@angular/common";
import { ConfirmAdressComponent } from "./confirm-adress.component";

@NgModule({
  declarations: [ConfirmAdressComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  entryComponents: [FuseConfirmDialogComponent],
})
export class ConfirmAdressModule {}
