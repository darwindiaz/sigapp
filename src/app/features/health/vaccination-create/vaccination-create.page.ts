import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { AppMessageCode } from 'src/app/core/enums/app-message-code.enum';
import { Animal } from 'src/app/core/models/animal.model';
import {
  HealthEvent,
  HealthEventType,
} from 'src/app/core/models/health-event.model';
import { AnimalService } from 'src/app/core/services/animal.service';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { HealthEventService } from 'src/app/core/services/health-event.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import {
  nonBlankValidator,
  notFutureDateValidator,
} from 'src/app/core/validators/form.validators';

@Component({
  selector: 'app-vaccination-create',
  templateUrl: './vaccination-create.page.html',
  styleUrls: ['./vaccination-create.page.scss'],
})
export class VaccinationCreatePage implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private animalService: AnimalService = inject(AnimalService);
  private healthEventService: HealthEventService = inject(HealthEventService);
  private loadingService: LoadingService = inject(LoadingService);
  private messageService: MessageService = inject(MessageService);
  private navigationService: NavigationService = inject(NavigationService);
  private farmContextService: FarmContextService = inject(FarmContextService);

  readonly backUrl = APP_ROUTES.health;
  readonly today = this.getToday();
  private farmId: string | null = null;
  animals: Animal[] = [];
  isLoadingAnimals = true;
  hasAnimalLoadError = false;
  isSubmitting = false;

  readonly form = this.formBuilder.group({
    animalId: ['', Validators.required],
    product: [
      '',
      [Validators.required, nonBlankValidator, Validators.maxLength(100)],
    ],
    date: [
      this.getToday(),
      [Validators.required, notFutureDateValidator],
    ],
    nextDate: [''],
    dose: ['', Validators.maxLength(50)],
    responsible: ['', Validators.maxLength(100)],
    notes: ['', Validators.maxLength(500)],
  });

  async ngOnInit(): Promise<void> {
    this.farmId = await this.farmContextService.requireActiveFarmId();

    if (!this.farmId) {
      await this.navigationService.goTo(APP_ROUTES.createFarm);
      return;
    }

    await this.loadAnimals();
  }

  async loadAnimals(): Promise<void> {
    if (!this.farmId) {
      return;
    }
    this.isLoadingAnimals = true;
    this.hasAnimalLoadError = false;

    try {
      this.animals = await this.animalService.getAnimals(this.farmId);
    } catch (error) {
      console.error(error);
      this.animals = [];
      this.hasAnimalLoadError = true;
    } finally {
      this.isLoadingAnimals = false;
    }
  }

  getToday(): string {
    const today = new Date();

    return [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
    ].join('-');
  }

  async onSubmit(): Promise<void> {
    if (this.isSubmitting) {
      return;
    }

    const { date, nextDate } = this.form.getRawValue();

    if (date && nextDate && nextDate < date) {
      this.form.controls.nextDate.setErrors({ dateBefore: true });
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

    if (!this.animals.length) {
      await this.messageService.showMessage(AppMessageCode.AnimalsRequired);
      return;
    }

    this.isSubmitting = true;
    const loading = await this.loadingService.createLoading(
      'Guardando vacunación...',
    );
    await loading.present();

    try {
      const healthEvent = this.buildHealthEvent(this.farmId);

      await this.healthEventService.createHealthEvent(this.farmId, healthEvent);

      await this.messageService.showMessage(AppMessageCode.VaccinationCreated);
      await this.navigationService.goTo(APP_ROUTES.health);
      this.form.reset({
        date: this.getToday(),
      });
    } catch (error) {
      console.error(error);
      await this.messageService.showMessage(
        AppMessageCode.VaccinationCreateError,
      );
    } finally {
      this.isSubmitting = false;
      await loading.dismiss();
    }
  }

  async goToCreateAnimal(): Promise<void> {
    await this.navigationService.goTo(APP_ROUTES.createAnimal);
  }

  private buildHealthEvent(farmId: string): HealthEvent {
    const formValue = this.form.getRawValue();

    return {
      id: crypto.randomUUID(),
      farmId,
      animalId: formValue.animalId!,
      type: HealthEventType.Vaccine,
      product: formValue.product!.trim(),
      date: new Date(formValue.date!),
      nextDate: formValue.nextDate ? new Date(formValue.nextDate) : undefined,
      dose: formValue.dose?.trim() || undefined,
      responsible: formValue.responsible?.trim() || undefined,
      notes: formValue.notes?.trim() || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
