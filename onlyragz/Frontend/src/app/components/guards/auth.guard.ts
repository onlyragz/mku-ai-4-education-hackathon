import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);

  return authService.checkAuthStatus().pipe(
    tap((isLoggedIn: boolean) => {
      //console.log(isLoggedIn)
      if (!isLoggedIn) {
        authService.setRedirectUrl(state.url);
        authService.openLoginModal();
      }
    })
  );
};
