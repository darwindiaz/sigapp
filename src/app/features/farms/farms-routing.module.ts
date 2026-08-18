import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmsPage } from './farms.page';

const routes: Routes = [
  {
    path: '',
    component: FarmsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmsRoutingModule {}
