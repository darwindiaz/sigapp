import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AppMessageCode } from 'src/app/core/enums/app-message-code.enum';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  private formBuilder = inject(FormBuilder);
  private firebaseService = inject(FirebaseService);
  private loadingService = inject(LoadingService);
  private messageService = inject(MessageService);

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });
  isSubmitting = false;

  async onSubmit(): Promise<void> {
    if (this.isSubmitting) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const loading = await this.loadingService.createLoading(
      'Enviando correo...',
    );
    await loading.present();

    try {
      await this.firebaseService.sendPasswordReset(
        this.form.controls.email.value.trim(),
      );
      this.form.reset();
      await this.messageService.showMessage(AppMessageCode.PasswordResetSent);
    } catch (error) {
      console.error(error);
      await this.messageService.showMessage(AppMessageCode.PasswordResetError);
    } finally {
      this.isSubmitting = false;
      await loading.dismiss();
    }
  }
}
