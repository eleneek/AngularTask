import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { MainComponent } from './core/containers/main/main.component';
import { coreRoutes } from './core/core.routes';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      ...coreRoutes,
      {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full',
      },
    ],
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
