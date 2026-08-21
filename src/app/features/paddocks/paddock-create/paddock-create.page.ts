import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import {
  PADDOCK_AREA_UNIT_LABELS,
  PADDOCK_STATUS_LABELS,
} from 'src/app/core/constants/domain-labels.constant';
import { AppMessageCode } from 'src/app/core/enums/app-message-code.enum';
import {
  Paddock,
  PaddockAreaUnit,
  PaddockStatus,
} from 'src/app/core/models/paddock.model';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { PaddockService } from 'src/app/core/services/paddock.service';
import { nonBlankValidator } from 'src/app/core/validators/form.validators';

@Component({
  selector: 'app-paddock-create',
  templateUrl: './paddock-create.page.html',
  styleUrls: ['./paddock-create.page.scss'],
})
export class PaddockCreatePage implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private paddockService: PaddockService = inject(PaddockService);
  private loadingService: LoadingService = inject(LoadingService);
  private messageService: MessageService = inject(MessageService);
  private navigationService: NavigationService = inject(NavigationService);
  private farmContextService: FarmContextService = inject(FarmContextService);

  readonly backUrl = APP_ROUTES.paddocks;
  readonly statusOptions = Object.values(PaddockStatus);
  readonly areaUnitOptions = Object.values(PaddockAreaUnit);
  private farmId: string | null = null;

  readonly areaUnitLabels = PADDOCK_AREA_UNIT_LABELS;
  readonly statusLabels = PADDOCK_STATUS_LABELS;

  readonly form = this.formBuilder.group({
    name: [
      '',
      [Validators.required, nonBlankValidator, Validators.maxLength(80)],
    ],
    area: ['', Validators.min(0.01)],
    areaUnit: [PaddockAreaUnit.Hectares],
    capacityAnimals: ['', [Validators.min(1), Validators.pattern(/^\d+$/)]],
    status: [PaddockStatus.Available, [Validators.required]],
    notes: ['', Validators.maxLength(500)],
  });
  isSubmitting = false;

  async ngOnInit(): Promise<void> {
    this.farmId = await this.farmContextService.requireActiveFarmId();

    if (!this.farmId) {
      await this.navigationService.goTo(APP_ROUTES.createFarm);
    }
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

    if (!this.farmId) {
      await this.navigationService.goTo(APP_ROUTES.createFarm);
      return;
    }

    this.isSubmitting = true;
    const loading = await this.loadingService.createLoading(
      'Guardando potrero...',
    );
    await loading.present();

    try {
      const paddock = this.buildPaddock(this.farmId);

      await this.paddockService.createPaddock(this.farmId, paddock);
      await this.messageService.showMessage(AppMessageCode.PaddockCreated);
      await this.navigationService.goTo(APP_ROUTES.paddocks);
    } catch (error) {
      console.error(error);
      await this.messageService.showMessage(AppMessageCode.PaddockCreateError);
    } finally {
      this.isSubmitting = false;
      await loading.dismiss();
    }
  }

  private buildPaddock(farmId: string): Paddock {
    const now = new Date();
    const formValue = this.form.getRawValue();

    return {
      id: crypto.randomUUID(),
      farmId,
      name: formValue.name?.trim() ?? '',
      area: this.toOptionalNumber(formValue.area),
      areaUnit: formValue.areaUnit ?? PaddockAreaUnit.Hectares,
      capacityAnimals: this.toOptionalNumber(formValue.capacityAnimals),
      status: formValue.status ?? PaddockStatus.Available,
      notes: formValue.notes?.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    };
  }

  private toOptionalNumber(
    value: string | null | undefined,
  ): number | undefined {
    if (value === null || value === undefined) return undefined;

    if (typeof value === 'string' && value.trim() === '') return undefined;

    const parsedValue = Number(value);

    return Number.isFinite(parsedValue) ? parsedValue : undefined;
  }
}
