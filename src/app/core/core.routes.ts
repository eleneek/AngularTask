import { Routes } from '@angular/router';

export const coreRoutes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('../users/users.module').then((m) => m.UsersModule),
  },
];
