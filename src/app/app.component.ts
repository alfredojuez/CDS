import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'cds-front';  

  Validado() {
    return localStorage.getItem('isLogged')==='1' ? true : false;
  }
}
