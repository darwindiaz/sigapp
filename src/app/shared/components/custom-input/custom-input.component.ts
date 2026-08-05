import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {

  @Input() formControl!: FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autoComplete!: string;
  @Input() icon!: string;
  @Input() fill!: string;
  @Input() readOnly!: boolean;

  isPassword: boolean = false;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {
    this.isPassword = this.type == "password" ? true : false;
  }

  showPassword() {
    this.hide = !this.hide;
    this.type = this.hide ? 'password' : 'text';
  }
}
