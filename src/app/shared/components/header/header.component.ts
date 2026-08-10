import { Component, inject, Input } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;
  @Input() isSignOut!: boolean;
  nameApp: string;

  private firebaseService: FirebaseService = inject(FirebaseService);
  private utilsService: UtilsService = inject(UtilsService);

  constructor() {
    this.nameApp = 'S I G A P P';
    this.title = '';
  }

  async signOut() {
    await this.firebaseService.singOut();
  }

  dismissModal() {
    this.utilsService.dismissModal();
  }
}
