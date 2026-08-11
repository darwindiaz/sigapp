import { AnimalSex } from './animal.model';

export interface Birth {
  id: string;
  farmId: string;
  motherId: string;
  calfId?: string;
  fatherId?: string;
  date: Date;
  sex: AnimalSex;
  status: BirthStatus;
  weight?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum BirthStatus {
  Alive = 'alive',
  Dead = 'dead',
  Weak = 'weak',
}
