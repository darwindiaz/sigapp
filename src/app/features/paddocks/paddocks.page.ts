import { Component, inject, OnInit } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';

import { Paddock } from 'src/app/core/models/paddock.model';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { PaddockService } from 'src/app/core/services/paddock.service';

@Component({
  selector: 'app-paddocks',
  templateUrl: './paddocks.page.html',
  styleUrls: ['./paddocks.page.scss'],
})
export class PaddocksPage implements OnInit {
  private navigationService: NavigationService = inject(NavigationService);
  private paddockService: PaddockService = inject(PaddockService);
  private farmContextService: FarmContextService = inject(FarmContextService);

  paddocks: Paddock[] = [];
  isLoading = false;

  async ngOnInit(): Promise<void> {
    await this.loadPaddocks();
  }

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

    try {
      this.paddocks = await this.paddockService.getPaddocks(farmId);
    } catch (error) {
      console.error(error);
      this.paddocks = [];
    } finally {
      this.isLoading = false;
    }
  }
}
