import { inject, Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Paddock } from '../models/paddock.model';

@Injectable({
  providedIn: 'root',
})
export class PaddockServices {
  private firebaseService: FirebaseService = inject(FirebaseService);

  async createPaddock(farmId: string, paddock: Paddock): Promise<void> {
    const path = `farms/${farmId}/paddocks/${paddock.id}`;
    await this.firebaseService.setDocument(path, paddock);
  }

  async getPaddocks(farmId: string): Promise<Paddock[]> {
    const path = `farms/${farmId}/paddocks`;
    return await this.firebaseService.getCollection<Paddock>(path);
  }

  async getPaddock(farmId: string, paddockId: string): Promise<Paddock> {
    const path = `farms/${farmId}/paddocks/${paddockId}`;
    return await this.firebaseService.getDocument(path);
  }
}
