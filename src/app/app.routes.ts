import { Route } from '@angular/router';
import { LoginComponent }  from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BoardComponent }  from './board/board.component';
import { authGuard }       from './services/auth.guard';

export const routes: Route[] = [
  { path: 'login',  component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: BoardComponent,
    canActivate: [authGuard]
  },
  { path: '**',      redirectTo: '' }
];
