import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    TableModule,
    DynamicDialogModule,
    InputTextModule,
    RadioButtonModule,
    FileUploadModule,
    ButtonModule,
  ],
  exports: [
    MenubarModule,
    TableModule,
    DynamicDialogModule,
    InputTextModule,
    RadioButtonModule,
    FileUploadModule,
    ButtonModule,
  ],
})
export class PrimengModule {}
