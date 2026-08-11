import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BirthCreatePage } from './birth-create.page';

const routes: Routes = [
  {
    path: '',
    component: BirthCreatePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirthCreateRoutingModule {}
