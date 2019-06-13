import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../services/site.service';
import {SiteInterface} from '../../models/site-interface';

import {NgForm, FormsModule} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private siteService : SiteService, private location : Location) { }

  ngOnInit() {
  }

}
