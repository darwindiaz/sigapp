import { Component, inject, Input, OnInit } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title = '';
  @Input() backButton?: string;
  @Input() isModal = false;
  @Input() isSignOut = false;
  @Input() isMenuButton = false;

  readonly nameApp = 'SIGAPP';
  activeFarmName: string | null = null;

  private firebaseService: FirebaseService = inject(FirebaseService);
  private modalService: ModalService = inject(ModalService);
  private storageService: StorageService = inject(StorageService);
  private navigationService: NavigationService = inject(NavigationService);
  private farmContextService: FarmContextService = inject(FarmContextService);

  async ngOnInit(): Promise<void> {
    this.activeFarmName = await this.farmContextService.getActiveFarmName();
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
