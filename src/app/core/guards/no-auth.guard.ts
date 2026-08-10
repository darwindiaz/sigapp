import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { inject } from '@angular/core';
import { APP_ROUTES } from '../constants/app-routes.constant';

export const noAuthGuard: CanActivateFn = () => {
  const firebaseService = inject(FirebaseService);
  const router = inject(Router);
  const auth = firebaseService.getAuth();

  return auth.currentUser ? router.createUrlTree([APP_ROUTES.home]) : true;
};
