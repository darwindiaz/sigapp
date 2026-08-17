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
import { HealthEventService } from 'src/app/core/services/health-event.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NavigationService } from 'src/app/core/services/navigation.service';

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

  readonly backUrl = APP_ROUTES.health;
  readonly farmId = 'demo-farm';
  animals: Animal[] = [];

  readonly form = this.formBuilder.group({
    animalId: ['', Validators.required],
    product: ['', Validators.required],
    date: [this.getToday(), Validators.required],
    nextDate: [''],
    dose: [''],
    responsible: [''],
    notes: [''],
  });

  async ngOnInit(): Promise<void> {
    await this.loadAnimals();
  }

  async loadAnimals() {
    this.animals = await this.animalService.getAnimals(this.farmId);
  }

  getToday() {
    return new Date().toISOString().substring(0, 10);
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.animals.length) {
      await this.messageService.showMessage(AppMessageCode.AnimalsRequired);
      return;
    }

    const loading = await this.loadingService.createLoading();
    await loading.present();

    try {
      const healthEvent = this.buildHealtEvent();

      await this.healthEventService.createHealthEvent(this.farmId, healthEvent);

      await this.messageService.showMessage(AppMessageCode.VaccinationCreated);
      await this.navigationService.goTo(APP_ROUTES.health);
      this.form.reset({
        date: this.getToday(),
      });
    } catch (error) {
      console.error(error);
      this.messageService.showMessage(AppMessageCode.VaccinationCreateError);
    } finally {
      loading.dismiss();
    }
  }

  private buildHealtEvent(): HealthEvent {
    const formValue = this.form.getRawValue();

    return {
      id: crypto.randomUUID(),
      farmId: this.farmId,
      animalId: formValue.animalId!,
      type: HealthEventType.Vaccine,
      product: formValue.product!,
      date: new Date(formValue.date!),
      nextDate: formValue.nextDate ? new Date(formValue.nextDate) : undefined,
      dose: formValue.dose || undefined,
      responsible: formValue.responsible || undefined,
      notes: formValue.notes || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
