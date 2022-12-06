import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss'],
})
export class PruebaComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData(); // Leemos el JSON
    this.getFilteredList(); // Generamos los datos del combo
    document.getElementById('entrada').focus(); //ponemos el foco
  }

  /**
   * Leemos los datos de JSON proporcionado
   * @returns
   */
  getData() {
    return new Promise((resolve, reject) => {
      this.http.get('./assets/data/cities.json').subscribe(
        (data) => {
          this.listadoGeneral = data;
          this.listado = [];
          this.listadoGeneral.forEach((element) => {
            this.listado.push(element.name);
          });
          resolve(true);
        },
        (error) => {
          reject(true);
        }
      );
    });
  }

  textoDeInput = '';

  //Listas que vamos a usar para distintas partes
  listado = [];
  listadoGeneral: any;
  listaFiltrada = [];
  listaSeleccion = [];

  //Parametros sobre el item del combo que estamos usando
  selectedIndex = -1;
  listHidden = true;

  filtro = '';

  muestraListado() {
    this.listHidden = false;
  }

  /**
   * No existe la opcion de eliminar un elemento de una lista, así que la creo yo
   * @param arrayOrigen
   * @param elemento
   * @returns
   */
  removeElement(arrayOrigen: string[], elemento: string) {
    let respuesta = null;
    arrayOrigen.forEach((item, index) => {
      if (item === elemento) respuesta = arrayOrigen.splice(index, 1);
    });
    return respuesta;
  }

  /**
   * Función que nos devuelve la lista original filtrada por el texto escrito
   * y a la que quitamos los elementos ya seleccionados para evitar que
   * se puedan producir duplicidades en la selección
   * @returns
   */
  getFilteredList() {
    this.listaFiltrada = this.listado.filter((el) =>
      el.toUpperCase().startsWith(this.filtro.toUpperCase())
    );
    this.listaFiltrada.sort();

    this.listaSeleccion.forEach((element) => {
      this.removeElement(this.listaFiltrada, element);
    });

    return this.listaFiltrada;
  }

  /**
   * Función que gestiona el uso del teclado al estar sobre el texbox asociado al combo
   * @param event
   * @returns
   */
  gestionaTeclado(event: any) {
    if (event.key === 'Escape') {
      this.listHidden = true;
    } else if (event.key === 'Enter') {
      let elemento = this.listaFiltrada.sort()[this.selectedIndex];
      this.listaSeleccion.push(elemento);
      this.removeElement(this.listaFiltrada, elemento);
      //seleccionar elemento
    } else if (event.key === 'ArrowUp') {
      this.listHidden = false;
      this.selectedIndex > 0 ? this.selectedIndex-- : this.selectedIndex;
      return;
    } else if (event.key === 'ArrowDown') {
      this.listHidden = false;
      this.selectedIndex < this.listaFiltrada.sort().length - 1
        ? this.selectedIndex++
        : this.selectedIndex;
      return;
    }
  }

  /**
   * Funcion encargada de seleccionar un elemento eliminandolo de la lista filtrada
   * y dejándolo en la lista de elementos seleccionados
   * @param el
   */
  seleccionaElemento(el) {
    this.selectedIndex = el;
    let elemento = this.listaFiltrada.sort()[this.selectedIndex];
    this.listaSeleccion.push(elemento);
    this.removeElement(this.listaFiltrada, elemento);
  }

  /**
   * Elimina un elemento previamente seleccionado
   * @param el
   */
  eliminaElementoSeleccionado(el) {
    this.removeElement(this.listaSeleccion, el);
  }

  error = false;
  verTiempo = false;

  /**
   *
   * @param nombre Busca en nuestro JSON el ID del elemento dado
   * @returns
   */
  buscaID(nombre) {
    let resp = null;
    this.listadoGeneral.forEach((el) => {
      el.name.toUpperCase() == nombre.toUpperCase() ? (resp = el) : null;
    });
    return resp;
  }

  listaTiempos = [];

  /**
   * Funcion que solicita los datos a openweathermap
   */
  solicitaInfoRestApi() {
    this.listaTiempos = [];
    this.listHidden = true;
    const API_KEY = '5b4a5fb7fff1a8f5a3c0cd68dc4e9a5b';
    const base = 'https://api.openweathermap.org/data/2.5/weather?id=';

    //api.openweathermap.org/data/2.5/weather?id={2514334}}&appid={API key}

    this.listaSeleccion.forEach((lugar) => {
      let ID = this.buscaID(lugar).id;
      let URL = base + ID + '&appid=' + API_KEY;

      this.http.get(URL).subscribe((data) => {
        this.verTiempo = true;
        this.listaTiempos.push(data);
      });
    });
  }

  dameURL(ID) {
    return `http://openweathermap.org/img/wn/${ID}.png`;
  }
}
