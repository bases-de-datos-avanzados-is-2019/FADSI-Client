import { SiteService } from './../../services/site.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-site-regiister',
  templateUrl: './site-regiister.component.html',
  styleUrls: ['./site-regiister.component.css']
})
export class SiteRegiisterComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public address: string;
  public siteName: string;
  public numberEmployees: number;
  public siteDescription: string;
  public location: object;
  public type: string;
  public rating: number;
  public image: string;
  public telephoneNumber: string;
  public openingHours: [string];
  public website: string;
  public productName: string;
  public productCode: string;
  public productPrice: number;
  public productPhoto: string;
  public productDescription: string;
  public productArray: [object];
  public geoCoder;
  public inputLatitude: number;
  public inputLongitude: number;
  public geoStep: boolean;
  public generalStep: boolean;
  public productStep: boolean;

  @ViewChild('search') public searchElement: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private siteService: SiteService) {
    this.geoStep = true;
    this.generalStep = false;
    this.productStep = false;
    this.productArray = [{}];
   }


  ngOnInit() {
    this.mapsAPILoader.load().then(
      () => {
        this.geoCoder = new google.maps.Geocoder();
        const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement,
          { types: [], componentRestrictions: { country: 'CR'}});
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if ( place.geometry === undefined || place.geometry === null )   {
              return;
            }
            this.longitude = place.geometry.location.lng();
            this.latitude = place.geometry.location.lat();
            this.getAddress(this.latitude, this.longitude);
          });
        });
      }
    );
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
          this.address = 'No results found';
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
        this.address = 'Geocoder failed due to: ' + status;
      }
    });
  }

  searchAddress() {
    this.longitude = this.inputLongitude;
    this.latitude = this.inputLatitude;
    this.getAddress(this.latitude, this.longitude);
  }

  setGeographicStep() {
    this.geoStep = true;
    this.generalStep = false;
    this.productStep = false;
  }
  setGeneralStep() {
    this.geoStep = false;
    this.generalStep = true;
  }

  setProductStep() {
    this.generalStep = false;
    this.productStep = true;
  }

  addProduct() {
    const product = {
      name: this.productName,
      code: this.productCode,
      price: this.productPrice,
      description: this.productDescription,
      photo: this.productPhoto
    };
    this.productArray.push(product);
    this.productName = '';
    this.productCode = '';
    this.productPrice = null;
    this.productDescription = '';
    this.productPhoto = '';
  }

  postSite() {
    this.location = {
      lat: this.latitude,
      lng: this.longitude
    };
    return this.siteService.postSite(this.latitude, this.longitude, this.location, this.address, this.siteName,
      this.siteDescription, this.numberEmployees, this.type, this.rating, this.image, this.telephoneNumber,
      this.openingHours, this.website, this.productArray).subscribe(data =>{
        console.log(data);
        this.setGeographicStep();
      });
  }
}


