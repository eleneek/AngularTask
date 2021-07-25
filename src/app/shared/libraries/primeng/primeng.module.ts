import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FileUploadModule} from 'primeng/fileupload';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {ProgressBarModule} from 'primeng/progressbar';

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
    ToastModule,
    TooltipModule,
    ProgressBarModule,
  ],
  exports: [
    MenubarModule,
    TableModule,
    DynamicDialogModule,
    InputTextModule,
    RadioButtonModule,
    FileUploadModule,
    ButtonModule,
    ToastModule,
    TooltipModule,
    ProgressBarModule,
  ],
})
export class PrimengModule {}
