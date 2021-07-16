import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AdminService } from 'app/ApiServices/AdminService';
import { HomeConfiguration } from 'app/Models/HomeConfiguration';
import { navigationAdmin, navigationClienteFinal, navigationGeneralEmpre, navigationGeneralLider } from 'app/navigation/navigation';
import _ from 'lodash';
import { EditHomecomponent } from '../edithome/edithome.component';


@Component({
    moduleId: module.id,
    selector: 'listhome',
    templateUrl: 'listhome.component.html',
    styleUrls: ['listhome.component.scss']
})
export class ListHomecomponent implements OnInit {
    ListHome: HomeConfiguration[];

    constructor(public dialog: MatDialog, private adminService: AdminService) {

    }

    ngOnInit() {
        this.adminService.ObtenerHomeConfig().subscribe(x => this.ListHome = x)



 
    }

    editarHome(item) {
        let dialod = this.dialog.open(EditHomecomponent, {
            width: '450px',
            data: { edit: true, item: item }
        });
        dialod.afterClosed().subscribe(() => this.adminService.ObtenerHomeConfig().subscribe(x => this.ListHome = x))

    }

    CreateHome() {
        let item = this.dialog.open(EditHomecomponent, {
            width: '450px',
            data: { edit: false }
        });

        item.afterClosed().subscribe(() => this.adminService.ObtenerHomeConfig().subscribe(x => this.ListHome = x))
    }

    borrarHome(item) {
        this.adminService.BorrarConfiguracion(item).subscribe(() => {
            this.adminService.ObtenerHomeConfig().subscribe(x => this.ListHome = x)
        })

    }
}