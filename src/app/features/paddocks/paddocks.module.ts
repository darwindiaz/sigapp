import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';

import { PaddocksRoutingModule } from './paddocks-routing.module';
import { PaddocksPage } from './paddocks.page';

@NgModule({
  declarations: [PaddocksPage],
  imports: [CommonModule, IonicModule, SharedModule, PaddocksRoutingModule],
})
export class PaddocksModule {}
