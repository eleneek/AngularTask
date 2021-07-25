import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../shared/components/page-not-found/page-not-found.component';
import {featureRoutes} from '../features/features.routes';
import {PreventBackButtonGuard} from '../features/users/guards/prevent-back-button.guard';

const routes: Routes = [
  ...featureRoutes,
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
    canDeactivate: [PreventBackButtonGuard],
  },

  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
