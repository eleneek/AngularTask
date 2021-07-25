import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './containers/users/users.component';
import {PreventBackButtonGuard} from './guards/prevent-back-button.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canDeactivate: [PreventBackButtonGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
