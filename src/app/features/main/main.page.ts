import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { MAIN_ACTIONS } from 'src/app/core/constants/main-action.constants';
import { MainActionCode } from 'src/app/core/enums/main-action-code.enum';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {
  private actionSheetController = inject(ActionSheetController);
  private firebaseService: FirebaseService = inject(FirebaseService);
  private navigationService: NavigationService = inject(NavigationService);
  private storageService: StorageService = inject(StorageService);

  async openRegisterOptions(event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    const actionSheet = await this.actionSheetController.create({
      header: 'Registro rápido',
      buttons: [
        ...MAIN_ACTIONS.map((action) => ({
          text: action.text,
          icon: action.icon,
          handler: () => {
            this.handleMainAction(action.code);
          },
        })),
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  private handleMainAction(actionCode: MainActionCode): void {
    switch (actionCode) {
      case MainActionCode.RegisterAnimal:
        this.navigationService.goTo(APP_ROUTES.createAnimal);
        break;

      case MainActionCode.RegisterBirth:
        this.navigationService.goTo(APP_ROUTES.createBirth);
        break;

      case MainActionCode.RegisterVaccination:
        this.navigationService.goTo(APP_ROUTES.createVaccination);
        break;

      case MainActionCode.RegisterPaddock:
        this.navigationService.goTo(APP_ROUTES.createPaddock);
        break;

      case MainActionCode.MoveAnimal:
        this.navigationService.goTo(APP_ROUTES.createPaddockMovement);
        break;
    }
  }

  goToProfile(): void {
    console.log('Ir a perfil');
  }

  goToSettings(): void {
    console.log('Ir a configuración');
  }

  goToFarmSettings(): void {
    this.navigationService.goTo(APP_ROUTES.farms);
  }

  goToHelp(): void {
    console.log('Ir a ayuda');
  }

  async signOut() {
    await this.firebaseService.signOut();
    this.storageService.clear();
    await this.navigationService.goTo(APP_ROUTES.auth);
  }
}
