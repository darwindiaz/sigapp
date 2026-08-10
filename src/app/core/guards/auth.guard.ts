import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { inject } from '@angular/core';
import { APP_ROUTES } from '../constants/app-routes.constant';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseService = inject(FirebaseService);
  const router = inject(Router);
  const auth = firebaseService.getAuth();

  return auth.currentUser ? true : router.createUrlTree([APP_ROUTES.auth]);
};
