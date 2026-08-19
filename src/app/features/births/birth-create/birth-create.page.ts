import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { AppMessageCode } from 'src/app/core/enums/app-message-code.enum';
import {
  Animal,
  AnimalCategory,
  AnimalSex,
  AnimalSpecies,
  AnimalStatus,
} from 'src/app/core/models/animal.model';
import { Birth, BirthStatus } from 'src/app/core/models/birth.model';
import { AnimalService } from 'src/app/core/services/animal.service';
import { BirthService } from 'src/app/core/services/birth.service';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-birth-create',
  templateUrl: './birth-create.page.html',
  styleUrls: ['./birth-create.page.scss'],
})
export class BirthCreatePage implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private animalService: AnimalService = inject(AnimalService);
  private birthService: BirthService = inject(BirthService);
  private loadingService: LoadingService = inject(LoadingService);
  private messageService: MessageService = inject(MessageService);
  private navigationService: NavigationService = inject(NavigationService);
  private farmContextService: FarmContextService = inject(FarmContextService);

  readonly backUrl = APP_ROUTES.home;
  readonly sexOptions = Object.values(AnimalSex);
  readonly statusOptions = Object.values(BirthStatus);
  private farmId: string | null = null;
  animals: Animal[] = [];

  readonly form = this.formBuilder.group({
    motherId: ['', Validators.required],
    fatherId: [''],
    calfCode: ['', Validators.required],
    date: [this.getToday(), Validators.required],
    sex: [AnimalSex.Female, Validators.required],
    status: [BirthStatus.Alive, Validators.required],
    weight: [null as number | null],
    notes: [''],
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

    this.animals = await this.animalService.getAnimals(this.farmId);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
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

    const loading = await this.loadingService.createLoading();
    await loading.present();

    try {
      const calf = this.buildCalfAnimal(this.farmId);
      const birth = this.buildBirth(this.farmId, calf.id);

      await this.animalService.createAnimal(this.farmId, calf);
      await this.birthService.createBirth(this.farmId, birth);

      await this.messageService.showMessage(AppMessageCode.BirthCreated);
      await this.navigationService.goTo(APP_ROUTES.births);
    } catch (error) {
      console.error(error);
      await this.messageService.showMessage(AppMessageCode.BirthCreateError);
    } finally {
      await loading.dismiss();
    }
  }

  private buildCalfAnimal(farmId: string): Animal {
    const formValue = this.form.getRawValue();
    const now = new Date();

    return {
      id: crypto.randomUUID(),
      farmId,
      code: formValue.calfCode!,
      species: AnimalSpecies.Bovine,
      category: AnimalCategory.Calf,
      sex: formValue.sex!,
      birthDate: new Date(formValue.date!),
      status: AnimalStatus.Active,
      motherId: formValue.motherId!,
      fatherId: formValue.fatherId || undefined,
      notes: formValue.notes || undefined,
      createdAt: now,
      updatedAt: now,
    };
  }

  private buildBirth(farmId: string, calfId: string): Birth {
    const formValue = this.form.getRawValue();
    const now = new Date();

    return {
      id: crypto.randomUUID(),
      farmId,
      motherId: formValue.motherId!,
      fatherId: formValue.fatherId || undefined,
      calfId,
      date: new Date(formValue.date!),
      sex: formValue.sex!,
      status: formValue.status!,
      weight: formValue.weight || undefined,
      notes: formValue.notes || undefined,
      createdAt: now,
      updatedAt: now,
    };
  }

  private getToday(): string {
    return new Date().toISOString().substring(0, 10);
  }
}
