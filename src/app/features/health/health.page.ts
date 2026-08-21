import { Component, inject } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { Animal } from 'src/app/core/models/animal.model';
import {
  HealthEvent,
  HealthEventType,
} from 'src/app/core/models/health-event.model';
import { AnimalService } from 'src/app/core/services/animal.service';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { HealthEventService } from 'src/app/core/services/health-event.service';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
})
export class HealthPage {
  private healthEventService: HealthEventService = inject(HealthEventService);
  private animalService: AnimalService = inject(AnimalService);
  private navigationService: NavigationService = inject(NavigationService);
  private farmContextService: FarmContextService = inject(FarmContextService);

  readonly backUrl = APP_ROUTES.home;

  healthEvents: HealthEvent[] = [];
  filteredHealthEvents: HealthEvent[] = [];
  animals: Animal[] = [];
  animalLabelById = new Map<string, string>();
  isLoading = true;
  hasLoadError = false;

  async ionViewWillEnter(): Promise<void> {
    await this.loadHealthEvents();
  }

  async loadHealthEvents(): Promise<void> {
    const farmId = await this.farmContextService.requireActiveFarmId();

    if (!farmId) {
      await this.navigationService.goTo(APP_ROUTES.createFarm);
      return;
    }

    this.isLoading = true;
    this.hasLoadError = false;
    try {
      const [healthEvents, animals] = await Promise.all([
        this.healthEventService.getHealthEvents(farmId),
        this.animalService.getAnimals(farmId),
      ]);

      this.healthEvents = healthEvents;
      this.animals = animals;

      this.animalLabelById = new Map(
        this.animals.map((animal) => [animal.id, animal.code || animal.id]),
      );

      this.filteredHealthEvents = [...this.healthEvents];
    } catch (error) {
      console.error(error);
      this.healthEvents = [];
      this.filteredHealthEvents = [];
      this.animals = [];
      this.hasLoadError = true;
    } finally {
      this.isLoading = false;
    }
  }

  onSearch(event: CustomEvent): void {
    const value = this.normalizeText(event.detail.value || '');

    if (!value) {
      this.filteredHealthEvents = [...this.healthEvents];
      return;
    }

    this.filteredHealthEvents = this.healthEvents.filter((healthEvent) => {
      const type = this.normalizeText(this.getEventTypeLabel(healthEvent.type));
      const product = this.normalizeText(healthEvent.product || '');
      const animalId = this.normalizeText(healthEvent.animalId || '');
      const animalLabel = this.normalizeText(
        this.getAnimalLabel(healthEvent.animalId),
      );

      return (
        type.includes(value) ||
        product.includes(value) ||
        animalId.includes(value) ||
        animalLabel.includes(value)
      );
    });
  }

  getAnimalLabel(animalId?: string): string {
    if (!animalId) {
      return 'No asociado';
    }

    return this.animalLabelById.get(animalId) || animalId;
  }

  private normalizeText(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  async goToCreateVaccination(): Promise<void> {
    await this.navigationService.goTo(APP_ROUTES.createVaccination);
  }

  trackByHealthEventId(_index: number, event: HealthEvent): string {
    return event.id;
  }

  getEventTypeLabel(type: HealthEventType): string {
    const labels: Record<HealthEventType, string> = {
      [HealthEventType.Vaccine]: 'Vacuna',
      [HealthEventType.Deworming]: 'Desparasitación',
      [HealthEventType.Treatment]: 'Tratamiento',
      [HealthEventType.Disease]: 'Enfermedad',
      [HealthEventType.Checkup]: 'Chequeo',
      [HealthEventType.Bath]: 'Baño',
      [HealthEventType.Other]: 'Otro',
    };

    return labels[type];
  }
}
