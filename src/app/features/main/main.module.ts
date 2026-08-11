import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPage } from './main.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MainPage],
  imports: [CommonModule, IonicModule, MainRoutingModule],
})
export class MainModule {}
