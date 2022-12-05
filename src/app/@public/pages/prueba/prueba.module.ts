import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebaRoutingModule } from './Prueba-routing.module';
import { PruebaComponent } from './prueba.component';
import { ComboModule } from '../../components/hmtl-plus/combo/combo.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PruebaComponent],
  imports: [
    CommonModule,
    PruebaRoutingModule,
    ComboModule,
    FormsModule
  ]
})
export class PruebaModule { }
