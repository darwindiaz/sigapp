import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AppMessageCode } from '../enums/app-message-code.enum';
import { APP_MESSAGES } from '../constants/app-messages.constant';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private toastController = inject(ToastController);

  async showMessage(code: AppMessageCode): Promise<void> {
    const message = APP_MESSAGES[code];

    const toast = await this.toastController.create({
      message: message.text,
      duration: message.duration ?? 2500,
      color: message.type,
      position: 'top',
    });

    await toast.present();
  }
}
