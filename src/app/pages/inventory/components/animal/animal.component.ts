import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent implements OnInit {

  isModal = true;
  formAnimal: FormGroup;
  spinner;
  private firebaseService: FirebaseService = inject(FirebaseService);
  private utilsService: UtilsService = inject(UtilsService);
  private fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.formAnimal = this.fb.group({
      uid: new FormControl('Animal #' + Math.floor(Math.random() * 1000)),
      gender: new FormControl('m', [Validators.required]),
      isAlive: new FormControl(true, [Validators.required]),
      isRegistered: new FormControl(false, [Validators.required]),
      isPure: new FormControl(false, [Validators.required]),
      ironMark: new FormControl('', [Validators.required]),
      /*breed: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      pupose: new FormControl('', [Validators.required]),
      observation: new FormControl('', [Validators.required])*/
    });
    this.spinner = this.utilsService.loading();
  }

  ngOnInit() {
    console.log('Animal component', this.spinner);
  }

  async onSubmit() {
    console.log("onsubmit data", this.formAnimal.getRawValue(), this.formAnimal.errors);
    /*if (this.formAnimal.valid) {
      (await this.spinner).present();
      this.firebaseService.signIn(this.formAnimal.value).then(res => {
        console.log('user', res.user)
      }).catch(error => {
        console.error(error);
        this.utilsService.toast({
          message: error.message,
          duration: 2500,
          color: 'warning',
          position: 'middle'
        });
      });
    }*/
  }
}
