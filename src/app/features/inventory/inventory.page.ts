import { Component, inject, OnInit } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { Animal } from 'src/app/core/models/animal.model';
import { AnimalService } from 'src/app/core/services/animal.service';

import { NavigationService } from 'src/app/core/services/navigation.service';

type InventoryViewMode = 'list' | 'grid';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  private navigationService: NavigationService = inject(NavigationService);
  private animalService: AnimalService = inject(AnimalService);

  backUrl: string = APP_ROUTES.home;
  animals: Animal[] = [];
  isLoading: boolean = false;
  viewMode: InventoryViewMode = 'list';

  async ngOnInit() {
    await this.loadAnimals();
  }

  async ionViewWillEnter() {
    await this.loadAnimals();
  }

  setViewMode(viewMode: string | number): void {
    if (viewMode !== 'list' && viewMode !== 'grid') {
      return;
    }

    this.viewMode = viewMode;
  }

  private async loadAnimals(): Promise<void> {
    this.isLoading = true;
    try {
      this.animals = await this.animalService.getAnimals('demo-farm');
    } catch (error) {
      console.error(error);
      this.animals = [];
    } finally {
      this.isLoading = false;
    }
  }

  addAnimal() {
    this.navigationService.goTo(APP_ROUTES.createAnimal);
  }
}
