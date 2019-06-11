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
    SiteDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBskqiCRbNXTxnCuKH056ZZeMpwDPbjM4c ',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
