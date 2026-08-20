import { inject, Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Farm } from '../models/farm.model';

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  private firebaseService: FirebaseService = inject(FirebaseService);

  async createFarm(farm: Farm): Promise<void> {
    const path = `farms/${farm.id}`;

    await this.firebaseService.setDocument(path, farm);
  }

  async getFarmsByOwner(ownerId: string): Promise<Farm[]> {
    const famrs = await this.firebaseService.getCollectionWhere<Farm>(
      'farms',
      'ownerId',
      '==',
      ownerId,
    );

    return famrs.map((farm) => ({
      ...farm,
      createdAt: this.toDate(farm.createdAt),
      updatedAt: this.toDate(farm.updatedAt),
    }));
  }

  async updateFarm(farmId: string, data: Partial<Farm>): Promise<void> {
    const path = `farms/${farmId}`;

    await this.firebaseService.updateDocument(path, data);
  }

  private toDate(value: any): Date {
    if (value instanceof Date) {
      return value;
    }

    if (value?.toDate) {
      return value.toDate();
    }

    return new Date(value);
  }
}
