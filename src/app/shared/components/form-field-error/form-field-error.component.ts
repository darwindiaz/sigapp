import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss'],
})
export class FormFieldErrorComponent {
  @Input() control?: AbstractControl | null;
  @Input() requiredMessage = 'Este campo es obligatorio.';
  @Input() formatMessage = 'Revisa el valor ingresado.';

  get shouldShow(): boolean {
    return Boolean(
      this.control?.invalid && (this.control.dirty || this.control.touched),
    );
  }

  get message(): string {
    const errors = this.control?.errors;

    if (!errors) {
      return '';
    }

    if (errors['required'] || errors['blank']) {
      return this.requiredMessage;
    }

    if (errors['min']) {
      return `El valor mínimo permitido es ${errors['min'].min}.`;
    }

    if (errors['max']) {
      return `El valor máximo permitido es ${errors['max'].max}.`;
    }

    if (errors['minlength']) {
      return `Ingresa al menos ${errors['minlength'].requiredLength} caracteres.`;
    }

    if (errors['maxlength']) {
      return `Ingresa máximo ${errors['maxlength'].requiredLength} caracteres.`;
    }

    if (errors['futureDate']) {
      return 'La fecha no puede ser posterior a hoy.';
    }

    return this.formatMessage;
  }
}
