import { Animal } from '../models/animal.model';

export interface AnimalRepository {
  getAll(farmId: string): Promise<Animal[]>;
  getById(farmId: string, animalId: string): Promise<Animal | null>;
  create(farmId: string, animal: Animal): Promise<void>;
  update(
    farmId: string,
    animalId: string,
    animal: Partial<Animal>,
  ): Promise<void>;
}
