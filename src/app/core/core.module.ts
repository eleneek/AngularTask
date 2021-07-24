import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../shared/libraries/primeng/primeng.module';
import { MainComponent } from './containers/main/main.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';

@NgModule({
  declarations: [MainComponent, MenuBarComponent],
  imports: [CommonModule, PrimengModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('You cannot import CoreModule twice');
    }
  }
}
