import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {OrderInterface} from '../../models/order-interface'

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})

export class OrderHistoryComponent implements OnInit {

  constructor( private orderService : OrderService ) {}

  public ordersTng: OrderInterface;

  ngOnInit() {
    this.getAllOrders();
    console.log(this.ordersTng);

  }

  getAllOrders(){
    let clients = localStorage.getItem('currentUser');
    let clientJSON = JSON.parse(clients);
    let ids = clientJSON.id;

    this.orderService.getOrdersByClientId(ids)
    .subscribe((orders : OrderInterface) => ( this.ordersTng = orders));
    console.log(this.ordersTng);

  }



}
