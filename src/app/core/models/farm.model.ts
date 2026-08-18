export interface Farm {
  id: string;
  ownerId: string;
  name: string;
  department?: string;
  municipality?: string;
  productionType?: FarmProductionType;
  notes?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum FarmProductionType {
  Meat = 'meat',
  Milk = 'milk',
  DualPurpose = 'dual-purpose',
  Breeding = 'breeding',
  Other = 'other',
}
