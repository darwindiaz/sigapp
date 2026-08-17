import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';

import { BirthCreateRoutingModule } from './birth-create-routing.module';
import { BirthCreatePage } from './birth-create.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BirthCreatePage],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    BirthCreateRoutingModule,
  ],
})
export class BirthCreateModule {}
