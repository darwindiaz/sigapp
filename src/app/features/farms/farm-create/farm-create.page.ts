import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { STORAGE_KEYS } from 'src/app/core/constants/storage-keys.constant';
import { AppMessageCode } from 'src/app/core/enums/app-message-code.enum';
import { Farm, FarmProductionType } from 'src/app/core/models/farm.model';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { FarmService } from 'src/app/core/services/farm.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-farm-create',
  templateUrl: './farm-create.page.html',
  styleUrls: ['./farm-create.page.scss'],
})
export class FarmCreatePage {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private farmService: FarmService = inject(FarmService);
  private farmContextService: FarmContextService = inject(FarmContextService);
  private loadingService: LoadingService = inject(LoadingService);
  private messageService: MessageService = inject(MessageService);
  private navigationService: NavigationService = inject(NavigationService);
  private storageService: StorageService = inject(StorageService);

  readonly backUrl = APP_ROUTES.farms;
  readonly productionTypes = Object.values(FarmProductionType);

  readonly form = this.formBuilder.group({
    name: ['', Validators.required],
    department: [''],
    municipality: [''],
    productionType: [FarmProductionType.DualPurpose],
    notes: [''],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      await this.messageService.showMessage(AppMessageCode.RequiredFields);
      return;
    }

    const user = this.storageService.get<User>(STORAGE_KEYS.user);

    if (!user?.uid) {
      await this.messageService.showMessage(AppMessageCode.UserNotFound);
      await this.navigationService.goTo(APP_ROUTES.auth);
      return;
    }

    const loading = await this.loadingService.createLoading();
    await loading.present();

    try {
      const farm = this.buildFarm(user.uid);

      await this.farmService.createFarm(farm);
      await this.farmContextService.setActiveFarm(farm);

      await this.messageService.showMessage(AppMessageCode.FarmCreated);
      await this.navigationService.goTo(APP_ROUTES.home);
    } catch (error) {
      console.error(error);
      await this.messageService.showMessage(AppMessageCode.FarmCreateError);
    } finally {
      await loading.dismiss();
    }
  }

  private buildFarm(ownerId: string): Farm {
    const formValue = this.form.getRawValue();
    const now = new Date();

    return {
      id: crypto.randomUUID(),
      ownerId,
      name: formValue.name!,
      department: formValue.department || undefined,
      municipality: formValue.municipality || undefined,
      productionType: formValue.productionType || undefined,
      notes: formValue.notes || undefined,
      active: true,
      createdAt: now,
      updatedAt: now,
    };
  }
}
