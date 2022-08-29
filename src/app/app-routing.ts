import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, IsLoggedIn } from './core/services/auth-guard.service';
import { AgreementAcceptedComponent } from './pages/core/agreement-accepted/agreement-accepted.component';
import { LoginComponent } from './pages/core/login/login.component';
import { PasswordRecoveryInformation } from './pages/core/password-recovery-information/password-recovery-information.component';
import { PasswordRecoveryComponent } from './pages/core/password-recovery/password-recovery.component';

export const appRoutes: Routes = [
  {
    path: 'yonetim',
    // loadChildren: './pages/admin/admin.module#AdminModule',
  },
  {
    path: 'giris',
    component: LoginComponent,
    resolve: [IsLoggedIn]
  },
  {
    path: 'parola-kurtar/:key',
    component: PasswordRecoveryComponent
  },
  {
    path: 'bilgilendirme',
    component: PasswordRecoveryInformation
  },
  {
    path: 'sozlesme',
    component: AgreementAcceptedComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'giris'
  }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })


// export class AppRoutingModule { }
