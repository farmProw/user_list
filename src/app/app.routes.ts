import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-list',
    pathMatch: 'full',
  },
  {
    path: 'user-list',
    loadComponent: () =>
      import('./users/user-list/user-list.component').then(
        (e) => e.UserListComponent
      ),
    children: [
      {
        path: 'create/:id',
        loadComponent: () =>
          import('./users/user-details/user-details.component').then(
            (e) => e.UserDetailsComponent
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./users/user-details/user-details.component').then(
            (e) => e.UserDetailsComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/404/404.component').then((e) => e.NotFoundComponent),
  },
];
