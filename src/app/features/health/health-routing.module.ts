import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HealthPage } from './health.page';

const routes: Routes = [
  {
    path: '',
    component: HealthPage,
  },
  {
    path: 'vaccination/create',
    loadChildren: () =>
      import('./vaccination-create/vaccination-create.module').then(
        (m) => m.VaccinationCreateModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthRoutingModule {}
