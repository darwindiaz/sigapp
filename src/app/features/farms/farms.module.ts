import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmsRoutingModule } from './farms-routing.module';
import { FarmsPage } from './farms.page';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FarmsPage],
  imports: [CommonModule, IonicModule, SharedModule, FarmsRoutingModule],
})
export class FarmsModule {}
