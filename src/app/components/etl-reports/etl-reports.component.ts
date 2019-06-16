import { Component, OnInit } from '@angular/core';
import {SiteInterface} from '../../models/site-interface';
import {Neo4jService} from '../../services/neo4j.service';
import {ETL} from '../../models/etl';
import { ETLResponseInterface } from '../../models/etl-response-interface';

@Component({
  selector: 'app-etl-reports',
  templateUrl: './etl-reports.component.html',
  styleUrls: ['./etl-reports.component.css']
})
export class EtlReportsComponent implements OnInit {

  constructor(private neo : Neo4jService) { }

  private ETLMessage : ETL = {
    response : ''
  };
 
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
  private userID3 : string;
  private userID4 : string;
  private storeID : string;



  ngOnInit() {  
   this.getTopSites();
 
  }

  getTopSites(){
   
    this.neo.getTopSites()
    .subscribe((sites : ETLResponseInterface) => (this.top5 = sites));
    console.log(this.top5);
    
  }

  getETL() {
    this.neo.getETL()
    .subscribe((sites : ETL) => (this.ETLMessage = sites));
    console.log(this.ETLMessage);
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

  getCommonClients () {

    console.log(this.userID3);
    this.neo.getCommonClients(this.userID3)
    .subscribe((sites : ETLResponseInterface) => (this.common = sites));
    console.log(this.common);

  }

  getOptimalRoute () {
    console.log(this.userID4);
    console.log(this.storeID);
    this.neo.getRoute(this.userID4,this.storeID)
    .subscribe((sites : ETLResponseInterface) => (this.route = sites));
    console.log(this.route);
  }

  

}
