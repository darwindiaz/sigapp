import { Component, inject } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

import { MAIN_ACTIONS } from 'src/app/core/constants/main-action.constants';
import { MainActionCode } from 'src/app/core/enums/main-action-code.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {
  private actionSheetController = inject(ActionSheetController);

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
        console.log('Registrar animal');
        break;

      case MainActionCode.RegisterBirth:
        console.log('Registrar nacimiento');
        break;

      case MainActionCode.RegisterVaccination:
        console.log('Registrar vacunación');
        break;

      case MainActionCode.MoveAnimal:
        console.log('Movimiento de potrero');
        break;
    }
  }
}
