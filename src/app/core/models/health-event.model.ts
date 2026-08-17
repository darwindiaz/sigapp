export interface HealthEvent {
  id: string;
  farmId: string;
  animalId?: string;
  animalIds?: string[];
  type: HealthEventType;
  product?: string;
  date: Date;
  nextDate?: Date;
  dose?: string;
  responsible?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum HealthEventType {
  Vaccine = 'vaccine',
  Deworming = 'deworming',
  Treatment = 'treatment',
  Disease = 'disease',
  Checkup = 'checkup',
  Bath = 'bath',
  Other = 'other',
}
