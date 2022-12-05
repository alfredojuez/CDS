import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss'],
})
export class PruebaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getFilteredList();
    document.getElementById("entrada").focus();
  }

  listado = [
    'carrot',
    'banana',
    'apple',
    'potato',
    'tomato',
    'cabbage',
    'turnip',
    'okra',
    'onion',
    'cherries',
    'plum',
    'mango',
  ];
  textoDeInput = '';
  listaFiltrada = [];
  listaSeleccion = [];

  filtro = '';

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

  getFilteredList() {
    this.listaFiltrada = this.listado.filter((el) =>
      el.startsWith(this.filtro)
    );
    this.listaFiltrada.sort();

    this.listaSeleccion.forEach((element) => {
      this.removeElement(this.listaFiltrada, element);
    });

    return this.listaFiltrada;
  }

  selectedIndex = -1;
  listHidden = false;

  gestionaTeclado(event: any) {
    console.log('tecla');
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

    this.listHidden = false;
  }

  seleccionaElemento(el) {
    this.selectedIndex = el;
    let elemento = this.listaFiltrada.sort()[this.selectedIndex];
    this.listaSeleccion.push(elemento);
    this.removeElement(this.listaFiltrada, elemento);
  }

  eliminaElementoSeleccionado(el) {
    this.removeElement(this.listaSeleccion, el);
  }
}
