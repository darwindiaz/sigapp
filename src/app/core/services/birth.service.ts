import { inject, Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Birth } from '../models/birth.model';

@Injectable({
  providedIn: 'root',
})
export class BirthService {
  private firebaseService: FirebaseService = inject(FirebaseService);

  async createBirth(farmId: string, birth: Birth): Promise<void> {
    const path = `farms/${farmId}/births/${birth.id}`;

    await this.firebaseService.setDocument(path, birth);
  }

  async getBirths(farmId: string): Promise<Birth[]> {
    const path = `farms/${farmId}/births`;

    const births = await this.firebaseService.getCollection<Birth>(path);

    return births.map((birth) => ({
      ...birth,
      date: this.toDate(birth.date),
      createdAt: this.toDate(birth.createdAt),
      updatedAt: this.toDate(birth.updatedAt),
    }));
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
