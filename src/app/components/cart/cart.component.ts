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
    products : null
  }

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
  }

}
