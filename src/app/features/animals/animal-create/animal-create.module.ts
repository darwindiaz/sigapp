import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';

import { AnimalCreateRoutingModule } from './animal-create-routing.module';
import { AnimalCreatePage } from './animal-create.page';

@NgModule({
  declarations: [AnimalCreatePage],
  imports: [CommonModule, IonicModule, SharedModule, AnimalCreateRoutingModule],
})
export class AnimalCreateModule {}
