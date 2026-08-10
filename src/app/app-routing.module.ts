import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthPageModule),
    canActivate: [noAuthGuard],
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
    canActivate: [authGuard],
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./features/inventory/inventory.module').then(
        (m) => m.InventoryModule,
      ),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
