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
import { FARM_PRODUCTION_TYPE_LABELS } from 'src/app/core/constants/domain-labels.constant';
import { nonBlankValidator } from 'src/app/core/validators/form.validators';

@Component({
  selector: 'app-farm-create',
  templateUrl: './farm-create.page.html',
  styleUrls: ['./farm-create.page.scss'],
})
export class FarmCreatePage implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private farmService: FarmService = inject(FarmService);
  private farmContextService: FarmContextService = inject(FarmContextService);
  private loadingService: LoadingService = inject(LoadingService);
  private messageService: MessageService = inject(MessageService);
  private navigationService: NavigationService = inject(NavigationService);
  private storageService: StorageService = inject(StorageService);
  readonly productionTypes = Object.values(FarmProductionType);

  readonly productionTypeLabels = FARM_PRODUCTION_TYPE_LABELS;

  readonly form = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        nonBlankValidator,
        Validators.minLength(2),
        Validators.maxLength(80),
      ],
    ],
    department: ['', Validators.maxLength(80)],
    municipality: ['', Validators.maxLength(80)],
    productionType: [FarmProductionType.DualPurpose],
    notes: ['', Validators.maxLength(500)],
  });

  backUrl: string | null = APP_ROUTES.farms;
  isSubmitting = false;

  async ngOnInit(): Promise<void> {
    await this.configureBackButton();
  }

  async onSubmit(): Promise<void> {
    if (this.isSubmitting) {
      return;
    }

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

    this.isSubmitting = true;
    const loading = await this.loadingService.createLoading('Guardando finca...');
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
      this.isSubmitting = false;
      await loading.dismiss();
    }
  }

  private async configureBackButton(): Promise<void> {
    const user = this.storageService.get<User>(STORAGE_KEYS.user);

    if (!user) {
      this.backUrl = null;
      return;
    }

    try {
      const farms = await this.farmService.getFarmsByOwner(user.uid);
      this.backUrl = farms.length ? APP_ROUTES.farms : null;
    } catch (error) {
      console.error(error);
      this.backUrl = APP_ROUTES.farms;
    }
  }

  private buildFarm(ownerId: string): Farm {
    const formValue = this.form.getRawValue();
    const now = new Date();

    return {
      id: crypto.randomUUID(),
      ownerId,
      name: formValue.name!.trim(),
      department: formValue.department?.trim() || undefined,
      municipality: formValue.municipality?.trim() || undefined,
      productionType: formValue.productionType || undefined,
      notes: formValue.notes?.trim() || undefined,
      active: true,
      createdAt: now,
      updatedAt: now,
    };
  }
}
