import { Component } from '@angular/core';

import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';

@Component({
  selector: 'app-birth-create',
  templateUrl: './birth-create.page.html',
  styleUrls: ['./birth-create.page.scss'],
})
export class BirthCreatePage {
  readonly backUrl = APP_ROUTES.home;
}
