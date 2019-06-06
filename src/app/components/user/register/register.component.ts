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

  constructor(private authService: AuthService, private router: Router) { }
  public user: UserInterface = {
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    cedula: '',
    telefono: '',
    email: '',
    fechaNacimiento: '',
    username: '',
    password: '',
    tipoUsuario: 'cliente'
  };

  ngOnInit() {
  }

  onRegister(): void{
    this.authService.registerUser(
      this.user.nombre,
      this.user.primerApellido,
      this.user.segundoApellido,
      this.user.cedula,
      this.user.telefono,
      this.user.email,
      this.user.fechaNacimiento,
      this.user.username,
      this.user.password,
      this.user.tipoUsuario
    ).subscribe(user => {
      this.authService.setUser(user);
      const token = user.id;
      this.authService.setToken(token);
      this.router.navigate(['/']);
    });
  }

}
