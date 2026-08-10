import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';
import { AnimalComponent } from './components/animal/animal.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  backUrl: string = '/home';
  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    console.log();
  }

  addAnimal() {
    this.utilsService.presentModal({
      component: AnimalComponent,
      cssClass: 'animal-modal',
    });
  }
}
