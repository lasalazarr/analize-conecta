import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private http:HttpClient) { }

  reverseGeocoding(lat:number, lng:number) : Promise<any> {
    let latLng: string = lat.toString() + ',' + lng.toString();
    let url: string = environment.geocodeUrl.replace('{0}', latLng);

    return this.http.get<any>(url).toPromise().then(data => data);
  }
}
