import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private firebaseService: FirebaseService = inject(FirebaseService);
  private utilsService: UtilsService = inject(UtilsService);

  ngOnInit() {
    console.log()
  }

  onClick(event) {
    if (event == 1)
      this.utilsService.routerLink('/main/inventory')
    else if (event == 2)
      this.utilsService.routerLink('/main/reports')
    else if (event == 3)
      this.utilsService.routerLink('/main/help')
  }
}
