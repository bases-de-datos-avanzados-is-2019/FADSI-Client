import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../services/site.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {internalOrderInterface} from '../../models/internalOrder-Interface';
import { timingSafeEqual } from 'crypto';

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
    this.internalOrder = this.siteService.internalOrder;
  }

  deleteElement (index : string, price : string, quantity : string){
    console.log(index);
    let i = parseInt(index);
    let p = parseInt(price);
    let q = parseInt(quantity);
    i = i+1;
    this.internalOrder.total = this.internalOrder.total - (p*q);
    this.siteService.internalOrder.products.splice(i,1);
  }
  

  onSubmit(){
    console.log("hello");
  }

}
