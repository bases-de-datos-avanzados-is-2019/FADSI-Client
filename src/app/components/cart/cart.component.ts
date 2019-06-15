import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../services/site.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {internalOrderInterface} from '../../models/internalOrder-Interface';
import { timingSafeEqual } from 'crypto';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private siteService : SiteService) { }
  private internalOrder : internalOrderInterface = {
    total : 0,
    products : null,
    stores : null,
    clientID : ''
  }
  private storeArray = [];

  ngOnInit() {
    const orderString = localStorage.getItem('currentOrder');
    if (!isNullOrUndefined(orderString)) {
      const order: internalOrderInterface = JSON.parse(orderString);
      this.internalOrder = order;
    } else {
      this.internalOrder = this.siteService.internalOrder;
    }
    
  }

  deleteElement (index : string, price : string, quantity : string){
    console.log(index);
    let i = parseInt(index);
    let p = parseInt(price);
    let q = parseInt(quantity);
    i = i+1;
    this.internalOrder.total = this.internalOrder.total - (p*q);
    this.internalOrder.products.splice(i,1);
    const orderS = JSON.stringify(this.internalOrder);
    localStorage.setItem('currentOrder',orderS);
    
  }
  

  onSubmit(){
    
    console.log("hello");
    let products = this.internalOrder.products;

    var first = products.findIndex( 
      function(el) { 
        return (el == null);
      }
    );

    products.splice(first,1);

    products.forEach(element => {
      let product = JSON.stringify(element);
      let productJSON = JSON.parse(product);
      let storeID = productJSON.storeID;
      console.log(storeID);
      console.log();
      if(this.storeArray.filter(store => (store == storeID)) === undefined || this.storeArray.filter(store => (store == storeID)).length == 0){
          this.storeArray.push(storeID);
      }

    });

    this.internalOrder.stores = this.storeArray;
    let clients = localStorage.getItem('currentUser');
    let clientJSON = JSON.parse(clients);

    this.internalOrder.clientID = clientJSON.id;

    console.log(this.internalOrder);

    let tempOrder : internalOrderInterface = {
      total : 0,
      products : [null]
    };

    this.siteService.internalOrder = tempOrder;
    const orderS = JSON.stringify(tempOrder);
    localStorage.setItem('currentOrder',orderS);

   

  }

  onModalClick() {
    window.history.back();
  }

}
