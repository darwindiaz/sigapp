import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmCreatePage } from './farm-create.page';

const routes: Routes = [
  {
    path: '',
    component: FarmCreatePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmCreateRoutingModule {}
