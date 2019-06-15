import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../services/site.service'
import {SiteInterface} from '../../models/site-interface'
import {MapsApiService} from '../../services/MapApiService';
@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {

  constructor(private siteService : SiteService, private maps : MapsApiService, private mapsAPILoader: MapsAPILoader) { }
  public sites: SiteInterface;

  ngOnInit() {
    this.mapsAPILoader.load();
    this.getListSites();
  }

  onViewSite(site: SiteInterface): void {
    this.siteService.selectedSite = Object.assign({}, site);
    const response = this.maps.getSitesByRadius(5000, this.siteService.selectedSite, this.sites);
    console.log(response);
    response.forEach(element => {
    
      let distance = this.maps.getDistance(this.siteService.selectedSite.latitude, this.siteService.selectedSite.longitude, element.latitude, element.longitude);
      console.log(distance);
    });
    
  }

  getListSites() {
    this.siteService.getSites()
    .subscribe((sites : SiteInterface) => (this.sites = sites));
    console.log(this.sites);
  }

}
