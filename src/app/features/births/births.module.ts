import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BirthsRoutingModule } from './births-routing.module';
import { BirthsPage } from './births.page';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BirthsPage],
  imports: [CommonModule, IonicModule, SharedModule, BirthsRoutingModule],
})
export class BirthsModule {}
