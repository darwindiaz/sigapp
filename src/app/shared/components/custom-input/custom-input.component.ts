import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autoComplete!: string;
  @Input() icon!: string;
  @Input() fill!: string;
  @Input() readOnly!: boolean;

  inputText!: string;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {
    this.inputText = this.type;
  }

  showPassword() {
    this.hide = !this.hide;
    this.inputText = this.hide ? 'password' : 'text';
  }
}
