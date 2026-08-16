import { MainActionCode } from '../enums/main-action-code.enum';

export const MAIN_ACTIONS = [
  {
    code: MainActionCode.RegisterAnimal,
    text: 'Registrar animal',
    icon: 'paw-outline',
  },
  {
    code: MainActionCode.RegisterBirth,
    text: 'Registrar nacimiento',
    icon: 'egg-outline',
  },
  {
    code: MainActionCode.RegisterVaccination,
    text: 'Registrar vacunación',
    icon: 'medkit-outline',
  },
  {
    code: MainActionCode.RegisterPaddock,
    text: 'Registrar potreto',
    icon: 'map-outline',
  },
  {
    code: MainActionCode.MoveAnimal,
    text: 'Movimiento de potrero',
    icon: 'swap-horizontal-outline',
  },
] as const;
