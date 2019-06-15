import { Component, OnInit } from '@angular/core';
import {SiteInterface} from '../../models/site-interface';
import {Neo4jService} from '../../services/neo4j.service';
import {StoreInterface} from '../../models/store-interface';
import { ETLResponseInterface } from '../../models/etl-response-interface';

@Component({
  selector: 'app-etl-reports',
  templateUrl: './etl-reports.component.html',
  styleUrls: ['./etl-reports.component.css']
})
export class EtlReportsComponent implements OnInit {

  constructor(private neo : Neo4jService) { }

  private top5 : ETLResponseInterface = {
    result : null
  };

  private stores : ETLResponseInterface = {
    result : null
  };

  private orders : ETLResponseInterface = {
    result : null
  };

  private common : ETLResponseInterface = {
    result : null
  };

  private route : ETLResponseInterface = {
    result : null
  };

  private userID : string;
  private userID2 : string;
 

  ngOnInit() {
   this.getTopSites();
  }

  getTopSites(){
   
    this.neo.getTopSites()
    .subscribe((sites : ETLResponseInterface) => (this.top5 = sites));
    console.log(this.top5);
    
  }

  getETL() {
    console.log(this.neo.getETL());
  }

  getSitesByID (){
    
    this.neo.getRequestSites(this.userID)
    .subscribe((sites : ETLResponseInterface) => (this.stores = sites));
    console.log(this.stores);

  }

  getOrderByClientID () {
    console.log(this.userID2);
    this.neo.getOrderByClientId(this.userID2)
    .subscribe((sites : ETLResponseInterface) => (this.orders = sites));
    console.log(this.orders);
  }

  

}
