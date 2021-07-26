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
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import {InputSwitchModule} from 'primeng/inputswitch';

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
    DropdownModule,
    InputNumberModule,
    BadgeModule,
    InputSwitchModule,
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
    DropdownModule,
    InputNumberModule,
    BadgeModule,
    InputSwitchModule,
  ],
})
export class PrimengModule {}
