import { Component, inject, OnInit } from '@angular/core';

import { Paddock } from 'src/app/core/models/paddock.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { PaddockService } from 'src/app/core/services/paddock.service';

@Component({
  selector: 'app-paddocks',
  templateUrl: './paddocks.page.html',
  styleUrls: ['./paddocks.page.scss'],
})
export class PaddocksPage implements OnInit {
  private navigationService = inject(NavigationService);
  private paddockService = inject(PaddockService);

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
