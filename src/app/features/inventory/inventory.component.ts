import { Component, inject, OnInit } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { AnimalComponent } from './components/animal/animal.component';

import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  private modalService = inject(ModalService);
  backUrl: string = APP_ROUTES.home;

  ngOnInit() {
    console.log();
  }

  addAnimal() {
    this.modalService.openModal({
      component: AnimalComponent,
      cssClass: 'animal-modal',
    });
  }
}
