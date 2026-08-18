import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmCreateRoutingModule } from './farm-create-routing.module';
import { FarmCreatePage } from './farm-create.page';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FarmCreatePage],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    FarmCreateRoutingModule,
  ],
})
export class FarmCreateModule {}
