import { Component } from '@angular/core';

import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';

@Component({
  selector: 'app-vaccination-create',
  templateUrl: './vaccination-create.page.html',
  styleUrls: ['./vaccination-create.page.scss'],
})
export class VaccinationCreatePage {
  readonly backUrl = APP_ROUTES.health;
}
