import { Component, inject, Input } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { StorageService } from 'src/app/core/services/storage.service';

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
  private modalService: ModalService = inject(ModalService);
  private storageService: StorageService = inject(StorageService);
  private navigationService: NavigationService = inject(NavigationService);

  constructor() {
    this.nameApp = 'S I G A P P';
    this.title = '';
  }

  async signOut() {
    await this.firebaseService.signOut();
    this.storageService.clear();
    await this.navigationService.goTo(APP_ROUTES.auth);
  }

  dismissModal() {
    this.modalService.dismissModal();
  }
}
