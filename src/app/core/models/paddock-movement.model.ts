export interface PaddockMovement {
  id: string;
  farmId: string;
  animalId: string;
  fromPaddockId?: string;
  toPaddockId: string;
  movementDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
