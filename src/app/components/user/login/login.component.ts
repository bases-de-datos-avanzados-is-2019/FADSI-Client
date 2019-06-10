import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private location: Location) { }
  public user: UserInterface = {
    username: '',
    password: ''
  };
  ngOnInit() {
  }

  onLogin(){
    return this.authService.loginUser(this.user.username, this.user.password)
    .subscribe(data => {
      this.authService.setUser(data.user);
      const token = data.id;
      this.authService.setToken(token);
      if (data.user.tipoUsuario === 'client') {
        this.router.navigate(['/user/client']);
        this.location.replaceState('/user/client');
        location.reload();
      } else {
        this.router.navigate(['/user/employee']);
        this.location.replaceState('/user/employee');
        location.reload();
      }


    },
    error => console.log(error.mesage));
  }

}
