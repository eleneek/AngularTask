import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddNewUserComponent} from './components/add-new-user/add-new-user.component';
import {UsersComponent} from './containers/users/users.component';
import {PreventBackButtonGuard} from './guards/prevent-back-button.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'add-user',
    component: AddNewUserComponent,
    canDeactivate: [PreventBackButtonGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
