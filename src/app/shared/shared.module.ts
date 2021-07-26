import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PrimengModule} from './libraries/primeng/primeng.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ItemsPerPageComponent} from './components/items-per-page/items-per-page.component';

@NgModule({
  declarations: [PageNotFoundComponent, ItemsPerPageComponent],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    ReactiveFormsModule,
    PrimengModule,
    HttpClientModule,
    FormsModule,
    ItemsPerPageComponent,
  ],
})
export class SharedModule {}
