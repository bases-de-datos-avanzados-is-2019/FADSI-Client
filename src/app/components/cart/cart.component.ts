import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../services/site.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {internalOrderInterface} from '../../models/internalOrder-Interface';
import { timingSafeEqual } from 'crypto';
import { isNullOrUndefined } from 'util';
import {OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private siteService : SiteService, private order : OrderService) { }
  private internalOrder : internalOrderInterface = {
    total : 0,
    products : null,
    stores : null,
    clientID : '',
    specifics : ''
  }
  private testOrders : internalOrderInterface;
  private storeArray = [];

  ngOnInit() {
    const orderString = localStorage.getItem('currentOrder');
    if (!isNullOrUndefined(orderString)) {
      const order: internalOrderInterface = JSON.parse(orderString);
      this.internalOrder = order;
    } else {
      this.internalOrder = this.siteService.internalOrder;
    }

    let clients = localStorage.getItem('currentUser');
    let clientJSON = JSON.parse(clients);

    let ids = clientJSON.id;
    this.order.getOrdersByClientId(ids)
    .subscribe((orders : internalOrderInterface) => (this.testOrders = orders));
    console.log(this.testOrders);
    
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
    this.internalOrder.specifics = 'hola, le meti un detalle';

    console.log(this.internalOrder);
    this.post();
    console.log('posted the order succesfully');

    let tempOrder : internalOrderInterface = {
      total : 0,
      products : [null]
    };

    this.siteService.internalOrder = tempOrder;
    const orderS = JSON.stringify(tempOrder);
    localStorage.setItem('currentOrder',orderS);

   

  }

  post(){
    let id = this.internalOrder.clientID;
    let prod = this.internalOrder.products;
    let stores = this.internalOrder.stores;
    let specs = this.internalOrder.specifics;
    let tot = this.internalOrder.total;

    this.order.postOrder(specs,tot,prod,id,stores);
  }

  onModalClick() {
    window.history.back();
  }

}
