import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    InputNumberModule,
    ButtonModule
  ]
})
export class PrimengModule { }
