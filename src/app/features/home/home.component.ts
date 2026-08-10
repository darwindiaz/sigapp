import { Component, OnInit, inject } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private utilsService: UtilsService = inject(UtilsService);

  ngOnInit() {
    console.log();
  }

  onClick(event: number) {
    if (event === 1) {
      void this.utilsService.routerLink(APP_ROUTES.inventory);
    }
  }
}
