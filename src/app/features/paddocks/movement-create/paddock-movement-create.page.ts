import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
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
  private farmId: string | null = null;
  animals: Animal[] = [];
  paddocks: Paddock[] = [];
  selectedAnimal?: Animal;

  readonly form = this.formBuilder.group({
    animalId: ['', [Validators.required]],
    toPaddockId: ['', [Validators.required]],
    movementDate: [
      new Date().toISOString().substring(0, 10),
      [Validators.required],
    ],
    notes: [''],
  });

  async ngOnInit(): Promise<void> {
    this.farmId = await this.farmContextService.requireActiveFarmId();

    if (!this.farmId) {
      await this.navigationService.goTo(APP_ROUTES.createFarm);
      return;
    }

    await this.loadData();
  }

  private async loadData(): Promise<void> {
    if (!this.farmId) {
      return;
    }
    const [animals, paddocks] = await Promise.all([
      this.animalService.getAnimals(this.farmId),
      this.paddockService.getPaddocks(this.farmId),
    ]);

    this.animals = animals;
    this.paddocks = paddocks;
  }

  onAnimalChange(animalId: string | number | undefined): void {
    if (typeof animalId !== 'string') {
      this.selectedAnimal = undefined;
      return;
    }

    this.selectedAnimal = this.animals.find((animal) => animal.id === animalId);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || !this.selectedAnimal) {
      this.form.markAllAsTouched();
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
      console.warn('El potrero destino debe ser diferente al actual.');
      this.messageService.showMessage(AppMessageCode.DiffPaddock);
      return;
    }

    const loading = await this.loadingService.createLoading();
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
        notes: formValue.notes || undefined,
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

      await this.navigationService.goTo(APP_ROUTES.paddocks);
    } catch (error) {
      console.error(error);
    } finally {
      loading.dismiss();
    }
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
}
