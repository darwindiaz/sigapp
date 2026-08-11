import { Component, OnInit, inject } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private navigationService = inject(NavigationService);

  ngOnInit() {
    console.log();
  }

  onClick(event: number) {
    if (event === 1) {
      void this.navigationService.goTo(APP_ROUTES.inventory);
    }
  }
}
