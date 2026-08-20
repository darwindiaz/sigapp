import { Component, OnInit, inject } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private navigationService = inject(NavigationService);

  ngOnInit() {}

  async goToFarms() {
    await this.navigationService.goTo(APP_ROUTES.farms);
  }

  async goToBirths() {
    await this.navigationService.goTo(APP_ROUTES.births);
  }

  async goToReports() {
    await this.navigationService.goTo(APP_ROUTES.reports);
  }
}
