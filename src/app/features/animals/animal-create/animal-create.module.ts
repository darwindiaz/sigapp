import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';

import { AnimalCreateRoutingModule } from './animal-create-routing.module';
import { AnimalCreatePage } from './animal-create.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AnimalCreatePage],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    AnimalCreateRoutingModule,
  ],
})
export class AnimalCreateModule {}
