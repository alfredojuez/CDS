import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginForm } from 'src/app/interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorLogin=false;

  login: ILoginForm = {
    email: '',
    pass: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  init() {
    if (this.login.email == this.login.pass && this.login.pass == 'root') {
      localStorage.setItem('isLogged', '1');
      this.router.navigate(['prueba']);
    } else {
      localStorage.setItem('isLogged', '0');
      this.errorLogin=true;
    }
  }
}
