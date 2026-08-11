import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('../inventory/inventory.module').then(
            (m) => m.InventoryModule,
          ),
      },
      {
        path: 'paddocks',
        loadChildren: () =>
          import('../inventory/inventory.module').then(
            (m) => m.InventoryModule,
          ),
      },
      {
        path: 'health',
        loadChildren: () =>
          import('../inventory/inventory.module').then(
            (m) => m.InventoryModule,
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('../inventory/inventory.module').then(
            (m) => m.InventoryModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
