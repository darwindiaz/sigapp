import { Component } from '@angular/core';

import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';

@Component({
  selector: 'app-paddock-movement-create',
  templateUrl: './paddock-movement-create.page.html',
  styleUrls: ['./paddock-movement-create.page.scss'],
})
export class PaddockMovementCreatePage {
  readonly backUrl = APP_ROUTES.paddocks;
}
