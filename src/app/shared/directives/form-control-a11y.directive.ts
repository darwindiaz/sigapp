import { Directive, HostBinding, Self } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';

@Directive({
  // Enhances every reactive Ionic field without requiring repeated attributes.
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `
    ion-input[formControl],
    ion-input[formControlName],
    ion-select[formControl],
    ion-select[formControlName],
    ion-textarea[formControl],
    ion-textarea[formControlName]
  `,
})
export class FormControlA11yDirective {
  constructor(@Self() private readonly ngControl: NgControl) {}

  @HostBinding('attr.aria-invalid')
  get ariaInvalid(): string {
    const control = this.ngControl.control;
    const shouldShowError = Boolean(
      control?.invalid && (control.dirty || control.touched),
    );

    return String(shouldShowError);
  }

  @HostBinding('attr.aria-required')
  get ariaRequired(): string | null {
    return this.ngControl.control?.hasValidator(Validators.required)
      ? 'true'
      : null;
  }
}
