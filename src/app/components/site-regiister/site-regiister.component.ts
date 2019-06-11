import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-site-regiister',
  templateUrl: './site-regiister.component.html',
  styleUrls: ['./site-regiister.component.css']
})
export class SiteRegiisterComponent implements OnInit {
  @ViewChild('search') public searchElement: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, ) { }


  ngOnInit() {
    this.mapsAPILoader.load().then(
      () => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement,
          { types: [], componentRestrictions:{country: 'CR'}});
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if( place.geometry === undefined || place.geometry === null )   {
              return;
            }
          });
        });
      }
    );
  }

}
