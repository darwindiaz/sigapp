import { CanActivateFn, Router } from '@angular/router';
import { FarmContextService } from '../services/farm-context.service';
import { inject } from '@angular/core';
import { APP_ROUTES } from '../constants/app-routes.constant';

export const farmRequiredGuard: CanActivateFn = async (route, state) => {
  const farmContextService = inject(FarmContextService);
  const router = inject(Router);
  const activeFarmId = await farmContextService.getActiveFarmId();

  if (activeFarmId) {
    return true;
  }

  return router.createUrlTree([APP_ROUTES.createFarm]);
};
