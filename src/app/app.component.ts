import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'cds-front';  

  constructor(private router: Router) { }
  
  Validado() {
    return localStorage.getItem('isLogged')==='1' ? true : false;
  }

  cerrarSesion()
  {
    localStorage.setItem('isLogged', '0');
    this.router.navigate(['contact']);
  }
}
