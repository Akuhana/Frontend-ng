import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Validates the token with the backend
  // If the token is valid, it returns true
  // If the token is invalid, it navigates to the login page and returns false
  return auth.validateToken()
    .pipe(
      map(() => true),
      catchError(_ => {
        router.navigate(['/login']);
        return of(false);
      })
    );
};
