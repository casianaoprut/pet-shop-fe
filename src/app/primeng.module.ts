import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    InputNumberModule,
    ButtonModule,
    PanelModule
  ]
})
export class PrimengModule { }
