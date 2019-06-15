import { MapsApiService } from './services/MapApiService';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClientPageComponent } from './components/client-page/client-page.component';
import { EmployeePageComponent } from './components/employee-page/employee-page.component';
import { SiteRegiisterComponent } from './components/site-regiister/site-regiister.component';
import { SiteDeleteComponent } from './components/site-delete/site-delete.component';

// Externals
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalComponent } from './components/modal/modal.component';
import { CartComponent } from './components/cart/cart.component';
import { EditSiteModalComponent } from './components/edit-site-modal/edit-site-modal.component';
import { EtlReportsComponent } from './components/etl-reports/etl-reports.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    Page404Component,
    NavbarComponent,
    HomeComponent,
    ClientPageComponent,
    EmployeePageComponent,
    SiteRegiisterComponent,
    SiteDeleteComponent,
    ModalComponent,
    CartComponent,
    EditSiteModalComponent,
    EtlReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.MAPS_API,
      libraries: ['places', 'geometry']

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
