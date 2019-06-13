import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

export class MapsApiService {
  constructor(private mapsAPILoader: MapsAPILoader): number { }
  getDistance(lat1: number, lon1: number, lat2: number, lon2: number){
    const distance: number;
    this.mapsAPILoader.load().then(
      () => {
        const place1 = new google.maps.LatLng(lat1, lon1);
        const place2 = new google.maps.LatLng(lat2, lon2);
        distance = google.maps.geometry.spherical.computeDistanceBetween(place1, place2);
      }
    );
    return distance;
  }
}
