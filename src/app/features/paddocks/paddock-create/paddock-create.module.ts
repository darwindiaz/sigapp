import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaddockCreateRoutingModule } from './paddock-create-routing.module';
import { PaddockCreatePage } from './paddock-create.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PaddockCreatePage],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    PaddockCreateRoutingModule,
  ],
})
export class PaddockCreateModule {}
