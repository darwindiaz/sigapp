import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  var firebaseService = inject(FirebaseService);
  var utilsService = inject(UtilsService)
  return new Promise((resolve) => {
    firebaseService.getAuth().onAuthStateChanged((auth) => {
      console.log('noAuthGuard', auth);
      if (!auth)
        resolve(true);
      else {
        utilsService.routerLink('/main/home');
        resolve(false);
      }
    })
  });
};
