import {
  AnimalCategory,
  AnimalPurpose,
  AnimalSex,
  AnimalSpecies,
  AnimalStatus,
} from '../models/animal.model';
import { BirthStatus } from '../models/birth.model';
import { FarmProductionType } from '../models/farm.model';
import { HealthEventType } from '../models/health-event.model';
import { PaddockAreaUnit, PaddockStatus } from '../models/paddock.model';

export const ANIMAL_SPECIES_LABELS: Record<AnimalSpecies, string> = {
  [AnimalSpecies.Bovine]: 'Bovino',
  [AnimalSpecies.Buffalo]: 'Búfalo',
  [AnimalSpecies.Goat]: 'Cabra',
  [AnimalSpecies.Sheep]: 'Oveja',
};

export const ANIMAL_CATEGORY_LABELS: Record<AnimalCategory, string> = {
  [AnimalCategory.Cow]: 'Vaca',
  [AnimalCategory.Bull]: 'Toro',
  [AnimalCategory.Heifer]: 'Novilla',
  [AnimalCategory.Calf]: 'Ternero/a',
  [AnimalCategory.BuffaloCow]: 'Búfala',
  [AnimalCategory.BuffaloBull]: 'Búfalo',
  [AnimalCategory.Goat]: 'Cabra',
  [AnimalCategory.Sheep]: 'Oveja',
  [AnimalCategory.Lamb]: 'Cordero/a',
};

export const ANIMAL_SEX_LABELS: Record<AnimalSex, string> = {
  [AnimalSex.Male]: 'Macho',
  [AnimalSex.Female]: 'Hembra',
};

export const ANIMAL_STATUS_LABELS: Record<AnimalStatus, string> = {
  [AnimalStatus.Active]: 'Activo',
  [AnimalStatus.Sold]: 'Vendido',
  [AnimalStatus.Dead]: 'Muerto',
  [AnimalStatus.Transferred]: 'Transferido',
};

export const ANIMAL_PURPOSE_LABELS: Record<AnimalPurpose, string> = {
  [AnimalPurpose.Meat]: 'Carne',
  [AnimalPurpose.Milk]: 'Leche',
  [AnimalPurpose.Breeding]: 'Reproducción',
  [AnimalPurpose.DualPurpose]: 'Doble propósito',
};

export const PADDOCK_STATUS_LABELS: Record<PaddockStatus, string> = {
  [PaddockStatus.Available]: 'Disponible',
  [PaddockStatus.Occupied]: 'Ocupado',
  [PaddockStatus.Resting]: 'En descanso',
  [PaddockStatus.Maintenance]: 'Mantenimiento',
};

export const PADDOCK_AREA_UNIT_LABELS: Record<PaddockAreaUnit, string> = {
  [PaddockAreaUnit.SquareMeters]: 'Metros cuadrados',
  [PaddockAreaUnit.Hectares]: 'Hectáreas',
};

export const BIRTH_STATUS_LABELS: Record<BirthStatus, string> = {
  [BirthStatus.Alive]: 'Vivo',
  [BirthStatus.Dead]: 'Muerto',
  [BirthStatus.Weak]: 'Débil',
};

export const HEALTH_EVENT_TYPE_LABELS: Record<HealthEventType, string> = {
  [HealthEventType.Vaccine]: 'Vacunación',
  [HealthEventType.Deworming]: 'Desparasitación',
  [HealthEventType.Treatment]: 'Tratamiento',
  [HealthEventType.Disease]: 'Enfermedad',
  [HealthEventType.Checkup]: 'Chequeo',
  [HealthEventType.Bath]: 'Baño',
  [HealthEventType.Other]: 'Otro',
};

export const FARM_PRODUCTION_TYPE_LABELS: Record<FarmProductionType, string> = {
  [FarmProductionType.Meat]: 'Carne',
  [FarmProductionType.Milk]: 'Leche',
  [FarmProductionType.DualPurpose]: 'Doble propósito',
  [FarmProductionType.Breeding]: 'Reproducción',
  [FarmProductionType.Other]: 'Otro',
};
