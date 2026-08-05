import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {

  formAuth: FormGroup;
  spinner;
  private firebaseService: FirebaseService = inject(FirebaseService);
  private utilsService: UtilsService = inject(UtilsService);

  constructor(fb: FormBuilder) {
    this.formAuth = fb.group({
      uid: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.spinner = this.utilsService.loading();
  }

  async onSubmit() {
    if (this.formAuth.valid) {
      (await this.spinner).present();
      this.firebaseService.signIn(this.formAuth.value as User).then(res => {
        this.getUserInfo(res.user.uid);
      }).catch(error => {
        console.error(error);
        this.utilsService.toast({
          message: error.message,
          duration: 2500,
          color: 'warning',
          position: 'middle'
        });
      });
    }
  }

  async getUserInfo(uid: string) {
    if (this.formAuth.valid) {
      let path = `users/${uid}`;
      console.log('path', path)
      this.firebaseService.getDocument(path).then((user: User) => {
        this.utilsService.saveInLocalStorga('user', user);
        this.formAuth.reset();
        setTimeout(() => {
          this.utilsService.routerLink('/main');
        }, 10000);
      }).catch((error) => {
        console.error(error);
        this.utilsService.toast({
          message: error.message,
          duration: 2500,
          color: 'warning',
          position: 'middle'
        })
      });
    }
    (await this.spinner).dismiss();
  }
}
