import { inject, Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingController = inject(LoadingController);

  createLoading(message: string = 'Procesando...') {
    return this.loadingController.create({
      message,
      spinner: 'circular',
    });
  }
}
