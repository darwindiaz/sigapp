import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() type = 'text';
  @Input() label = '';
  @Input() autoComplete = '';
  @Input() icon = '';
  @Input() fill = '';
  @Input() formatMessage = 'Ingresa un valor válido.';
  @Input() readOnly = false;

  inputText = 'text';
  hide = true;

  ngOnInit(): void {
    this.inputText = this.type;
  }

  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }

  get passwordButtonLabel(): string {
    return this.hide ? 'Mostrar contraseña' : 'Ocultar contraseña';
  }

  showPassword(): void {
    this.hide = !this.hide;
    this.inputText = this.hide ? 'password' : 'text';
  }
}
