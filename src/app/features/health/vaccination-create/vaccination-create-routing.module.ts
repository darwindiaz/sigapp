import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VaccinationCreatePage } from './vaccination-create.page';

const routes: Routes = [
  {
    path: '',
    component: VaccinationCreatePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccinationCreateRoutingModule {}
