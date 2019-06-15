import { SiteInterface } from './../../models/site-interface';
import { Location } from '@angular/common';
import { SiteService } from './../../services/site.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-edit-site-modal',
  templateUrl: './edit-site-modal.component.html',
  styleUrls: ['./edit-site-modal.component.css']
})
export class EditSiteModalComponent implements OnInit {
  public siteName: string;
  public numberEmployees: number;
  public siteDescription: string;
  public productName: string;
  public productCode: string;
  public productPrice: number;
  public productPhoto: string;
  public productDescription: string;
  public productArray = new Array();

  constructor(public siteService: SiteService, private location: Location) {
  }

  ngOnInit() {
  }


  updateSite() {
    this.siteService.updateSite(this.siteService.siteUpdate).subscribe(site => location.reload());
  }

}
