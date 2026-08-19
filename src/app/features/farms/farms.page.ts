import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.constant';
import { STORAGE_KEYS } from 'src/app/core/constants/storage-keys.constant';
import { AppMessageCode } from 'src/app/core/enums/app-message-code.enum';
import { Farm } from 'src/app/core/models/farm.model';
import { FarmContextService } from 'src/app/core/services/farm-context.service';
import { FarmService } from 'src/app/core/services/farm.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MessageService } from 'src/app/core/services/message.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.page.html',
  styleUrls: ['./farms.page.scss'],
})
export class FarmsPage implements OnInit {
  private farmService: FarmService = inject(FarmService);
  private farmContextService: FarmContextService = inject(FarmContextService);
  private loadingService: LoadingService = inject(LoadingService);
  private messageService: MessageService = inject(MessageService);
  private navigationService: NavigationService = inject(NavigationService);
  private storageService: StorageService = inject(StorageService);

  readonly backUrl = APP_ROUTES.home;

  farms: Farm[] = [];
  activeFarmId: string | null = null;
  isLoading = false;

  async ngOnInit(): Promise<void> {
    await this.loadFarms();
  }

  async ionViewWillEnter(): Promise<void> {
    await this.loadFarms();
  }

  async loadFarms(): Promise<void> {
    const user = this.storageService.get<User>(STORAGE_KEYS.user);

    if (!user?.uid) {
      await this.messageService.showMessage(AppMessageCode.UserNotFound);
      await this.navigationService.goTo(APP_ROUTES.auth);
      return;
    }

    this.isLoading = true;

    try {
      this.farms = await this.farmService.getFarmsByOwner(user.uid);
      this.activeFarmId = await this.farmContextService.getActiveFarmId();

      const activeFarmIsValid = this.farms.some(
        (farm) => farm.id === this.activeFarmId,
      );

      if (this.farms.length && !activeFarmIsValid) {
        await this.setActiveFarm(this.farms[0]);
      }
    } catch (error) {
      console.error(error);
      await this.messageService.showMessage(AppMessageCode.UnexpectedError);
    } finally {
      this.isLoading = false;
    }
  }

  async setActiveFarm(farm: Farm): Promise<void> {
    await this.farmContextService.setActiveFarm(farm);
    this.activeFarmId = farm.id;
    await this.navigationService.goTo(APP_ROUTES.home);
  }

  async goToCreateFarm(): Promise<void> {
    await this.navigationService.goTo(APP_ROUTES.createFarm);
  }

  isActiveFarm(farm: Farm): boolean {
    return farm.id === this.activeFarmId;
  }
}
