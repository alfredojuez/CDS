import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cds-front';

  constructor(private router: Router) {}

  // El tema de las validaciones
  // Se debería hacer con un servicio
  // pero para esta prueba es más sencillo
  // hacerlo así.

  Validado() {
    return localStorage.getItem('isLogged') === '1' ? true : false;
  }

  cerrarSesion() {
    localStorage.setItem('isLogged', '0');
    this.router.navigate(['login']);
  }
}
