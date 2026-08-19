import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_MESSAGES } from 'src/app/core/constants/app-messages.constant';

import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { AppMessageCode } from 'src/app/core/enums/app-message-code.enum';
import {
  Animal,
  AnimalCategory,
  AnimalPurpose,
  AnimalSex,
  AnimalSpecies,
  AnimalStatus,
} from 'src/app/core/models/animal.model';
import { Paddock } from 'src/app/core/models/paddock.model';

import { AnimalService } from 'src/app/core/services/animal.service';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { PaddockService } from 'src/app/core/services/paddock.service';

@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.page.html',
  styleUrls: ['./animal-create.page.scss'],
})
export class AnimalCreatePage implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private animalService: AnimalService = inject(AnimalService);
  private loadingService: LoadingService = inject(LoadingService);
  private messageService: MessageService = inject(MessageService);
  private navigationService: NavigationService = inject(NavigationService);
  private paddockService: PaddockService = inject(PaddockService);
  private farmContextService: FarmContextService = inject(FarmContextService);

  readonly backUrl = APP_ROUTES.inventory;
  readonly speciesOptions = Object.values(AnimalSpecies);
  readonly categoryOptions = Object.values(AnimalCategory);
  readonly sexOptions = Object.values(AnimalSex);
  readonly statusOptions = Object.values(AnimalStatus);
  readonly purposeOptions = Object.values(AnimalPurpose);

  readonly form!: FormGroup;
  paddocks: Paddock[] = [];
  isLoadingPaddocks = false;
  private farmId: string | null = null;

  constructor() {
    this.form = this.formBuilder.group({
      code: ['', [Validators.required]],
      species: ['', [Validators.required]],
      category: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      birthDate: [''],
      status: [AnimalStatus.Active, [Validators.required]],
      paddockId: [''],
      purpose: [''],
      notes: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    this.farmId = await this.farmContextService.getActiveFarmId();

    if (!this.farmId) {
      await this.navigationService.goTo(APP_ROUTES.createFarm);
      return;
    }

    await this.loadPaddocks();
  }

  async loadPaddocks(): Promise<void> {
    if (!this.farmId) {
      return;
    }

    this.isLoadingPaddocks = true;

    try {
      this.paddocks = await this.paddockService.getPaddocks(this.farmId);
    } catch (error) {
      console.error(error);
      await this.messageService.showMessage(AppMessageCode.AnimalCreatedError);
      this.paddocks = [];
    } finally {
      this.isLoadingPaddocks = false;
    }
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

    const loading =
      await this.loadingService.createLoading('Guardando registro');
    loading.present();

    try {
      const animal = this.buildAnimal(this.farmId);
      await this.animalService.createAnimal(this.farmId, animal);
      await this.messageService.showMessage(AppMessageCode.AnimalCreated);

      this.form.reset({ status: AnimalStatus.Active });

      await this.navigationService.goTo(APP_ROUTES.inventory);
    } catch (error) {
      console.error(error);
      await this.messageService.showMessage(AppMessageCode.UnexpectedError);
    } finally {
      loading.dismiss();
    }
  }

  private buildAnimal(farmId: string): Animal {
    const now = new Date();
    const formValue = this.form.getRawValue();

    return {
      id: crypto.randomUUID(),
      farmId: farmId,
      code: formValue.code ?? '',
      species: formValue.species as Animal['species'],
      category: formValue.category as Animal['category'],
      sex: formValue.sex as Animal['sex'],
      birthDate: formValue.birthDate
        ? new Date(formValue.birthDate)
        : undefined,
      status: formValue.status as Animal['status'],
      paddockId: formValue.paddockId || undefined,
      purpose: (formValue.purpose as Animal['purpose']) || undefined,
      notes: formValue.notes || undefined,
      createdAt: now,
      updatedAt: now,
    };
  }
}
