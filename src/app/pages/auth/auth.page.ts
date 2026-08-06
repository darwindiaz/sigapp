import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
      password: new FormControl('', [Validators.required]),
    });
    this.spinner = this.utilsService.loading();
  }

  async onSubmit() {
    if (!this.formAuth.valid) {
      return;
    }

    const loading = await this.spinner;
    loading.present();

    try {
      const res = await this.firebaseService.signIn(
        this.formAuth.value as User,
      );

      await this.getUserInfo(res.user.uid);
    } catch (error) {
      console.error(error);
      this.utilsService.toast({
        message: error.message,
        duration: 2500,
        color: 'warning',
        position: 'middle',
      });
    } finally {
      await loading.dismiss();
    }
  }

  async getUserInfo(uid: string) {
    let path = `users/${uid}`;
    console.log('path', path);
    this.firebaseService
      .getDocument(path)
      .then((user: User) => {
        this.utilsService.saveInLocalStorga('user', user);
        this.formAuth.reset();
        this.utilsService.routerLink('/main/home');
      })
      .catch((error) => {
        console.error(error);
        this.utilsService.toast({
          message: error.message,
          duration: 2500,
          color: 'warning',
          position: 'middle',
        });
      });
  }
}
