import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ClienteService } from 'app/ApiServices/ClienteService';
import _ from 'lodash';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../ModalPopUp/modalpopup.component';
import { CommunicationService } from 'app/ApiServices/CommunicationService';

@Component({
    selector: 'app-image-selection',
    templateUrl: './image-selection.component.html',
    styleUrls: ['./image-selection.component.scss']
})
export class ImageSelectionComponent implements OnInit {
    formImage: FormGroup
    preview: string;
    validFormat: boolean;
    lodash = _
    load: boolean;
    constructor(protected sanitizer: DomSanitizer,
        private clienteService: ClienteService,
        private dialogRef: MatDialogRef<ImageSelectionComponent>,
        private comunication: CommunicationService,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


    ngOnInit() {

        this.formImage = new FormGroup({
            file: new FormControl()
        });
    }

    uploadFileAndSetPreview(event) {
        const file = event.target.files[0]

        if (file) {
            this.validFormat = this.requiredFileType('png', file) || this.requiredFileType('jpg', file) || this.requiredFileType('jpeg', file);
            if (this.validFormat) {

                this.formImage.patchValue({
                    file: file
                });

                this.formImage.get('file').updateValueAndValidity();

                const reader = new FileReader();
                reader.onload = () => {
                    this.preview = reader.result as string;
                    this.preview = this.sanitizer.bypassSecurityTrustUrl(reader.result as string) as string;
                }
                reader.readAsDataURL(file)
            }
        } else {
            this.formImage.patchValue({
                file: ''
            });
            this.formImage.get('file').updateValueAndValidity();
        }
    }



    requiredFileType(type: string, file: any): boolean {
        if (file) {
            const extension = file.name.split('.')[1].toLowerCase();
            if (type.toLowerCase() !== extension.toLowerCase()) {
                return false
            }

            return true;
        }

        return true;
    }
    onClose() {
        this.dialogRef.close();
    }

    Guardar() {
        this.load = true
        this.clienteService.GuardarImagenCliente(this.data.usuario, this.formImage.get('file').value).subscribe((x) => {
            this.dialogRef.close();
            this.load = false
        })
    }
}
