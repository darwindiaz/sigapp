import { Component, inject } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import {
  ANIMAL_CATEGORY_LABELS,
  ANIMAL_SEX_LABELS,
  ANIMAL_SPECIES_LABELS,
  ANIMAL_STATUS_LABELS,
} from 'src/app/core/constants/domain-labels.constant';
import { Animal } from 'src/app/core/models/animal.model';
import { AnimalService } from 'src/app/core/services/animal.service';
import { FarmContextService } from 'src/app/core/services/farm-context.service';

import { NavigationService } from 'src/app/core/services/navigation.service';

type InventoryViewMode = 'list' | 'grid';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage {
  private navigationService: NavigationService = inject(NavigationService);
  private animalService: AnimalService = inject(AnimalService);
  private farmContextService: FarmContextService = inject(FarmContextService);

  readonly backUrl: string = APP_ROUTES.home;
  readonly speciesLabels = ANIMAL_SPECIES_LABELS;
  readonly categoryLabels = ANIMAL_CATEGORY_LABELS;
  readonly sexLabels = ANIMAL_SEX_LABELS;
  readonly statusLabels = ANIMAL_STATUS_LABELS;

  animals: Animal[] = [];
  filteredAnimals: Animal[] = [];
  isLoading = true;
  hasLoadError = false;
  viewMode: InventoryViewMode = 'list';

  async ionViewWillEnter(): Promise<void> {
    await this.loadAnimals();
  }

  setViewMode(viewMode: string | number): void {
    if (viewMode !== 'list' && viewMode !== 'grid') {
      return;
    }

    this.viewMode = viewMode;
  }

  async loadAnimals(): Promise<void> {
    const farmId = await this.farmContextService.requireActiveFarmId();

    if (!farmId) {
      await this.navigationService.goTo(APP_ROUTES.createFarm);
      return;
    }

    this.isLoading = true;
    this.hasLoadError = false;
    try {
      this.animals = await this.animalService.getAnimals(farmId);
      this.filteredAnimals = [...this.animals];
    } catch (error) {
      console.error(error);
      this.animals = [];
      this.filteredAnimals = [];
      this.hasLoadError = true;
    } finally {
      this.isLoading = false;
    }
  }

  onSearch(event: CustomEvent): void {
    const value = this.normalizeText(event.detail.value || '');

    if (!value) {
      this.filteredAnimals = [...this.animals];
      return;
    }

    this.filteredAnimals = this.animals.filter((animal) => {
      const searchableText = [
        animal.code,
        this.speciesLabels[animal.species],
        this.categoryLabels[animal.category],
        this.sexLabels[animal.sex],
        this.statusLabels[animal.status],
        animal.paddockId,
      ]
        .filter(Boolean)
        .join(' ');

      return this.normalizeText(searchableText).includes(value);
    });
  }

  async addAnimal(): Promise<void> {
    await this.navigationService.goTo(APP_ROUTES.createAnimal);
  }

  trackByAnimalId(_index: number, animal: Animal): string {
    return animal.id;
  }

  private normalizeText(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
