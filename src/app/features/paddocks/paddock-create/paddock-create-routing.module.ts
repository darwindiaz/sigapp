import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaddockCreatePage } from './paddock-create.page';

const routes: Routes = [
  {
    path: '',
    component: PaddockCreatePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaddockCreateRoutingModule {}
