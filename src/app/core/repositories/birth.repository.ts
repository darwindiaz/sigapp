import { Birth } from '../models/birth.model';

export interface BirthRepository {
  getByMother(farmId: string, motherId: string): Promise<Birth[]>;
  create(farmId: string, birth: Birth): Promise<void>;
}
