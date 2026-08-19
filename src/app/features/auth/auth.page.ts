import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { User } from 'src/app/core/models/user.model';
import { AppMessageCode } from 'src/app/core/enums/app-message-code.enum';
import { AppResult } from 'src/app/core/interfaces/app-result.interface';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';

import { FirebaseService } from 'src/app/core/services/firebase.service';
import { MessageService } from 'src/app/core/services/message.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { STORAGE_KEYS } from 'src/app/core/constants/storage-keys.constant';
import { FarmService } from 'src/app/core/services/farm.service';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { Farm } from 'src/app/core/models/farm.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  private firebaseService: FirebaseService = inject(FirebaseService);
  private messageService: MessageService = inject(MessageService);
  private loadingService: LoadingService = inject(LoadingService);
  private navigationService: NavigationService = inject(NavigationService);
  private storageService: StorageService = inject(StorageService);
  private farmService: FarmService = inject(FarmService);
  private farmContextService: FarmContextService = inject(FarmContextService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  formAuth: FormGroup = this.formBuilder.group({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async onSubmit() {
    if (!this.formAuth.valid) {
      await this.messageService.showMessage(AppMessageCode.RequiredFields);
      return;
    }

    const loading = await this.loadingService.createLoading();
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

      await this.storageService.set(STORAGE_KEYS.user, userResult.data);
      await this.resolveFarmContext(userResult.data);
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

    return {
      ok: true,
      data: {
        uid,
        ...(userSnapshot.data() as Omit<User, 'uid'>),
      },
    };
  }

  private async resolveFarmContext(user: User): Promise<void> {
    const farms = await this.farmService.getFarmsByOwner(user.uid);

    if (!farms.length) {
      await this.farmContextService.clearActiveFarm();
      await this.navigationService.goTo(APP_ROUTES.createFarm);
      return;
    }

    const activeFarmId = await this.farmContextService.getActiveFarmId();
    const activeFarm = this.getValidActiveFarm(farms, activeFarmId);

    await this.farmContextService.setActiveFarm(activeFarm);
    await this.navigationService.goTo(APP_ROUTES.home);
  }

  private getValidActiveFarm(farms: Farm[], activeFarmId: string | null) {
    if (!activeFarmId) {
      return farms[0];
    }

    return farms.find((farm) => farm.id === activeFarmId) || farms[0];
  }
}
