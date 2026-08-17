import { Component, inject, OnInit } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { Animal } from 'src/app/core/models/animal.model';
import {
  HealthEvent,
  HealthEventType,
} from 'src/app/core/models/health-event.model';
import { AnimalService } from 'src/app/core/services/animal.service';
import { HealthEventService } from 'src/app/core/services/health-event.service';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
})
export class HealthPage implements OnInit {
  private healthEventService: HealthEventService = inject(HealthEventService);
  private animalService: AnimalService = inject(AnimalService);
  private navigationService: NavigationService = inject(NavigationService);

  readonly backUrl = APP_ROUTES.home;
  readonly farmId = 'demo-farm';

  healthEvents: HealthEvent[] = [];
  filteredHealthEvents: HealthEvent[] = [];
  animals: Animal[] = [];
  animalLabelById = new Map<string, string>();
  isLoading = false;

  async ngOnInit(): Promise<void> {
    await this.loadHealthEvents();
  }

  async ionViewWillEnter(): Promise<void> {
    await this.loadHealthEvents();
  }

  async loadHealthEvents() {
    this.isLoading = true;
    const [healthEvents, animals] = await Promise.all([
      this.healthEventService.getHealthEvents(this.farmId),
      this.animalService.getAnimals(this.farmId),
    ]);

    this.healthEvents = healthEvents;
    this.animals = animals;

    this.animalLabelById = new Map(
      this.animals.map((animal) => [animal.id, animal.code || animal.id]),
    );

    this.filteredHealthEvents = [...this.healthEvents];
    this.isLoading = false;
  }

  onSearch(event: CustomEvent) {
    const value = event.detail.value?.toLowerCase().trim() || '';

    if (!value) {
      this.filteredHealthEvents = [...this.healthEvents];
      return;
    }

    this.filteredHealthEvents = this.healthEvents.filter((healthEvent) => {
      const type = this.getEventTypeLabel(healthEvent.type).toLowerCase();
      const product = this.normalizeText(
        healthEvent.product?.toLowerCase() || '',
      );
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

  async goToCreateVaccination() {
    await this.navigationService.goTo(APP_ROUTES.createVaccination);
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
