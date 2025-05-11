import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // If not logged in, redirect to /login and block activation
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Otherwise allow
  return true;
};
