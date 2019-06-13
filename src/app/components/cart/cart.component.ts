import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../services/site.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {internalOrderInterface} from '../../models/internalOrder-Interface';

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
  

  onSubmit(){
    console.log("hello");
  }

}
