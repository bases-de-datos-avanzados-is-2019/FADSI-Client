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
  public sites: SiteInterface[];
  public backup : SiteInterface[] = [];
  public search : string = "";

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
    .subscribe((sites : SiteInterface[]) => (this.sites = sites));
    console.log(this.sites);
    
  }

  getByType(){

    let result : SiteInterface[] = [];
    
    let searchTerm = this.search;

 

    

    this.sites.forEach(element => {
      console.log("element");
      element.type.forEach(type =>{
        console.log(type);
        if (type === searchTerm){
          result.push(element);
        }
      });
    });

    console.log(result);
    this.sites = result;
  }

}
