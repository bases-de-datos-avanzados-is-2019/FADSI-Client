import { MapsAPILoader } from '@agm/core';
import { SiteInterface } from './../models/site-interface';
import { Injectable } from '@angular/core';
import { } from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class MapsApiService {
  private distance: number;
  constructor(private mapsAPILoader: MapsAPILoader) { }

  getDistance(lat1: number, lon1: number, lat2: number, lon2: number){
    this.mapsAPILoader.load().then(
      () => {
        const place1 = new google.maps.LatLng(lat1, lon1);
        const place2 = new google.maps.LatLng(lat2, lon2);
        this.distance = google.maps.geometry.spherical.computeDistanceBetween(place1, place2);
      }
    );
    return this.distance;
  }

  getSitesByRadius(radius: number, mainSite: SiteInterface, siteList: any): [SiteInterface] {
    let result: [SiteInterface];
    siteList.forEach((item) => {
      if (mainSite.id !== item.id) {
        console.log(this.getDistance(mainSite.latitude, mainSite.longitude, item.latitude, item.longitude));
        if (this.getDistance(mainSite.latitude, mainSite.longitude, item.latitude, item.longitude) <= radius) {
          result.push(item);
        }
      }
    });
    return result;
  }
}
