import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';

import { HealthRoutingModule } from './health-routing.module';
import { HealthPage } from './health.page';

@NgModule({
  declarations: [HealthPage],
  imports: [CommonModule, IonicModule, SharedModule, HealthRoutingModule],
})
export class HealthModule {}
