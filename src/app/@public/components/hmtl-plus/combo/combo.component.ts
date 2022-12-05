import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss'],
})
export class ComboComponent implements OnInit {
  @Input() list: string[];

  // the list to be shown after filtering
  filteredList: string[] = [];
  selectedList: string[] = [];

  @Output() nuevaSelección = new EventEmitter<string>();

  inputItem = '';
  // enable or disable visiblility of dropdown
  listHidden = true;
  showError = false;
  selectedIndex = -1;

  constructor() {}

  ngOnInit() {
    this.filteredList = this.list;
  }

  // modifies the filtered list as per input
  getFilteredList() {
    this.listHidden = false;
    // this.selectedIndex = 0;
    if (!this.listHidden && this.inputItem !== undefined) {
      this.filteredList = this.list.filter((item) =>
        item.toLowerCase().startsWith(this.inputItem.toLowerCase())
      );
    }
  }

  // Como no existe la funcion eliminar un elemento de un array, me la creo yo.
  removeElement(arrayOrigen: string[], elemento: string) {
    let respuesta = null;
    arrayOrigen.forEach((item, index) => {
      if (item === elemento) respuesta = arrayOrigen.splice(index, 1);
    });
    return respuesta;
  }

  // Añadimos un elemento a la selección de elementos y la eliminamos de la filtrada
  seleccionaItem(elemento) {
    this.selectedList.push(elemento);
    //this.filteredList = this.list;
    this.filteredList=this.list.filter(el => !this.selectedList.includes(el));
  }

  // seleccionamos el elemento sobre el que se ha hecho click
  selectItem(ind) {
    this.inputItem = this.filteredList[ind];
    this.seleccionaItem(this.inputItem)
    this.listHidden = true;
    this.selectedIndex = ind;
  }

  // seleccionamos elementos con las flechas y el enter
  onKeyPress(event) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleListDisplay(0);
      }

      if (event.key === 'Enter') {
        this.toggleListDisplay(0);
        //seleccionamos el elemento sobre el que se ha hecho selección con el enter
        let elemento = this.removeElement(
          this.filteredList,
          this.filteredList[this.selectedIndex]
        );
        this.seleccionaItem(elemento);
        this.selectedIndex = -1;
      }

      // if (event.key === 'ArrowDown') {
      //   this.listHidden = false;
      //   this.selectedIndex =
      //     (this.selectedIndex + 1) % this.filteredList.length;
      //   if (this.filteredList.length > 0 && !this.listHidden) {
      //     document
      //       .getElementsByTagName('list-item')
      //       [this.selectedIndex].scrollIntoView();
      //   }
      // } else if (event.key === 'ArrowUp') 
      // {
      //   console.log(this.selectedIndex);

      //   if (this.selectedIndex <= 0) 
      //   {
      //     this.selectedIndex = this.filteredList.length;
      //   }
        
      //   this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;

      //   if (this.filteredList.length > 0 ) {
      //     document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
      //   }
      // }
    console.log('FINAL');
  }

  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplay(sender: number) {
    
        this.selectItem(this.selectedIndex);
        this.listHidden = true;
        if (!this.list.includes(this.inputItem)) {
          this.showError = true;
          this.filteredList = this.list;
        } else {
          this.showError = false;
        }
  }
}
