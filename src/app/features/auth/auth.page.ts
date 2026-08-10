import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { User } from 'src/app/core/models/user.models';
import { AppMessageCode } from 'src/app/core/enums/app-message-code.enum';

import { FirebaseService } from 'src/app/core/services/firebase.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { MessageService } from 'src/app/core/services/message.service';

export type AppResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: AppMessageCode };

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  formAuth: FormGroup;
  private firebaseService: FirebaseService = inject(FirebaseService);
  private messageService: MessageService = inject(MessageService);
  private utilsService: UtilsService = inject(UtilsService);

  constructor(fb: FormBuilder) {
    this.formAuth = fb.group({
      uid: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    if (!this.formAuth.valid) {
      await this.messageService.showMessage(AppMessageCode.RequiredFields);
      return;
    }

    const loading = await this.utilsService.loading();
    await loading.present();

    try {
      const res = await this.firebaseService.signIn(
        this.formAuth.value as User,
      );

      const userResult = await this.getUserInfo(res.user.uid);

      if (userResult.ok === false) {
        await this.messageService.showMessage(userResult.message);
        return;
      }

      this.utilsService.saveInLocalStorga('user', userResult.data);
      await this.utilsService.routerLink('/home');
      this.formAuth.reset();
    } catch (error) {
      console.error(error);
      await this.messageService.showMessage(AppMessageCode.UnexpectedError);
    } finally {
      await loading.dismiss();
    }
  }

  async getUserInfo(uid: string): Promise<AppResult<User>> {
    const path = `users/${uid}`;
    const userSnapshot = await this.firebaseService.getDocument(path);

    if (!userSnapshot.exists()) {
      return { ok: false, message: AppMessageCode.UserNotFound };
    }

    return { ok: true, data: userSnapshot.data() as User };
  }
}
