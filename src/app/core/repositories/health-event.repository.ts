import { HealthEvent } from '../models/health-event.model';

export interface HealthEventRepository {
  getByAnimal(farmId: string, animalId: string): Promise<HealthEvent[]>;
  getUpcoming(farmId: string, animalId?: string): Promise<HealthEvent[] | null>;
  create(farmId: string, animalId?: string, event?: HealthEvent): Promise<void>;
}
