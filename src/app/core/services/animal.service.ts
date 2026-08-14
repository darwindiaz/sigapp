import { inject, Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private firebaseService: FirebaseService = inject(FirebaseService);

  async createAnimal(farmId: string, animal: Animal): Promise<void> {
    const path = `farms/${farmId}/animals/${animal.id}`;

    await this.firebaseService.setDocument(path, animal);
  }

  async getAnimals(farmId: string): Promise<Animal[]> {
    const path = `farms/${farmId}/animals`;

    return await this.firebaseService.getCollection<Animal>(path);
  }
}
