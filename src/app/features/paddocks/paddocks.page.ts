import { Component, inject } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import {
  PADDOCK_AREA_UNIT_LABELS,
  PADDOCK_STATUS_LABELS,
} from 'src/app/core/constants/domain-labels.constant';

import { Paddock } from 'src/app/core/models/paddock.model';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { PaddockService } from 'src/app/core/services/paddock.service';

@Component({
  selector: 'app-paddocks',
  templateUrl: './paddocks.page.html',
  styleUrls: ['./paddocks.page.scss'],
})
export class PaddocksPage {
  private navigationService: NavigationService = inject(NavigationService);
  private paddockService: PaddockService = inject(PaddockService);
  private farmContextService: FarmContextService = inject(FarmContextService);

  readonly statusLabels = PADDOCK_STATUS_LABELS;
  readonly areaUnitLabels = PADDOCK_AREA_UNIT_LABELS;
  readonly backUrl = APP_ROUTES.home;

  paddocks: Paddock[] = [];
  filteredPaddocks: Paddock[] = [];
  isLoading = true;
  hasLoadError = false;

  async ionViewWillEnter(): Promise<void> {
    await this.loadPaddocks();
  }

  async loadPaddocks(): Promise<void> {
    const farmId = await this.farmContextService.requireActiveFarmId();

    if (!farmId) {
      await this.navigationService.goTo(APP_ROUTES.createFarm);
      return;
    }

    this.isLoading = true;
    this.hasLoadError = false;

    try {
      this.paddocks = await this.paddockService.getPaddocks(farmId);
      this.filteredPaddocks = [...this.paddocks];
    } catch (error) {
      console.error(error);
      this.paddocks = [];
      this.filteredPaddocks = [];
      this.hasLoadError = true;
    } finally {
      this.isLoading = false;
    }
  }

  onSearch(event: CustomEvent): void {
    const value = this.normalizeText(event.detail.value || '');

    if (!value) {
      this.filteredPaddocks = [...this.paddocks];
      return;
    }

    this.filteredPaddocks = this.paddocks.filter((paddock) => {
      const searchableText = [
        paddock.name,
        this.statusLabels[paddock.status],
        paddock.area,
        paddock.areaUnit ? this.areaUnitLabels[paddock.areaUnit] : '',
        paddock.capacityAnimals,
      ].join(' ');

      return this.normalizeText(searchableText).includes(value);
    });
  }

  async goToCreatePaddock(): Promise<void> {
    await this.navigationService.goTo(APP_ROUTES.createPaddock);
  }

  trackByPaddockId(_index: number, paddock: Paddock): string {
    return paddock.id;
  }

  private normalizeText(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
