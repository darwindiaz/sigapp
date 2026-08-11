export interface Paddock {
  id: string;
  farmId: string;
  name: string;
  area?: number;
  pastureType?: string;
  status: PaddockStatus;
  lastOccupationDate?: Date;
  nextAvailableDate?: Date;
  notes?: string; //revision[]
  createdAt: Date;
  updatedAt: Date;
}

export enum PaddockStatus {
  Available = 'available',
  Occupied = 'occupied',
  Resting = 'resting',
  Maintenance = 'maintenance',
}
