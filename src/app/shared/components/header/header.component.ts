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
  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;
  @Input() isSignOut!: boolean;
  @Input() isMenuButton!: boolean;

  nameApp: string;
  activeFarmName: string | null = null;

  private firebaseService: FirebaseService = inject(FirebaseService);
  private modalService: ModalService = inject(ModalService);
  private storageService: StorageService = inject(StorageService);
  private navigationService: NavigationService = inject(NavigationService);
  private farmContextService: FarmContextService = inject(FarmContextService);

  constructor() {
    this.nameApp = 'S I G A P P';
    this.title = '';
  }

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
