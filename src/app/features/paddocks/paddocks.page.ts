import { Component, inject, OnInit } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { Paddock } from 'src/app/core/models/paddock.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { PaddockServices } from 'src/app/core/services/paddock.services';

@Component({
  selector: 'app-paddocks',
  templateUrl: './paddocks.page.html',
  styleUrls: ['./paddocks.page.scss'],
})
export class PaddocksPage implements OnInit {
  private navigationService = inject(NavigationService);
  private paddockService = inject(PaddockServices);

  paddocks: Paddock[] = [];
  isLoading = false;

  async ngOnInit(): Promise<void> {
    await this.loadPaddocks();
  }

  async ionViewWillEnter(): Promise<void> {
    await this.loadPaddocks();
  }

  async loadPaddocks(): Promise<void> {
    this.isLoading = true;

    try {
      this.paddocks = await this.paddockService.getPaddocks('demo-farm');
    } catch (error) {
      console.error(error);
      this.paddocks = [];
    } finally {
      this.isLoading = false;
    }
  }
}
