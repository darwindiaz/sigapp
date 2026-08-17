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
        path: 'animals/create',
        loadChildren: () =>
          import('../animals/animal-create/animal-create.module').then(
            (m) => m.AnimalCreateModule,
          ),
      },
      {
        path: 'births/create',
        loadChildren: () =>
          import('../births/birth-create/birth-create.module').then(
            (m) => m.BirthCreateModule,
          ),
      },
      {
        path: 'health/vaccination/create',
        loadChildren: () =>
          import('../health/vaccination-create/vaccination-create.module').then(
            (m) => m.VaccinationCreateModule,
          ),
      },
      {
        path: 'paddocks/movement/create',
        loadChildren: () =>
          import('../paddocks/movement-create/paddock-movement-create.module').then(
            (m) => m.PaddockMovementCreateModule,
          ),
      },
      {
        path: 'paddocks/create',
        loadChildren: () =>
          import('../paddocks/paddock-create/paddock-create.module').then(
            (m) => m.PaddockCreateModule,
          ),
      },
      {
        path: 'births/create',
        loadChildren: () =>
          import('../births/birth-create/birth-create.module').then(
            (m) => m.BirthCreateModule,
          ),
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
          import('../paddocks/paddocks.module').then((m) => m.PaddocksModule),
      },
      {
        path: 'births',
        loadChildren: () =>
          import('../births/births.module').then((m) => m.BirthsModule),
      },
      {
        path: 'health',
        loadChildren: () =>
          import('../health/health.module').then((m) => m.HealthModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('../reports/reports.module').then((m) => m.ReportsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
