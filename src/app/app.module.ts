import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app-routing';
import { CoreModule } from '@bespunky/angular-zen';
import { AppComponent } from './app.component';
import { AgreementAcceptedComponent } from './pages/core/agreement-accepted/agreement-accepted.component';
import { LoginComponent } from './pages/core/login/login.component';
import { PasswordRecoveryComponent } from './pages/core/password-recovery/password-recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgreementAcceptedComponent,
    PasswordRecoveryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' }),
    CoreModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: LOCALE_ID,
      useValue: 'tr-TR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
