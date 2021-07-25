import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './containers/users/users.component';
import {AddNewUserComponent} from './components/add-new-user/add-new-user.component';
import {SharedModule} from '../../shared/shared.module';
import {AlphabetOnlyDirective} from './directives/alphabet-only.directive';
import {StoreModule} from '@ngrx/store';
import {usersReducer} from './store';
import {EffectsModule} from '@ngrx/effects';
import {usersEffect} from './store/effects';
import {UsersTableComponent} from './components/users-table/users-table.component';
import {DeleteUserComponent} from './components/delete-user/delete-user.component';
import {AddBonusComponent} from './components/add-bonus/add-bonus.component';
import {ViewAndDeleteBonusesComponent} from './containers/view-and-delete-bonuses/view-and-delete-bonuses.component';
import {ViewAndDeleteBonusTableComponent} from './components/view-and-delete-bonus-table/view-and-delete-bonus-table.component';
import { ViewUsersDetailsComponent } from './components/view-users-details/view-users-details.component';

@NgModule({
  declarations: [
    UsersComponent,
    AddNewUserComponent,
    AlphabetOnlyDirective,
    UsersTableComponent,
    DeleteUserComponent,
    AddBonusComponent,
    ViewAndDeleteBonusesComponent,
    ViewAndDeleteBonusTableComponent,
    ViewUsersDetailsComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature(usersEffect),
  ],
})
export class UsersModule {}
