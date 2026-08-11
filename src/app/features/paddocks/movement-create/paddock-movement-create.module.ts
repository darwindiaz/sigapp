import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';

import { PaddockMovementCreateRoutingModule } from './paddock-movement-create-routing.module';
import { PaddockMovementCreatePage } from './paddock-movement-create.page';

@NgModule({
  declarations: [PaddockMovementCreatePage],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    PaddockMovementCreateRoutingModule,
  ],
})
export class PaddockMovementCreateModule {}
