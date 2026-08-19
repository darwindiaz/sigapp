import { Component, inject, OnInit } from '@angular/core';

import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { Animal } from 'src/app/core/models/animal.model';
import { Birth, BirthStatus } from 'src/app/core/models/birth.model';
import { AnimalService } from 'src/app/core/services/animal.service';
import { BirthService } from 'src/app/core/services/birth.service';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-births',
  templateUrl: './births.page.html',
  styleUrls: ['./births.page.scss'],
})
export class BirthsPage implements OnInit {
  private birthService: BirthService = inject(BirthService);
  private animalService: AnimalService = inject(AnimalService);
  private navigationService: NavigationService = inject(NavigationService);
  private farmContextService: FarmContextService = inject(FarmContextService);

  readonly backUrl = APP_ROUTES.home;

  births: Birth[] = [];
  animals: Animal[] = [];
  animalLabelById = new Map<string, string>();

  isLoading = false;

  async ngOnInit(): Promise<void> {
    await this.loadBirths();
  }

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

    try {
      const [births, animals] = await Promise.all([
        this.birthService.getBirths(farmId),
        this.animalService.getAnimals(farmId),
      ]);

      this.births = births;
      this.animals = animals;

      this.animalLabelById = new Map(
        this.animals.map((animal) => [animal.id, animal.code || animal.id]),
      );
    } catch (error) {
      console.error(error);
      this.births = [];
      this.animals = [];
    } finally {
      this.isLoading = false;
    }
  }

  async goToCreateBirth(): Promise<void> {
    await this.navigationService.goTo(APP_ROUTES.createBirth);
  }

  getAnimalLabel(animalId?: string): string {
    if (!animalId) {
      return 'No asociado';
    }

    return this.animalLabelById.get(animalId) || animalId;
  }

  getBirthStatusLabel(status: BirthStatus): string {
    const labels: Record<BirthStatus, string> = {
      [BirthStatus.Alive]: 'Vivo',
      [BirthStatus.Dead]: 'Muerto',
      [BirthStatus.Weak]: 'Débil',
    };

    return labels[status];
  }
}
