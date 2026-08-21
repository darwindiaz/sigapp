import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { ANIMAL_SPECIES_LABELS } from 'src/app/core/constants/domain-labels.constant';
import { AppMessageCode } from 'src/app/core/enums/app-message-code.enum';
import { Animal } from 'src/app/core/models/animal.model';
import { PaddockMovement } from 'src/app/core/models/paddock-movement.model';
import { Paddock } from 'src/app/core/models/paddock.model';
import { AnimalService } from 'src/app/core/services/animal.service';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { PaddockMovementService } from 'src/app/core/services/paddock-movement.service';
import { PaddockService } from 'src/app/core/services/paddock.service';
import { notFutureDateValidator } from 'src/app/core/validators/form.validators';

@Component({
  selector: 'app-paddock-movement-create',
  templateUrl: './paddock-movement-create.page.html',
  styleUrls: ['./paddock-movement-create.page.scss'],
})
export class PaddockMovementCreatePage implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private animalService: AnimalService = inject(AnimalService);
  private paddockService: PaddockService = inject(PaddockService);
  private paddockMovementServices: PaddockMovementService = inject(
    PaddockMovementService,
  );
  private loadingService: LoadingService = inject(LoadingService);
  private messageService: MessageService = inject(MessageService);
  private navigationService: NavigationService = inject(NavigationService);
  private farmContextService: FarmContextService = inject(FarmContextService);

  readonly backUrl = APP_ROUTES.paddocks;
  readonly speciesLabels = ANIMAL_SPECIES_LABELS;
  readonly today = this.getToday();
  private farmId: string | null = null;
  animals: Animal[] = [];
  paddocks: Paddock[] = [];
  selectedAnimal?: Animal;
  isLoadingData = true;
  hasDataLoadError = false;
  isSubmitting = false;

  readonly form = this.formBuilder.group({
    animalId: ['', [Validators.required]],
    toPaddockId: ['', [Validators.required]],
    movementDate: [
      this.getToday(),
      [Validators.required, notFutureDateValidator],
    ],
    notes: ['', Validators.maxLength(500)],
  });

  async ngOnInit(): Promise<void> {
    this.farmId = await this.farmContextService.requireActiveFarmId();

    if (!this.farmId) {
      await this.navigationService.goTo(APP_ROUTES.createFarm);
      return;
    }

    await this.loadData();
  }

  async loadData(): Promise<void> {
    if (!this.farmId) {
      return;
    }
    this.isLoadingData = true;
    this.hasDataLoadError = false;

    try {
      const [animals, paddocks] = await Promise.all([
        this.animalService.getAnimals(this.farmId),
        this.paddockService.getPaddocks(this.farmId),
      ]);

      this.animals = animals;
      this.paddocks = paddocks;
    } catch (error) {
      console.error(error);
      this.animals = [];
      this.paddocks = [];
      this.hasDataLoadError = true;
    } finally {
      this.isLoadingData = false;
    }
  }

  onAnimalChange(animalId: string | number | undefined): void {
    if (typeof animalId !== 'string') {
      this.selectedAnimal = undefined;
      return;
    }

    this.selectedAnimal = this.animals.find((animal) => animal.id === animalId);

    if (
      this.selectedAnimal?.paddockId === this.form.controls.toPaddockId.value
    ) {
      this.form.controls.toPaddockId.reset('');
    }
  }

  async onSubmit(): Promise<void> {
    if (this.isSubmitting) {
      return;
    }

    if (this.form.invalid || !this.selectedAnimal) {
      this.form.markAllAsTouched();
      await this.messageService.showMessage(AppMessageCode.RequiredFields);
      return;
    }

    if (!this.farmId) {
      await this.navigationService.goTo(APP_ROUTES.createFarm);
      return;
    }

    const formValue = this.form.getRawValue();
    const fromPaddockId = this.selectedAnimal.paddockId;
    const toPaddockId = formValue.toPaddockId ?? '';

    if (fromPaddockId && fromPaddockId === toPaddockId) {
      await this.messageService.showMessage(AppMessageCode.DiffPaddock);
      return;
    }

    this.isSubmitting = true;
    const loading = await this.loadingService.createLoading(
      'Guardando movimiento...',
    );
    await loading.present();

    try {
      const now = new Date();

      const movement: PaddockMovement = {
        id: crypto.randomUUID(),
        farmId: this.farmId,
        animalId: this.selectedAnimal.id,
        fromPaddockId,
        toPaddockId,
        movementDate: new Date(formValue.movementDate ?? now),
        notes: formValue.notes?.trim() || undefined,
        createdAt: now,
        updatedAt: now,
      };

      await this.paddockMovementServices.createMovement(
        movement.farmId,
        movement,
      );

      await this.animalService.updateAnimal(
        this.farmId,
        this.selectedAnimal.id,
        {
          paddockId: toPaddockId,
          updatedAt: now,
        },
      );

      await this.messageService.showMessage(
        AppMessageCode.PaddockMovementCreated,
      );
      await this.navigationService.goTo(APP_ROUTES.paddocks);
    } catch (error) {
      console.error(error);
      await this.messageService.showMessage(
        AppMessageCode.PaddockMovementCreateError,
      );
    } finally {
      this.isSubmitting = false;
      await loading.dismiss();
    }
  }

  get destinationPaddocks(): Paddock[] {
    return this.paddocks.filter(
      (paddock) => paddock.id !== this.selectedAnimal?.paddockId,
    );
  }

  async goToCreateAnimal(): Promise<void> {
    await this.navigationService.goTo(APP_ROUTES.createAnimal);
  }

  async goToCreatePaddock(): Promise<void> {
    await this.navigationService.goTo(APP_ROUTES.createPaddock);
  }

  getPaddockName(paddockId?: string): string {
    if (!paddockId) {
      return 'Sin asignar';
    }

    return (
      this.paddocks.find((paddock) => paddock.id === paddockId)?.name ??
      'Potrero no encontrado'
    );
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
