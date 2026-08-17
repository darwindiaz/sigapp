import { inject, Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { HealthEvent } from '../models/health-event.model';

@Injectable({
  providedIn: 'root',
})
export class HealthEventService {
  private firebaseService = inject(FirebaseService);

  async createHealthEvent(
    farmId: string,
    healthEvent: HealthEvent,
  ): Promise<void> {
    const path = `farms/${farmId}/healthEvents/${healthEvent.id}`;

    await this.firebaseService.setDocument(path, healthEvent);
  }

  async getHealthEvents(farmId: string): Promise<HealthEvent[]> {
    const path = `farms/${farmId}/healthEvents`;

    const events = await this.firebaseService.getCollection<HealthEvent>(path);

    return events.map((event) => ({
      ...event,
      date: this.toDate(event.date),
      nextDate: event.nextDate ? this.toDate(event.nextDate) : undefined,
      createdAt: this.toDate(event.createdAt),
      updatedAt: this.toDate(event.updatedAt),
    }));
  }

  async getHealthEventsByAnimal(
    farmId: string,
    animalId: string,
  ): Promise<HealthEvent[]> {
    const events = this.getHealthEvents(farmId);

    return (await events).filter((event) => event.animalId === animalId);
  }

  private toDate(value: any): Date {
    if (value instanceof Date) {
      return value;
    }

    if (value?.toDate) {
      return value.toDate();
    }

    return new Date(value);
  }
}
