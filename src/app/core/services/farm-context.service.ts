import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../constants/storage-keys.constant';

@Injectable({
  providedIn: 'root',
})
export class FarmContextService {
  private storageService: StorageService = inject(StorageService);

  async setActiveFarmId(farmId: string): Promise<void> {
    this.storageService.set(STORAGE_KEYS.activeFarmId, farmId);
  }

  async getActiveFarmId(): Promise<string | null> {
    return this.storageService.get<string>(STORAGE_KEYS.activeFarmId);
  }

  async clearActiveFarm(): Promise<void> {
    this.storageService.remove(STORAGE_KEYS.activeFarmId);
  }

  async requireActiveFarmId(): Promise<string | null> {
    return await this.getActiveFarmId();
  }
}
