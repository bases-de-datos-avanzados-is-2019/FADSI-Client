import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../services/site.service';
import {SiteInterface} from '../../models/site-interface';
import {ProductInterface} from '../../models/product-interface';


import {NgForm, FormsModule} from '@angular/forms';
import {Location} from '@angular/common';
import { $ } from 'protractor';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private siteService : SiteService, private location : Location) { }
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

  ngOnInit() {
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
    
    
  }

}
