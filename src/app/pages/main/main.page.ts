import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {

  private firebaseService: FirebaseService = inject(FirebaseService);
  private utilsService: UtilsService = inject(UtilsService);

  constructor() { }
}
