import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';

export const authGuard: CanActivateFn = (route, state) => {
  var firebaseService = inject(FirebaseService);
  var utilsService = inject(UtilsService)
  var user = utilsService.getItemLocalStorga('user');
  return new Promise((resolve) => {
    firebaseService.getAuth().onAuthStateChanged((auth) => {
      console.log('authGuard', auth, user);
      if (auth)
        resolve(true);
      else {
        utilsService.routerLink('/auth');
        resolve(false);
      }
    })
  });
};
