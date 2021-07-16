import { Component, ViewChild, OnInit } from "@angular/core";
import {
    MatPaginator,
    MatSort,
    MatTableDataSource,
    MatDialog,
} from "@angular/material";
import { DetalleClienteComponent } from "../DetalleCliente/detallecliente.component";
import { E_Cliente } from "app/Models/E_Cliente";
import { ClienteService } from "app/ApiServices/ClienteService";
import { E_SessionUser } from "app/Models/E_SessionUser";
import { UserService } from "../../../ApiServices/UserService";
import { CommunicationService } from "app/ApiServices/CommunicationService";
import { debounce, startWith, map } from "rxjs/operators";
import { Observable, timer } from 'rxjs';
import { FormControl } from '@angular/forms';
import moment from "moment";

@Component({
    moduleId: module.id,
    selector: "misinactivas",
    templateUrl: "misinactivas.component.html",
    styleUrls: ["misinactivas.component.scss"],
})
export class MisInactivasComponent implements OnInit {
    displayedColumns = [
        "imagenEmpresaria",
        "NombreCompleto",
        "Detalle",
        "Whatsapp",
    ];
    filteredProduct: Observable<E_Cliente[]>;
    productCtrl = new FormControl();
    public SessionUser: E_SessionUser = new E_SessionUser();
    public ListClientes: Array<E_Cliente> = new Array<E_Cliente>();
    safariWindow: Window;
    mensage: string;

    constructor(
        public dialog: MatDialog,
        private ClienteService: ClienteService,
        private UserService: UserService,
        private communicationService: CommunicationService
    ) { }

    ngOnInit() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow();
        var objCliente: E_Cliente = new E_Cliente();
        objCliente.Vendedor = this.SessionUser.IdVendedor;
        objCliente.Lider = this.SessionUser.IdLider;
        objCliente.IdEstadosCliente = 5;

        this.communicationService.showLoader.next(true);
        if (this.SessionUser.IdGrupo == "52") {
            this.ClienteService.ListEmpresariasxGerentexEstado(
                objCliente
            ).subscribe((x: Array<E_Cliente>) => {
                this.ListClientes = x;
                this.loadEventQuickSearch()
                this.communicationService.showLoader.next(false);
            });
        } else if (this.SessionUser.IdGrupo == "60") {
            this.ClienteService.ListEmpresariasxLiderEstado(
                objCliente
            ).subscribe((x: Array<E_Cliente>) => {
                this.ListClientes = x;
                this.loadEventQuickSearch()
                this.communicationService.showLoader.next(false);
            });
        }
    }

    openDetalleCliente(row: E_Cliente): void {
        this.communicationService.showLoader.next(true);
        this.ClienteService.ObtenerClientexNit(row.Nit.trim())
            .subscribe((x: E_Cliente) => {
               
                    var a = moment(new Date());
                    var b = moment(x.UltimaCompra);
                    x.RemainingDays = a.diff(b, "days");
               

                const dialogRef = this.dialog.open(DetalleClienteComponent, {
                    panelClass: 'knowledgebase-article-dialog',
                    data: x
                });

                dialogRef.afterClosed().subscribe(result => {
                });
                this.communicationService.showLoader.next(false);

            })


    }


    enviaWhatsapp(cliente: E_Cliente) {
       // let safariWindow = window.open("https://www.whatsapp.com");
       this.ClienteService.ObtenerClientexNit(cliente.Nit.trim())
        .subscribe((y: E_Cliente) => {

       let mensaje =""
        this.ClienteService.RecuperarClave(cliente).subscribe((x) => {
            
            mensaje =    "https://api.whatsapp.com/send?phone=593" +
                y.Celular1 +
                "&text=Hola, " +
                y.Nombre1 +
                "  En Glod te hechamos de menos y queremos que conozcas nuestras más recientes novedades.  "+ 
               "https://appsaved.lineadirectaec.com/glod/ <= para ver nuestro catálogo interactivo. "+   
             " Descarga nuestra app de negocios aquí => https://www.glodtm.com.ec/ " +
                " Ingresa con tu usuario: " +
                x.Usuario +
                "  Contraseña: " +
                x.ClaveUsuario +
                "  Saludos, " +
                y.NombreLider;

               
            this.mensage = mensaje
            
            setTimeout(() => {
            window.open( mensaje, "_blank");
            }, 500);  

        });
    })
    }


    loadEventQuickSearch() {
        this.filteredProduct = this.productCtrl.valueChanges.pipe(
            debounce(() => timer(500)),
            startWith(""),
            map((state) =>
                state ? this._filterStates(state) : this.ListClientes.slice()
            ) // )
        );
    }

    private _filterStates(value: string) {
        const filterValue = value.toLowerCase();

        return this.ListClientes.filter((state) =>
            state.RazonSocial.toLowerCase().includes(filterValue)
        );
    }
}
