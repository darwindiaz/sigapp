import { AnimalSpecies } from './animal.model';

export interface Farm {
  id: string;
  name: string;
  ownerId: string;
  location?: string;
  productionType: FarmProductionType;
  mainSpecies: AnimalSpecies[];
  rspp?: string;
  area?: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum FarmProductionType {
  Meat = 'meat',
  Milk = 'milk',
  DualPurpose = 'dual-purpose',
  Breeding = 'breeding',
}
