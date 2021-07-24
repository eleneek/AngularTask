import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../shared/libraries/primeng/primeng.module';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';

@NgModule({
  declarations: [MenuBarComponent],
  imports: [CommonModule, PrimengModule],
  exports: [MenuBarComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('You cannot import CoreModule twice');
    }
  }
}
