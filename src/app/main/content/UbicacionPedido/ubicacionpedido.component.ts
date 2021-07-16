import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import _ from 'lodash';
import { E_Cliente } from 'app/Models/E_Cliente';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { UserService } from 'app/ApiServices/UserService';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';
import { MatDialog, MatDialogRef } from '@angular/material';
declare var google: any;
export interface DialogData {
    
    Nit: string
    
}

export interface ReturnsData {
    
    Latitud: number;
    Longitud: number;
    Direccion: string
    
}




@Component({
    moduleId: module.id,
    selector: 'ubicacionpedido',
    templateUrl: 'ubicacionpedido.component.html',
    styleUrls: ['ubicacionpedido.component.scss'],
})
export class UbicacionPedidoComponent implements OnInit {

    form: FormGroup;
    lodash = _
    texto: string = 'Wenceslau Braz - Cuidado com as cargas';
    lat: number = -23.8779431;
    lng: number = -49.8046873;
    zoom: number = 3;
    dir = undefined;
    address = undefined;
    public ReturnData: ReturnsData;

    formErrors = {
        Direccion: null,
        Email: null,
        Celular: null
    };

    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private clienteService: ClienteService,
        private userService: UserService,
        public dialogRef: MatDialogRef<UbicacionPedidoComponent>,
        private communicationService: CommunicationService,
        private dialog: MatDialog
    ) {
        this.getGeolocal();
        
    }


    private getGeolocal() {
        if (navigator) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.lng = pos.coords.longitude;
                this.lat = pos.coords.latitude;
            });
        }
    }

    ngOnInit() {

        this.form = this.formBuilder.group({
            Direccion: [undefined, undefined],
            Email: new FormControl('', [
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
            Celular: [undefined, undefined],
        });

        this.form.valueChanges.subscribe(() => {
            this.onInfoAddressFormValuesChanged();
        });
        //  this.getGeolocal();
        setTimeout(() => {
            this.onLocalizate()
        }, 800);

        var objCliente: E_Cliente = new E_Cliente()
        var objClienteResp: E_Cliente = new E_Cliente()
        let user = this.userService.GetCurrentCurrentUserNow();
  
        objCliente.Nit = user.Cedula;
         this.clienteService.CargarDireccionTelefono(objCliente)
            .subscribe((x: E_Cliente) => {
            objClienteResp = x
            if (x.Error == undefined) {
            this.lng = x.Longitud;
            this.lat = x.Latitud;
            this.getAddress(this.lat, this.lng);
        }

    })

    }


    onInfoAddressFormValuesChanged() {
        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    onLocalizate(): void {

        if (navigator) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.lng = pos.coords.longitude;
                this.lat = pos.coords.latitude;
                this.zoom = 16;

                this.getAddress(this.lat, this.lng);
            });

        }
    }

    public getDirection() {
        this.dir = {
            origin: { lat: 24.799448, lng: 120.979021 },
            destination: { lat: 24.799524, lng: 120.975017 }
        }
    }


    //Obtiene el nombre de la direccion mas cercana
    getAddress(lat: number, lng: number) {
        //console.log('Finding Address');
        if (navigator.geolocation) {
            let geocoder = new google.maps.Geocoder();
            let latlng = new google.maps.LatLng(lat, lng);
            let request = { latLng: latlng };
            geocoder.geocode(request, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    let result = results[0];
                    let rsltAdrComponent = result.address_components;
                    let resultLength = rsltAdrComponent.length;
                    if (result != null) {
                        console.log(result);
                        //this.address = rsltAdrComponent[resultLength - 8].short_name;
                        this.form.controls.Direccion.setValue(result.formatted_address)
                        this.address = result.formatted_address;
                    } else {
                        alert('No hay direccion disponible!');
                    }
                }
            });
        }
    }

    Guardar() {
        this.ReturnData = {Latitud:  this.lat, Longitud: this.lng,  Direccion : this.form.controls.Direccion.value}
             this.dialogRef.close(this.ReturnData);


    }

    mostrarUbicacion(event: any) {
        if (!_.isNil(event)) {
            this.lng = event.coords.lng;
            this.lat = event.coords.lat;
            this.getAddress(event.coords.lat, event.coords.lng)
        }

    }

}

