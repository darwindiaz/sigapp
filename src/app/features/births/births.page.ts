import { Component, inject } from '@angular/core';

import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import {
  ANIMAL_SEX_LABELS,
  BIRTH_STATUS_LABELS,
} from 'src/app/core/constants/domain-labels.constant';
import { Animal } from 'src/app/core/models/animal.model';
import { Birth } from 'src/app/core/models/birth.model';
import { AnimalService } from 'src/app/core/services/animal.service';
import { BirthService } from 'src/app/core/services/birth.service';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-births',
  templateUrl: './births.page.html',
  styleUrls: ['./births.page.scss'],
})
export class BirthsPage {
  private birthService: BirthService = inject(BirthService);
  private animalService: AnimalService = inject(AnimalService);
  private navigationService: NavigationService = inject(NavigationService);
  private farmContextService: FarmContextService = inject(FarmContextService);

  readonly backUrl = APP_ROUTES.home;
  readonly birthStatusLabels = BIRTH_STATUS_LABELS;
  readonly sexLabels = ANIMAL_SEX_LABELS;

  births: Birth[] = [];
  filteredBirths: Birth[] = [];
  animals: Animal[] = [];
  animalLabelById = new Map<string, string>();

  isLoading = true;
  hasLoadError = false;

  async ionViewWillEnter(): Promise<void> {
    await this.loadBirths();
  }

  async loadBirths(): Promise<void> {
    const farmId = await this.farmContextService.requireActiveFarmId();

    if (!farmId) {
      await this.navigationService.goTo(APP_ROUTES.createFarm);
      return;
    }
    this.isLoading = true;
    this.hasLoadError = false;

    try {
      const [births, animals] = await Promise.all([
        this.birthService.getBirths(farmId),
        this.animalService.getAnimals(farmId),
      ]);

      this.births = births;
      this.filteredBirths = [...births];
      this.animals = animals;

      this.animalLabelById = new Map(
        this.animals.map((animal) => [animal.id, animal.code || animal.id]),
      );
    } catch (error) {
      console.error(error);
      this.births = [];
      this.filteredBirths = [];
      this.animals = [];
      this.hasLoadError = true;
    } finally {
      this.isLoading = false;
    }
  }

  async goToCreateBirth(): Promise<void> {
    await this.navigationService.goTo(APP_ROUTES.createBirth);
  }

  onSearch(event: CustomEvent): void {
    const value = this.normalizeText(event.detail.value || '');

    if (!value) {
      this.filteredBirths = [...this.births];
      return;
    }

    this.filteredBirths = this.births.filter((birth) => {
      const searchableText = [
        this.getAnimalLabel(birth.calfId),
        this.getAnimalLabel(birth.motherId),
        this.getAnimalLabel(birth.fatherId),
        this.sexLabels[birth.sex],
        this.birthStatusLabels[birth.status],
        birth.date instanceof Date
          ? birth.date.toLocaleDateString('es-CO')
          : String(birth.date),
      ].join(' ');

      return this.normalizeText(searchableText).includes(value);
    });
  }

  getAnimalLabel(animalId?: string): string {
    if (!animalId) {
      return 'No asociado';
    }

    return this.animalLabelById.get(animalId) || animalId;
  }

  trackByBirthId(_index: number, birth: Birth): string {
    return birth.id;
  }

  private normalizeText(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
