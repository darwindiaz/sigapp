export interface Animal {
  id: string;
  farmId: string;
  code: string;
  species: AnimalSpecies;
  category: AnimalCategory;
  sex: AnimalSex;
  birthDate?: Date;
  status: AnimalStatus;
  paddockId?: string;
  motherId?: string;
  fatherId?: string;
  purpose?: AnimalPurpose;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum AnimalSpecies {
  Bovine = 'bovine',
  Buffalo = 'buffalo',
  Goat = 'goat',
  Sheep = 'sheep',
}

export enum AnimalCategory {
  Cow = 'cow',
  Bull = 'bull',
  Heifer = 'heifer',
  Calf = 'calf',
  BuffaloCow = 'buffalo-cow',
  BuffaloBull = 'buffalo-bull',
  Goat = 'goat',
  Sheep = 'sheep',
  Lamb = 'lamb',
}

export enum AnimalSex {
  Male = 'male',
  Female = 'female',
}

export enum AnimalStatus {
  Active = 'active',
  Sold = 'sold',
  Dead = 'dead',
  Transferred = 'transferred',
}

export enum AnimalPurpose {
  Meat = 'meat',
  Milk = 'milk',
  Breeding = 'breeding',
  DualPurpose = 'dual-purpose',
}
