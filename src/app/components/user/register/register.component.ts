import { Location } from '@angular/common';
import { UserInterface } from './../../../models/user-interface';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private location: Location) { }
  public user: UserInterface = {
    name: '',
    lastName1: '',
    lastName2: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    birthday: '',
    username: '',
    password: '',
    userType: 'client'
  };

  ngOnInit() {
  }

  onRegister(): void{
    this.authService.registerUser(
      this.user.name,
      this.user.lastName1,
      this.user.lastName2,
      this.user.idNumber,
      this.user.phoneNumber,
      this.user.email,
      this.user.birthday,
      this.user.username,
      this.user.password,
      this.user.userType
    ).subscribe(user => {
      this.authService.setUser(user);
      const token = user.id;
      this.authService.setToken(token);
      this.router.navigate(['/user/client']);
      this.location.replaceState('/user/client');
      location.reload();
    });
  }

}
