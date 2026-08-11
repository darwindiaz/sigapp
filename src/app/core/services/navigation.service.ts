import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private router = inject(Router);

  goTo(path: string): Promise<boolean> {
    return this.router.navigateByUrl(path, { replaceUrl: true });
  }
}
