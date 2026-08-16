export interface Paddock {
  id: string;
  farmId: string;
  name: string;
  area?: number;
  areaUnit?: PaddockAreaUnit;
  capacityAnimals?: number;
  status: PaddockStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaddockStatus {
  Available = 'available',
  Occupied = 'occupied',
  Resting = 'resting',
  Maintenance = 'maintenance',
}

export enum PaddockAreaUnit {
  SquareMeters = 'square-meters',
  Hectares = 'hectares',
}
