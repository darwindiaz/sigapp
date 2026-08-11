import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsPage } from './reports.page';

@NgModule({
  declarations: [ReportsPage],
  imports: [CommonModule, IonicModule, SharedModule, ReportsRoutingModule],
})
export class ReportsModule {}
