import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import {
  ANIMAL_CATEGORY_LABELS,
  ANIMAL_PURPOSE_LABELS,
  ANIMAL_SEX_LABELS,
  ANIMAL_SPECIES_LABELS,
  ANIMAL_STATUS_LABELS,
} from 'src/app/core/constants/domain-labels.constant';
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
import {
  nonBlankValidator,
  notFutureDateValidator,
} from 'src/app/core/validators/form.validators';

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

  readonly speciesLabels = ANIMAL_SPECIES_LABELS;
  readonly categoryLabels = ANIMAL_CATEGORY_LABELS;
  readonly sexLabels = ANIMAL_SEX_LABELS;
  readonly statusLabels = ANIMAL_STATUS_LABELS;
  readonly purposeLabels = ANIMAL_PURPOSE_LABELS;
  readonly today = this.getToday();

  readonly form!: FormGroup;
  paddocks: Paddock[] = [];
  isLoadingPaddocks = false;
  hasPaddockLoadError = false;
  isSubmitting = false;
  private farmId: string | null = null;

  constructor() {
    this.form = this.formBuilder.group({
      code: [
        '',
        [Validators.required, nonBlankValidator, Validators.maxLength(50)],
      ],
      species: ['', [Validators.required]],
      category: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      birthDate: ['', notFutureDateValidator],
      status: [AnimalStatus.Active, [Validators.required]],
      paddockId: [''],
      purpose: [''],
      notes: ['', Validators.maxLength(500)],
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
    this.hasPaddockLoadError = false;

    try {
      this.paddocks = await this.paddockService.getPaddocks(this.farmId);
    } catch (error) {
      console.error(error);
      this.paddocks = [];
      this.hasPaddockLoadError = true;
    } finally {
      this.isLoadingPaddocks = false;
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
      'Guardando animal...',
    );
    await loading.present();

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
      this.isSubmitting = false;
      await loading.dismiss();
    }
  }

  private buildAnimal(farmId: string): Animal {
    const now = new Date();
    const formValue = this.form.getRawValue();

    return {
      id: crypto.randomUUID(),
      farmId: farmId,
      code: formValue.code?.trim() ?? '',
      species: formValue.species as Animal['species'],
      category: formValue.category as Animal['category'],
      sex: formValue.sex as Animal['sex'],
      birthDate: formValue.birthDate
        ? new Date(formValue.birthDate)
        : undefined,
      status: formValue.status as Animal['status'],
      paddockId: formValue.paddockId || undefined,
      purpose: (formValue.purpose as Animal['purpose']) || undefined,
      notes: formValue.notes?.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    };
  }

  private getToday(): string {
    const today = new Date();

    return [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
    ].join('-');
  }
}
