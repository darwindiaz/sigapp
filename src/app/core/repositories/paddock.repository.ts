import { Paddock } from '../models/paddock.model';

export interface PaddockRepository {
  getAll(farmId: string, paddockId: string): Promise<Paddock[]>;
  getById(farmId: string, paddockId: string): Promise<Paddock | null>;
  create(farmId: string, paddock: Paddock): Promise<void>;
  update(
    farmId: string,
    paddockId: string,
    paddock: Partial<Paddock>,
  ): Promise<void>;
}
