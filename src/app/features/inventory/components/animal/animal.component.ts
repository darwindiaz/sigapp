import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent {
  isModal = true;
  formAnimal: FormGroup;
  private fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.formAnimal = this.fb.group({
      uid: new FormControl('Animal #' + Math.floor(Math.random() * 1000)),
      gender: new FormControl('m', [Validators.required]),
      isAlive: new FormControl(true, [Validators.required]),
      isRegistered: new FormControl(false, [Validators.required]),
      isPure: new FormControl(false, [Validators.required]),
      ironMark: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    if (!this.formAnimal.valid) {
      return;
    }
  }
}
