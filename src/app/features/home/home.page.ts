import { Component, inject } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private navigationService = inject(NavigationService);

  async goToFarms(): Promise<void> {
    await this.navigationService.goTo(APP_ROUTES.farms);
  }

  async goToBirths(): Promise<void> {
    await this.navigationService.goTo(APP_ROUTES.births);
  }

  async goToReports(): Promise<void> {
    await this.navigationService.goTo(APP_ROUTES.reports);
  }
}
