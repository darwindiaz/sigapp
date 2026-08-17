import { inject, Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { PaddockMovement } from '../models/paddock-movement.model';

@Injectable({
  providedIn: 'root',
})
export class PaddockMovementService {
  private firebaseService: FirebaseService = inject(FirebaseService);

  async createMovement(
    farmId: string,
    movement: PaddockMovement,
  ): Promise<void> {
    const path = `farms/${farmId}/paddockMovements/${movement.id}`;

    await this.firebaseService.setDocument(path, movement);
  }
}
