import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';

import { VaccinationCreateRoutingModule } from './vaccination-create-routing.module';
import { VaccinationCreatePage } from './vaccination-create.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VaccinationCreatePage],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    VaccinationCreateRoutingModule,
  ],
})
export class VaccinationCreateModule {}
