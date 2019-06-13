import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../services/site.service'
import {SiteInterface} from '../../models/site-interface'
@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {

  constructor(private siteService : SiteService) { }
  private sites : SiteInterface;

  ngOnInit() {
    this.getListSites();
  }

  onViewSite (site : SiteInterface) : void {
    this.siteService.selectedSite = Object.assign({},site);
  }

  getListSites () {
    this.siteService.getSites()
    .subscribe((sites : SiteInterface) => (this.sites = sites));
    console.log(this.sites);
  }

}
