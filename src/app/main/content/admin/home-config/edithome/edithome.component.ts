import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_BOTTOM_SHEET_DATA, MAT_DIALOG_DATA } from '@angular/material';
import { AdminService } from 'app/ApiServices/AdminService';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeConfiguration } from 'app/Models/HomeConfiguration';
import { navigationAdmin, navigationClienteFinal, navigationGeneralEmpre, navigationGeneralLider } from 'app/navigation/navigation';
import _ from 'lodash';


@Component({
    moduleId: module.id,
    selector: 'edithome',
    templateUrl: 'edithome.component.html',
    styleUrls: ['edithome.component.scss']
})
export class EditHomecomponent implements OnInit {
    ListHome = []
    ListGenero: any;
    ListCategoria: any;
    ListGrupo: any;
    validFormat: boolean;
    preview: string;
    load: boolean;
    formHome: FormGroup;
    menus: any[];

    constructor(protected sanitizer: DomSanitizer,
        public dialog: MatDialog,
        private adminService: AdminService,
        @Optional() private dialogRef: MatDialogRef<EditHomecomponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {


    }

    ngOnInit() {

        this.formHome = new FormGroup({

            Genero: new FormControl(null),
            Categoria: new FormControl(null),
            Grupo: new FormControl(null),
            file: new FormControl(),
            Url: new FormControl(null),
            Nuevo: new FormControl(null),
            UrlInterno: new FormControl(null),
            All: new FormControl(null),
        });
        this.getInternalRoutes()
        this.adminService.ListGenero().subscribe(x => {
            this.ListGenero = x
            if (this.data.edit) {
                this.formHome.controls.Nuevo.setValue(this.data.item.Nuevo);
                this.formHome.controls.All.setValue(this.data.item.All);
                this.formHome.controls.Genero.setValue(this.data.item.Genero);
                this.adminService.ListCategoriaXGenero(this.data.item.Genero).subscribe(x => {
                    this.ListCategoria = x
                    this.formHome.controls.Categoria.setValue(this.data.item.Categoria);
                    this.adminService.ListGruposXGeneroXCategoria(this.data.item.Genero, this.data.item.Categoria).subscribe(x => {
                        this.ListGrupo = x
                        this.formHome.controls.Grupo.setValue(this.data.item.Grupo);
                    })
                })
            }

        })




    }


    changeGenero(change) {
        this.adminService.ListCategoriaXGenero(change.value).subscribe(x => { this.ListCategoria = x })
    }
    changeCategoria(change) {
        this.adminService.ListGruposXGeneroXCategoria(this.formHome.controls.Genero.value, change.value).subscribe(x => { this.ListGrupo = x })
    }


    uploadFileAndSetPreview(event) {
        const file = event.target.files[0]

        if (file) {
            this.validFormat = this.requiredFileType('png', file) || this.requiredFileType('jpg', file) || this.requiredFileType('jpeg', file);
            if (this.validFormat) {

                this.formHome.patchValue({
                    file: file
                });

                this.formHome.get('file').updateValueAndValidity();

                const reader = new FileReader();
                reader.onload = () => {
                    this.preview = reader.result as string;
                    this.preview = this.sanitizer.bypassSecurityTrustUrl(reader.result as string) as string;
                }
                reader.readAsDataURL(file)
            }
        } else {
            this.formHome.patchValue({
                file: ''
            });
            this.formHome.get('file').updateValueAndValidity();
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
        let input = new HomeConfiguration()
        input.Categoria = this.formHome.controls.Categoria.value
        input.Grupo = this.formHome.controls.Grupo.value
        input.Genero = this.formHome.controls.Genero.value
        input.Url = this.formHome.controls.Url.value
        input.Nuevo = this.formHome.controls.Nuevo.value
        input.All = this.formHome.controls.All.value
        input.UrlInterno = this.formHome.controls.UrlInterno.value
        
        if (this.data.edit) {
            input.Id = this.data.item.Id
            let image = Math.floor(100000 + Math.random() * 900000) + ".png"
            input.Imagen = "https://www.lineadirectaec.com/lineadirectaec.com/imagenes/" + image
            this.load = true
            this.adminService.GuardarImagenHome(image, this.formHome.get('file').value).subscribe((x) => {
                //;
                this.load = false
                this.adminService.ActualizarHomeConfig(input).subscribe((x) => { this.dialogRef.close() })
            })
        } else {
            let image = Math.floor(100000 + Math.random() * 900000) + ".png"
            input.Imagen = "https://www.lineadirectaec.com/lineadirectaec.com/imagenes/" + image
            this.load = true
            this.adminService.GuardarImagenHome(image, this.formHome.get('file').value).subscribe((x) => {
                //this.dialogRef.close();
                this.load = false
                this.adminService.RegistrarConfiguracion(input).subscribe((x) => { this.dialogRef.close() })
            })
        }

    }
    getInternalRoutes() {
        var menusNavigation = [
            ...navigationAdmin(),
            ...navigationGeneralLider(),
            ...navigationClienteFinal(),
            ...navigationGeneralEmpre(),
            ...navigationAdmin()
        ]
        let menus = []
        menusNavigation.forEach(x => {
            if (_.isNil(x.children) && !_.isNil(x.url) && !_.isEmpty(x.url)) {

                menus.push({ url: _.isArray(x.url) ? x.url[0] : x.url, title: x.title })

            }
            else if (!_.isNil(x.children)) {
                x.children.forEach(element => {
                    menus.push({ url: _.isArray(element.url) ? element.url[0] : element.url, title: element.title })
                });
            }
        })
        menus = _.uniqBy(menus, function (e) {
            return e.url;
        });
        this.menus = menus

    }

}
