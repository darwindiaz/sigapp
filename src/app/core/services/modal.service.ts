import { inject, Injectable } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalController = inject(ModalController);

  async openModal<T = unknown>(
    modalOptions: ModalOptions,
  ): Promise<T | undefined> {
    const modal = await this.modalController.create(modalOptions);
    await modal.present();
    const { data } = await modal.onWillDismiss<T>();
    return data;
  }

  dismissModal(data?: unknown) {
    return this.modalController.dismiss(data);
  }
}
