import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnChanges} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  public appName = 'Fast Delivery Service Inc.';
  public isClient = false;
  public isEmployee = false;
  public isLogged = false;

  ngOnInit() {
    this.onCheckUser();
  }



  onLogOut() {
    localStorage.removeItem('currentOrder');
    this.authService.logoutUser().subscribe();
    this.router.navigate(['/']);
    this.onCheckUser();
  }

  onCheckUser(): void {
    const currentUser = this.authService.getCurrentUser();
    if ( currentUser === null) {
      this.isClient = false;
      this.isEmployee = false;
      this.isLogged = false;
    } else {
      this.isLogged = true;
      if(currentUser.userType === 'client'){
        this.isClient = true;
      } else {
        this.isEmployee = true;
      }
    }
  }

}
