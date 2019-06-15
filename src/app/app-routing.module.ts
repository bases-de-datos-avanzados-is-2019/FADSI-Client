import { SiteRegiisterComponent } from './components/site-regiister/site-regiister.component';
import { ClientPageComponent } from './components/client-page/client-page.component';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { EmployeePageComponent } from './components/employee-page/employee-page.component';
import { SiteDeleteComponent } from './components/site-delete/site-delete.component';
import {CartComponent} from './components/cart/cart.component';
import { EditSiteModalComponent } from './components/edit-site-modal/edit-site-modal.component';
import {EtlReportsComponent} from './components/etl-reports/etl-reports.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user/login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'user/client', component: ClientPageComponent},
  {path: 'user/employee', component: EmployeePageComponent},
  {path: 'user/employee/addSite', component: SiteRegiisterComponent},
  {path: 'user/employee/deleteSite', component: SiteDeleteComponent},
  {path: 'user/employee/deleteSite/updateSiteModal', component: EditSiteModalComponent},
  {path: 'user/employee/reports', component: EtlReportsComponent},
  {path: 'user/client/cart', component: CartComponent},
  {path: '**', component: Page404Component}// Deber ir al final del array de rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
