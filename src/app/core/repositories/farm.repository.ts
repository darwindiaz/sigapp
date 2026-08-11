import { Farm } from '../models/farm.model';

export interface FarmRepository {
  getByOwner(farmId: string): Promise<Farm[]>;
  getById(farmId: string): Promise<Farm | null>;
  create(farm: Farm): Promise<void>;
  update(farmId: string, farm: Partial<Farm>): Promise<void>;
}
