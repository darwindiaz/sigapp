import { Component } from '@angular/core';

import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';

@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.page.html',
  styleUrls: ['./animal-create.page.scss'],
})
export class AnimalCreatePage {
  readonly backUrl = APP_ROUTES.inventory;
}
