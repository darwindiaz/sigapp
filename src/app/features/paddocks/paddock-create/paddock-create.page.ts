import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
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

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required]],
    area: [''],
    areaUnit: [PaddockAreaUnit.Hectares],
    capacityAnimals: [''],
    status: [PaddockStatus.Available, [Validators.required]],
    notes: [''],
  });

  async ngOnInit(): Promise<void> {
    this.farmId = await this.farmContextService.requireActiveFarmId();

    if (!this.farmId) {
      await this.navigationService.goTo(APP_ROUTES.createFarm);
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.farmId) {
      await this.navigationService.goTo(APP_ROUTES.createFarm);
      return;
    }

    const loading = await this.loadingService.createLoading();
    await loading.present();

    try {
      const paddock = this.buildPaddock(this.farmId);

      await this.paddockService.createPaddock(this.farmId, paddock);
      this.navigationService.goTo(APP_ROUTES.paddocks);
    } catch (error) {
      console.error(error);
    } finally {
      loading.dismiss();
    }
  }

  private buildPaddock(farmId: string): Paddock {
    const now = new Date();
    const formValue = this.form.getRawValue();

    return {
      id: crypto.randomUUID(),
      farmId,
      name: formValue.name ?? '',
      area: formValue.area ? Number(formValue.area) : undefined,
      areaUnit: formValue.areaUnit as PaddockAreaUnit,
      capacityAnimals: formValue.capacityAnimals
        ? Number(formValue.capacityAnimals)
        : undefined,
      status: formValue.status as PaddockStatus,
      notes: formValue.notes || undefined,
      createdAt: now,
      updatedAt: now,
    };
  }
}
