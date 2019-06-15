import { SiteInterface } from './../../models/site-interface';
import { SiteService } from './../../services/site.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-delete',
  templateUrl: './site-delete.component.html',
  styleUrls: ['./site-delete.component.css']
})
export class SiteDeleteComponent implements OnInit {
  public sites: SiteInterface;
  constructor(private siteService: SiteService) { }

  ngOnInit() {
    this.getListSites();
  }

  getListSites(): void {
    this.siteService.getSites().subscribe((sites: SiteInterface) => (this.sites = sites));
  }

  deleteSite(id: string): void {
    if (confirm('Are you sure you want to delete this site?')) {
      this.siteService.deleteSite(id).subscribe();
    }
  }

  setSiteforUpdate(site: SiteInterface) {
    const siteString = JSON.stringify(site);
    localStorage.setItem('siteforUpdate', siteString);
  }

  preUpdateSite(site: SiteInterface) {
    this.siteService.siteUpdate = Object.assign({}, site);
  }

}
