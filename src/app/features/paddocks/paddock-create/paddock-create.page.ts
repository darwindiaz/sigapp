import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import {
  Paddock,
  PaddockAreaUnit,
  PaddockStatus,
} from 'src/app/core/models/paddock.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { PaddockService } from 'src/app/core/services/paddock.service';

@Component({
  selector: 'app-paddock-create',
  templateUrl: './paddock-create.page.html',
  styleUrls: ['./paddock-create.page.scss'],
})
export class PaddockCreatePage {
  private formBuilder = inject(FormBuilder);
  private paddockService = inject(PaddockService);
  private loadingService = inject(LoadingService);
  private messageService = inject(MessageService);
  private navigationService = inject(NavigationService);

  readonly backUrl = APP_ROUTES.paddocks;

  readonly statusOptions = Object.values(PaddockStatus);
  readonly areaUnitOptions = Object.values(PaddockAreaUnit);

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required]],
    area: [''],
    areaUnit: [PaddockAreaUnit.Hectares],
    capacityAnimals: [''],
    status: [PaddockStatus.Available, [Validators.required]],
    notes: [''],
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const loading = await this.loadingService.createLoading();
    await loading.present();

    try {
      const paddock = this.buildPaddock();

      await this.paddockService.createPaddock(paddock.farmId, paddock);
      this.navigationService.goTo(APP_ROUTES.paddocks);
    } catch (error) {
      console.error(error);
    } finally {
      loading.dismiss();
    }
  }

  private buildPaddock(): Paddock {
    const now = new Date();
    const formValue = this.form.getRawValue();

    return {
      id: crypto.randomUUID(),
      farmId: 'demo-farm',
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
