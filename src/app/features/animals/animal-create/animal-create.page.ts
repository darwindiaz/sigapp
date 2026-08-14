import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {} from '@capacitor/core';

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

import { AnimalService } from 'src/app/core/services/animal.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.page.html',
  styleUrls: ['./animal-create.page.scss'],
})
export class AnimalCreatePage {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private animalService: AnimalService = inject(AnimalService);
  private loadingService: LoadingService = inject(LoadingService);
  private messageService: MessageService = inject(MessageService);
  private navegationService: NavigationService = inject(NavigationService);

  readonly backUrl = APP_ROUTES.inventory;
  readonly speciesOptions = Object.values(AnimalSpecies);
  readonly categoryOptions = Object.values(AnimalCategory);
  readonly sexOptions = Object.values(AnimalSex);
  readonly statusOptions = Object.values(AnimalStatus);
  readonly purposeOptions = Object.values(AnimalPurpose);

  readonly form!: FormGroup;

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

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const loading =
      await this.loadingService.createLoading('Guardando registro');
    loading.present();

    try {
      const animal = this.buildAnimal();
      await this.animalService.createAnimal(animal.farmId, animal);
      await this.messageService.showMessage(AppMessageCode.AnimalCreated);

      this.form.reset({ active: AnimalStatus.Active });

      await this.navegationService.goTo(APP_ROUTES.inventory);
    } catch (error) {
      console.error(error);
      await this.messageService.showMessage(AppMessageCode.UnexpectedError);
    } finally {
      loading.dismiss();
    }
  }

  private buildAnimal(): Animal {
    const now = new Date();
    const formValue = this.form.getRawValue();

    return {
      id: crypto.randomUUID(),
      farmId: 'demo-farm',
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
