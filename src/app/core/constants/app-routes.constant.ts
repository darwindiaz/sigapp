export const APP_ROUTES = {
  auth: '/auth',
  main: '/main',
  home: '/main/home',
  inventory: '/main/inventory',
  paddocks: '/main/paddocks',
  health: '/main/health',
  reports: '/main/reports',
  createAnimal: '/main/animals/create',
  createBirth: '/main/births/create',
  createVaccination: '/main/health/vaccination/create',
  createPaddockMovement: '/main/paddocks/movement/create',
} as const;
