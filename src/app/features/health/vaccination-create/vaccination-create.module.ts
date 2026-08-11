import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';

import { VaccinationCreateRoutingModule } from './vaccination-create-routing.module';
import { VaccinationCreatePage } from './vaccination-create.page';

@NgModule({
  declarations: [VaccinationCreatePage],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    VaccinationCreateRoutingModule,
  ],
})
export class VaccinationCreateModule {}
