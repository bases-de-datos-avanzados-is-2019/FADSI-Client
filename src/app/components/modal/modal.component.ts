import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../services/site.service';
import {SiteInterface} from '../../models/site-interface';
import {ProductInterface} from '../../models/product-interface';
import {internalOrderInterface} from '../../models/internalOrder-Interface';
import {MapsApiService} from '../../services/MapApiService';
import {RouteService} from '../../services/route.service';
import {RouteSite} from '../../models/route-site-interface';
import {RouteInterface} from '../../models/route-interface';


import {NgForm, FormsModule} from '@angular/forms';
import {Location} from '@angular/common';
import { $ } from 'protractor';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private siteService : SiteService, private location : Location, private maps : MapsApiService, private routeService : RouteService) { }
  private index = 0;
  public productForCart : ProductInterface = {
    name : "",
    code : "",
    price : 0,
    photo : "",
    store : "",
    storeID : "",
    quantity : ""
  }

  public currentOrder : internalOrderInterface;
  public sites: SiteInterface[];
  public rs : SiteInterface[] = [];
  public backup : SiteInterface;
  public radius : string = "";

  private routeSites : Object[] = [];

  private route : RouteInterface = {
    idCliente : "",
    idMainSite : "",
    possibleSites : this.routeSites
  };


  ngOnInit() {
    this.siteService.setInternalOrder();
    this.getListSites();

  }

  getOrder() {
    const orderString = localStorage.getItem('currentOrder');
    this.currentOrder = JSON.parse(orderString);
  }

  onAddOrder () : void {
    let currentOrder = this.siteService.internalOrder.products;
    this.siteService.selectedSite.products.forEach(element => {
      let product = JSON.stringify(element);
      let productJSON = JSON.parse(product);
      var quantity = <HTMLInputElement>document.getElementById('input' + this.index);
      if(quantity.value != '0'){
        this.productForCart.name = productJSON.name;
        this.productForCart.code = productJSON.code;
        this.productForCart.price = productJSON.price;
        this.productForCart.photo = productJSON.photo;
        this.productForCart.store = this.siteService.selectedSite.name;
        this.productForCart.storeID = this.siteService.selectedSite.id;
        this.productForCart.quantity = quantity.value;
        this.siteService.internalOrder.products.push(this.productForCart);
        this.siteService.internalOrder.total = this.siteService.internalOrder.total +
        (this.productForCart.price * parseInt(this.productForCart.quantity));
        let pr : ProductInterface = {
          name : "",
          code : "",
          price : 0,
          photo : "",
          store : "",
          storeID : "",
          quantity : ""
        }
        this.productForCart = pr;

        this.index = this.index + 1;
      } else {
        this.index = this.index + 1;
      }

    });

    this.index = 0;
    console.log(this.siteService.internalOrder);

    const orderString = JSON.stringify(this.siteService.internalOrder);
    localStorage.setItem('currentOrder',orderString);

  }

  getListSites() {
    this.siteService.getSites()
    .subscribe((sites : SiteInterface) => ( this.backup = sites));
    console.log(this.sites);


  }

  getNearby(){
    let rad = parseInt(this.radius);
    this.sites = this.maps.getSitesByRadius(rad, this.siteService.selectedSite, this.backup);
    console.log(this.sites);
  }

  postRoute() {
    for (let i = 0; i < this.rs.length; i++){
      let lat = this.siteService.selectedSite.latitude;
      let long = this.siteService.selectedSite.longitude;

      let lat2 = this.rs[i].latitude;
      let long2 = this.rs[i].longitude;

      let distance = this.maps.getDistance(lat,long,lat2,long2);

        let temp = {
        "idSubSite": this.sites[i].id,
        "distance": distance
        }

      this.routeSites.push(temp);
    }

    let clients = localStorage.getItem('currentUser');
    let clientJSON = JSON.parse(clients);
    let ids = clientJSON.id;

    let mainSiteid = this.siteService.selectedSite.id;

    this.route.idCliente = ids;
    this.route.idMainSite = mainSiteid;
    this.route.possibleSites = this.routeSites;

    this.routeService.postRoute(ids,mainSiteid,this.routeSites).subscribe(data => console.log(data));
    this.routeSites = [];
    this.rs = [];
  }

  addToRoute(index : number) {
    let forAdd : SiteInterface = this.sites[index];
    this.rs.push(forAdd);
    console.log(this.rs);
  }

}
