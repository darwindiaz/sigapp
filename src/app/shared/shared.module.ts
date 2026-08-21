import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListStateComponent } from './components/list-state/list-state.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';

@NgModule({
  declarations: [
    CustomInputComponent,
    FormFieldErrorComponent,
    HeaderComponent,
    ListStateComponent,
    LogoComponent,
  ],
  exports: [
    CustomInputComponent,
    FormFieldErrorComponent,
    HeaderComponent,
    ListStateComponent,
    LogoComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
})
export class SharedModule {}
