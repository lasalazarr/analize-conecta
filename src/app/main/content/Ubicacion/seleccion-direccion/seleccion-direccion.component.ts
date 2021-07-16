import { Component, OnInit, Input, Inject, Optional, AfterContentInit, Output, EventEmitter } from "@angular/core";
import {
    FormControl,
    Validators,
    FormGroup,
    FormBuilder,
} from "@angular/forms";
import _ from "lodash";
import { ClienteService } from "app/ApiServices/ClienteService";
import { UserService } from "app/ApiServices/UserService";
import { CommunicationService } from "app/ApiServices/CommunicationService";
import {
    MatDialog,
    MatBottomSheetRef,
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatSelectChange,
} from "@angular/material";
import { E_Cliente } from "app/Models/E_Cliente";
import {
    ModalPopUpComponent,
    DialogData,
} from "../../ModalPopUp/modalpopup.component";
import { DireccionXUsuario } from "app/Models/DireccionXUsuario";
import { forkJoin } from "rxjs";
import { ParameterService } from "app/ApiServices/ParametersServices";
import { E_Provincia } from "app/Models/E_Provincia";
import { E_Canton } from "app/Models/E_Canton";
import { E_Parroquia } from "app/Models/E_Parroquia";
import { mergeMap, map as maprx } from "rxjs/operators";

import { E_SessionUser } from "app/Models/E_SessionUser";
import { ConfirmAdressComponent } from '@fuse/components/confirm-adress/confirm-adress.component';
import { GeocodingService } from 'app/ApiServices/geocoding.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var google: any;

@Component({
    selector: "app-seleccion-direccion",
    templateUrl: "./seleccion-direccion.component.html",
    styleUrls: ["./seleccion-direccion.component.scss"],
})
export class SeleccionDireccionComponent implements OnInit, AfterContentInit {
    @Input() showSave: boolean;
    @Input() disableEdit: boolean = false;
    @Input() cedula: string;
    @Input() returnButton: boolean;
    @Input() showUpdateAddress: boolean = false;
    @Output() selectedAddresOut = new EventEmitter<DireccionXUsuario>();
    form: FormGroup;
    lodash = _;
    texto: string = "Wenceslau Braz - Cuidado com as cargas";
    lat: number = -23.8779431;
    lng: number = -49.8046873;
    zoom: number = 16;
    dir = undefined;
    address = undefined;
    locations = getLocations();

    formErrors = {
        Direccion: null,
        Email: null,
        Celular: null,
        Provincia: null,
        Canton: null,
        Parroquia: null,
    };
    TipoSelected = 1;
    listaDirecciones: DireccionXUsuario[] = new Array<DireccionXUsuario>();
    mensageDireccion: string;
    ListCanton: E_Canton[];
    ListProvincia: E_Provincia[];
    ListParroquia: E_Parroquia[];
    popupStyle: boolean;

    map: any;
    addressMarkers: any[] = [];
    icon: any;
    input: any;
    searchBox: any;
    showTypeAddress = true;
    public MostrarPedcat = false;
    public pedcat = true;
    // Horizontal Stepper
    constructor(
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private clienteService: ClienteService,
        private userService: UserService,
        private communicationService: CommunicationService,
        private parameterService: ParameterService,
        private gecodeSrv: GeocodingService,
        private router: Router,
        private activatedroute: ActivatedRoute,
        @Optional() public dialogRef: MatDialogRef<SeleccionDireccionComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (this.data != null && this.data.returnButton != undefined)
            this.returnButton = this.data.returnButton;

        if (
            !_.isNil(this.data) &&
            !_.isNil(this.data.cedula) &&
            !_.isEmpty(this.data.cedula)
        ) {
            this.cedula = this.data.cedula;
            this.popupStyle = true;
        } else if (_.isNil(this.cedula) || _.isEmpty(this.cedula)) {
            let user = this.userService.GetCurrentCurrentUserNow();
            this.cedula = user.Cedula;

        }

        try {
            this.MostrarPedcat = this.data.pedCat
        }
        catch (error) {

        }

    }
    ngAfterContentInit(): void {
        this.initAutocomplete();
    }

    getGeolocal() {
        if (navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.lng = pos.coords.longitude;
                this.lat = pos.coords.latitude;
            });
        }
    }

    ngOnInit() {
        if (!_.isNil(this.data)) {
            this.showSave = this.data.showSave;
        }

        this.form = this.formBuilder.group({
            Direccion: [{ value: null }],
            Provincia: [{ value: null }],
            Canton: [{ value: null }],
            Parroquia: [{ value: null }],
            refPoint: [{ value: null }],
        });

        this.form.valueChanges.subscribe(() => {
            this.onInfoAddressFormValuesChanged();
        });
    }

    pedircatalogo(event) {
        this.pedcat = !this.pedcat;
    }

    changeProvincia(y: MatSelectChange) {
        if (!_.isNil(y.value)) {
            this.setManualAddress();
            this.parameterService
                .listarCanton(y.value)
                .subscribe((x: Array<E_Canton>) => {
                    this.ListCanton = x;
                });
        }
    }

    changeParroquia(y: MatSelectChange) {
        if (!_.isNil(y.value)) {
            this.setManualAddress();
        }
    }

    public GetInfoLocation(map) {

        this.parameterService
            .listarProvincia()
            .pipe(mergeMap((response: Array<E_Provincia>) => {
                this.ListProvincia = response;

                const idPedido = this.activatedroute.snapshot.paramMap.get('idPedido');
                if (idPedido === undefined || idPedido === null) {
                    return this.clienteService
                        .ObtenerDireccionesXUsuario(this.cedula);
                } else {
                    return this.clienteService
                        .CargarDireccionTelefonoPedido(idPedido).pipe(
                            maprx(ad => {
                                this.showTypeAddress = false;
                                return [ad];
                            })
                        );
                }
            })).subscribe((x: Array<DireccionXUsuario>) => {  
                if (x.length > 0) {
                    this.communicationService.showLoader.next(false);

                    this.listaDirecciones = x;
                    this.seleccionarTipoDireccion(1);
                } else {
                    this.mensageDireccion =
                        "No tienes una dirección Asignada para este tipo";
                    this.onLocalizate();
                }
            });
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
            navigator.geolocation.getCurrentPosition((pos) => {
                this.lng = pos.coords.longitude;
                this.lat = pos.coords.latitude;
                this.getAddress(this.lat, this.lng);
            });
        }
    }

    //Obtiene el nombre de la direccion mas cercana
    getAddress(lat: number, lng: number, edit = false) {
        //console.log('Finding Address');
        if (navigator.geolocation) {
            let geocoder = new google.maps.Geocoder();
            let latlng = new google.maps.LatLng(lat, lng);
            let request = { latLng: latlng };
            geocoder.geocode(request, (results: Array<any>, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    // console.log(results)
                    // var typeFinded = results.filter(x => {
                    //     var contaType = x.types.join()
                    //     let response = contaType.includes("locality") && contaType.includes("political")
                    //     return response
                    // }
                    // )
                    //console.log(typeFinded)
                    let result = results[0];
                    let rsltAdrComponent = result.address_components;
                    let resultLength = rsltAdrComponent.length;
                    if (result != null) {
                        this.form.controls.Direccion.setValue(
                            result.formatted_address
                        );
                        this.address = result.formatted_address;
                        if (edit) {
                            this.setManualAddress();
                        }
                    } else {
                        alert("No hay direccion disponible!");
                    }
                }
            });
        }
    }

    setAdressInput() {
        this.address = this.form.controls.Direccion.value;
        this.setManualAddress();
    }

    private setManualAddress() {
        this.mensageDireccion = null;
        let direccion = this.listaDirecciones.find(
            (x) => x.Tipo == this.TipoSelected
        );
        if (!_.isNil(direccion)) {
            this.SetValueAddress2Send(direccion, this.cedula);
        } else {
            direccion = new DireccionXUsuario();
            this.SetValueAddress2Send(direccion, this.cedula);
            this.listaDirecciones.push(direccion);
        }
    }

    private SetValueAddress2Send(direccion: DireccionXUsuario, cedula: string) {
        direccion.Direccion = this.address;
        direccion.Latitud = this.lat;
        direccion.Longitud = this.lng;
        direccion.IdCedula = cedula;
        direccion.Tipo = this.TipoSelected;
        direccion.Provincia = !_.isNil(this.form.controls.Provincia.value)
            ? this.form.controls.Provincia.value.CodEstado
            : null;
        direccion.Ciudad = !_.isNil(this.form.controls.Canton.value)
            ? this.form.controls.Canton.value.CodCiudad
            : null;
        direccion.Parroquia = !_.isNil(this.form.controls.Parroquia.value)
            ? this.form.controls.Parroquia.value.Codigo
            : null;
        direccion.NombreParroquia = !_.isNil(this.form.controls.Parroquia.value)
            ? this.form.controls.Parroquia.value.NombreParroquia
            : null;
    }

    Guardar() {
        let direccionSeleccionada = this.listaDirecciones.find((x) => x.Tipo == this.TipoSelected);
        direccionSeleccionada.PedirCatalogo = this.pedcat;
        if (direccionSeleccionada.Direccion == null)
            direccionSeleccionada.Direccion = this.address;

        if (this.form.controls.refPoint != undefined && this.form.controls.refPoint != null)
            direccionSeleccionada.PuntoReferencia = this.form.controls.refPoint.value;

        if (this.showSave) {
            const confirmDialogRef = this.dialog.open(ConfirmAdressComponent, {
                panelClass: "dialogInfocustom",
            });
            confirmDialogRef.componentInstance.confirmMessage =
                "Verificar la dirección de envio";
            confirmDialogRef.componentInstance.listDireccion = [direccionSeleccionada]
            confirmDialogRef.afterClosed().subscribe(x => {
                if (x) {
                    this.requesSave(direccionSeleccionada);
                }
            });
        }
        else {
            this.requesSave(direccionSeleccionada);
        }
    }

    private requesSave(direccionSeleccionada) {

        if (!_.isNil(direccionSeleccionada.Id) && direccionSeleccionada.Id != 0) {
            this.clienteService.ActualizarDireccion(direccionSeleccionada).subscribe((subs) => {
                this.communicationService.showLoader.next(false);
                if (this.showSave) {
                    this.dialogRef.close(true);
                }
            });
        }
        else {
            this.clienteService.RegistrarDireccion(direccionSeleccionada).subscribe((subs) => {
                this.communicationService.showLoader.next(false);
                if (this.showSave) {
                    this.dialogRef.close(true);
                }
            });

        }
        this.communicationService.showLoader.next(true);

    }

    localizame() {
        if (navigator) {
            this.communicationService.showLoader.next(true);
            navigator.geolocation.getCurrentPosition((pos) => {
                this.lng = pos.coords.longitude;
                this.lat = pos.coords.latitude;
                this.gecodeSrv.reverseGeocoding(this.lat, this.lng).then(data => {
                    if (data != null && data.results != null) {
                        let address: string = data.results[0].formatted_address;
                        if (address != null) {
                            this.clearMarkers(true);
                            this.addMarker(pos.coords.latitude, pos.coords.longitude, address);
                            this.setAddress(data.results[0]);
                        }
                    }

                    this.communicationService.showLoader.next(false);
                });
            });
        }
    }


    mostrarUbicacion(event: any) {
        if (!_.isNil(event)) {
            this.lng = event.coords.lng;
            this.lat = event.coords.lat;
            this.getAddress(event.coords.lat, event.coords.lng, true);
        }
    }
    seleccionarTipoDireccion(Tipo: number) {
        this.clearMarkers(true);
        this.TipoSelected = Tipo;
        this.mensageDireccion = null;
        let direccion = this.listaDirecciones.find((x) => x.Tipo == Tipo);
        if (!_.isNil(direccion) && !_.isNil(direccion.Provincia)) {
            this.lng = direccion.Longitud;
            this.lat = direccion.Latitud;
            this.addMarker(this.lat, this.lng, direccion.Direccion);

            let provinciaFinded = this.ListProvincia.find(
                (x) => x.CodEstado == direccion.Provincia
            );
            if (!_.isNil(provinciaFinded)) {
                this.form.controls.Provincia.setValue(provinciaFinded);
                direccion.NombreProvincia = provinciaFinded.NombreEstado
                this.parameterService
                    .listarCanton(provinciaFinded)
                    .pipe(
                        mergeMap((x: Array<E_Canton>) => {
                            this.ListCanton = x;
                            let cantonFinded = this.ListCanton.find(
                                (x) => x.CodCiudad == direccion.Ciudad
                            );
                            if (!_.isNil(cantonFinded)) {
                                direccion.NombreCanton = cantonFinded.NombreCiudad
                                this.form.controls.Canton.setValue(
                                    cantonFinded
                                );
                                var objCanton: E_Canton = new E_Canton();
                                objCanton.CodCiudad = cantonFinded.CodCiudad.substring(
                                    3
                                );
                                objCanton.CodEstado = this.form.controls.Provincia.value.CodEstado.substring(
                                    1
                                );
                                return this.parameterService.listarParroquia(
                                    objCanton
                                );
                            } else {
                                this.selectedAddresOut.next(direccion)
                                this.communicationService.showLoader.next(false);
                            }
                        })
                    )
                    .subscribe((x: Array<E_Parroquia>) => {
                        this.ListParroquia = x;
                        let parroquiaFinded = this.ListParroquia.find(
                            (x) => x.Codigo == direccion.Parroquia
                        );
                        if (!_.isNil(parroquiaFinded)) {
                            direccion.NombreParroquia = parroquiaFinded.NombreParroquia
                            this.form.controls.Parroquia.setValue(
                                parroquiaFinded
                            );
                        }
                        this.selectedAddresOut.next(direccion)
                        this.communicationService.showLoader.next(false);
                    });
            }
            else {
                this.communicationService.showLoader.next(false);
                this.selectedAddresOut.next(direccion)
            }

            this.form.controls.Direccion.setValue(direccion.Direccion);
            this.form.controls.refPoint.setValue(direccion.PuntoReferencia);
            this.address = direccion.Direccion;
        } else {
            this.selectedAddresOut.next(direccion)
            this.clearMarkers(true);
        }
    }

    changeCanton(y: MatSelectChange) {
        if (!_.isNil(y.value)) {
            this.setManualAddress();
            var objCanton: E_Canton = new E_Canton();
            objCanton.CodCiudad = y.value.CodCiudad.substring(3);
            objCanton.CodEstado = this.form.controls.Provincia.value.CodEstado.substring(
                1
            );

            this.parameterService
                .listarParroquia(objCanton)
                .subscribe((x: Array<E_Parroquia>) => {
                    this.ListParroquia = x;
                });
        }
    }

    // map
    initAutocomplete() {
        if (navigator) {
            this.communicationService.showLoader.next(true);
            navigator.geolocation.getCurrentPosition((pos) => {
                this.lng = pos.coords.longitude;
                this.lat = pos.coords.latitude;

                this.gecodeSrv.reverseGeocoding(this.lat, this.lng).then(data => {
                    this.icon = {
                        url: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    this.map = new google.maps.Map(
                        document.getElementById("map") as HTMLElement,
                        {
                            center: { lat: this.lat, lng: this.lng },
                            zoom: 13,
                            mapTypeId: "roadmap"
                        }
                    );

                    // Create the search box and link it to the UI element.
                    this.input = document.getElementById("pac-input") as HTMLInputElement;
                    this.searchBox = new google.maps.places.SearchBox(this.input);
                    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.input);

                    var button = document.getElementById('clear-button');
                    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(button);

                    button.onclick = function () {
                        (document.getElementById("pac-input") as HTMLInputElement).value = '';
                    }

                    if (data != null && data.results != null) {
                        let address: string = data.results[0].formatted_address;
                        if (address != null) {
                            this.form.controls.Direccion.setValue(address);
                            this.address = address;
                        }
                    }

                    // Bias the SearchBox results towards current map's viewport.
                    this.map.addListener("bounds_changed", () => {
                        this.searchBox.setBounds(this.map.getBounds()/* as google.maps.LatLngBounds*/);
                    });

                    this.map.addListener("click", (event) => {
                        this.lng = event.latLng.lng();
                        this.lat = event.latLng.lat();
                        this.gecodeSrv.reverseGeocoding(this.lat, this.lng).then(data => {
                            if (data != null && data.results != null) {
                                let address: string = data.results[0].formatted_address;
                                if (address != null) {
                                    this.clearMarkers(true);
                                    this.addMarker(this.lat, this.lng, address);
                                    this.setAddress(data.results[0]);                                    
                                }
                            }

                            this.communicationService.showLoader.next(false);
                        });
                    });

                    // Listen for the event fired when the user selects a prediction and retrieve
                    // more details for that place.
                    this.searchBox.addListener("places_changed", () => {
                        this.searchBoxListener();
                    });

                    this.communicationService.showLoader.next(false);
                    this.GetInfoLocation(null);
                });
            }, (error) => {
                console.log(error);
                this.communicationService.showLoader.next(false);

                const dialogRef = this.dialog.open(ModalPopUpComponent, {
                    panelClass: "dialogInfocustom",
                    width: "450px",
                    data: {
                        TipoMensaje: "",
                        Titulo: "Atención",
                        Mensaje: "Se requieren permisos de ubicación para el funcionamiento del mapa"
                    }
                });
            });
        }
    }

    searchBoxListener() {
        try {
            const places = this.searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            this.addressMarkers.forEach(marker => {
                marker.setMap(null);
            });
            this.addressMarkers = [];

            // For each place, get the icon, name and location.
            const bounds = new google.maps.LatLngBounds();
            places.forEach(place => {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                // Create a marker for each place.
                this.addressMarkers.push(
                    new google.maps.Marker({
                        map: this.map,
                        icon: this.icon,
                        title: place.name,
                        position: place.geometry.location
                    })
                );

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }

                this.lng = place.geometry.location.lng();
                this.lat = place.geometry.location.lat();
                this.address = this.input.value;

                // Search for literal place
                this.setAddress(place);
            });

            this.map.fitBounds(bounds);
        } catch (ex) {
            console.log(ex);
        }
    }

    setAddress(place: any) {
        this.form.controls.Provincia.setValue(null);
        this.form.controls.Canton.setValue(null);
        this.form.controls.Parroquia.setValue(null);
        this.form.controls.refPoint.setValue(null);

        if (place.address_components != null && place.address_components != undefined) {
            let type: any;
            let province: any;
            let canton: any;
            let parroquia: any;
            place.address_components.forEach(item => {
                type = item.types.find(t => t == "administrative_area_level_1");
                if (type != null) {
                    province = this.ListProvincia.find(p => p.NombreEstado.toLowerCase() == item.long_name.toLowerCase());
                    if (province != null) {
                        this.form.controls.Provincia.setValue(province);

                        this.parameterService.listarCanton(province).subscribe((x: Array<E_Canton>) => {
                            this.ListCanton = x;

                            place.address_components.forEach(item => {
                                type = item.types.find(t => t == "locality");
                                if (type != null) {
                                    canton = this.ListCanton.find(p => p.NombreCiudad.toLowerCase() == item.long_name.toLowerCase());
                                    if (canton != null) {
                                        this.form.controls.Canton.setValue(canton);

                                        var objCanton: E_Canton = new E_Canton();
                                        objCanton.CodCiudad = canton.CodCiudad.substring(3).trim();
                                        objCanton.CodEstado = canton.CodEstado.substring(1).trim();

                                        this.parameterService.listarParroquia(objCanton).subscribe((y: Array<E_Parroquia>) => {
                                            this.ListParroquia = y;

                                            place.address_components.forEach(item => {
                                                type = item.types.find(t => t == "sublocality_level_1");
                                                if (type != null) {
                                                    parroquia = this.ListParroquia.find(p => p.NombreParroquia.toLowerCase() == item.long_name.toLowerCase());
                                                    if (parroquia != null) {
                                                        this.form.controls.Parroquia.setValue(parroquia);
                                                        this.setManualAddress();
                                                        return;
                                                    }
                                                }
                                            });
                                            this.setManualAddress();
                                            return;
                                        });
                                    }
                                }
                            });
                            this.setManualAddress();
                            return;
                        });
                    }
                }
            });
        }
    }

    clearMarkers(clearAddress: boolean) {

        this.input.value = '';

        this.setMapOnAll(null);
        this.addressMarkers = [];
        this.address = undefined;

        if (clearAddress) {
            this.form.controls.Provincia.setValue(null);
            this.form.controls.Canton.setValue(null);
            this.form.controls.Parroquia.setValue(null);
            this.form.controls.refPoint.setValue(null);
        }
    }

    addMarker(lat: number, lng: number, address: string) {
        let position = new google.maps.LatLng(lat, lng);

        this.form.controls.Direccion.setValue(address);
        this.address = address;

        this.addressMarkers.push(new google.maps.Marker({
            position: position,
            map: this.map,
            icon: this.icon,
            title: address
        }));

        this.map.setCenter(position);
        this.map.setZoom(16);
    }

    setMapOnAll(map: any | null) {
        for (let i = 0; i < this.addressMarkers.length; i++) {
            this.addressMarkers[i].setMap(map);
        }
    }

    goToAddress() {
        this.router.navigate(['/ubicaciongeneral'])
    }

    returnData() {
        let direccionSeleccionada = this.listaDirecciones.find((x) => x.Tipo == this.TipoSelected);
        if (direccionSeleccionada.Direccion == null)
            direccionSeleccionada.Direccion = this.address;

        if (this.form.controls.refPoint != undefined && this.form.controls.refPoint != null)
            direccionSeleccionada.PuntoReferencia = this.form.controls.refPoint.value;

        const confirmDialogRef = this.dialog.open(ConfirmAdressComponent, {
            panelClass: "dialogInfocustom",
        });
        confirmDialogRef.componentInstance.confirmMessage =
            "Verificar la dirección de envio";
        confirmDialogRef.componentInstance.listDireccion = [direccionSeleccionada]
        confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialogRef.close(this.listaDirecciones);
            }
        });
    }
}

export function getLocations() {
    return [
        { Tipo: 1, Texto: "Casa", icono: "home" },
        { Tipo: 2, Texto: "Apto", icono: "apartment" },
        { Tipo: 3, Texto: "Oficina", icono: "domain" },
        { Tipo: 4, Texto: "Otro", icono: "add_location" },
    ];
}
