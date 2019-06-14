import { MapsAPILoader } from '@agm/core';
import { SiteInterface } from './../models/site-interface';
import { Injectable } from '@angular/core';
import { } from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class MapsApiService {
  constructor() { }

  getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    let distance: number;
    const place1 = new google.maps.LatLng(lat1, lon1);
    const place2 = new google.maps.LatLng(lat2, lon2);
    distance = google.maps.geometry.spherical.computeDistanceBetween(place1, place2);
    return distance;
  }



  getSitesByRadius(radius: number, mainSite: SiteInterface, siteList: any) {
    const result = new Array();
    siteList.forEach(element => {
      if (mainSite.id !== siteList.id) {
        if (this.getDistance(mainSite.latitude, mainSite.longitude, element.latitude, element.longitude) <= radius) {
          result.push(element);
        }
      }
    });
    return result;


  }

}
