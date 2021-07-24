import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './containers/users/users.component';
import { ModalComponent } from './containers/modal/modal.component';
import { AddNewUserComponent } from './components/add-new-user/add-new-user.component';
import { SharedModule } from '../shared/shared.module';
import { AlphabetOnlyDirective } from './services/directives/alphabet-only.directive';

@NgModule({
  declarations: [UsersComponent, ModalComponent, AddNewUserComponent, AlphabetOnlyDirective],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
