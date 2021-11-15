import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {FileUploadModule} from 'primeng/fileupload';
import {SidebarModule} from 'primeng/sidebar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    InputNumberModule,
    ButtonModule,
    PanelModule,
    FileUploadModule,
    SidebarModule
  ]
})
export class PrimengModule { }
