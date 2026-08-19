import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../constants/storage-keys.constant';
import { Farm } from '../models/farm.model';

@Injectable({
  providedIn: 'root',
})
export class FarmContextService {
  private storageService: StorageService = inject(StorageService);

  async setActiveFarm(farm: Farm): Promise<void> {
    this.storageService.set(STORAGE_KEYS.activeFarmId, farm.id);
    this.storageService.set(STORAGE_KEYS.activeFarmName, farm.name);
  }

  async getActiveFarmId(): Promise<string | null> {
    return this.storageService.get<string>(STORAGE_KEYS.activeFarmId);
  }

  async getActiveFarmName(): Promise<string | null> {
    return this.storageService.get<string>(STORAGE_KEYS.activeFarmName);
  }

  async clearActiveFarm(): Promise<void> {
    this.storageService.remove(STORAGE_KEYS.activeFarmId);
    this.storageService.remove(STORAGE_KEYS.activeFarmName);
  }

  async requireActiveFarmId(): Promise<string | null> {
    return await this.getActiveFarmId();
  }
}
