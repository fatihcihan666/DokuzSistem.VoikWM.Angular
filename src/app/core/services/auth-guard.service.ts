import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { AuthService } from './auth.service';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BreadcrumbService } from './breadcrumb.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    private breadCrumbService: BreadcrumbService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.authService.isAuthenticated().then(async isOk => {
      if (!isOk) {
        this.router.navigate([environment.loginPath], { queryParams: { from: location.pathname + location.search } });
        return false;
      } else {
        
      await this.authService.getLoginUser().subscribe(res => {
              if(res.roles.length == 0){
                this.authService.logout();
                return;
              }

                if(!res.isTheAgreementAccepted){
                  this.router.navigate(['/sozlesme']);
                }
        })

        // this.breadCrumbService.changeBreadCrumb(route.data.breadcrumb);
        // this.breadCrumbService.changeTitle(route.data.title);
        return true;
      }
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class IsLoggedIn {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  resolve(): void {
    this.authService.isAuthenticated().then(res => {
      if (res) {
        this.router.navigate(['/yonetim']);
      }
    });
  }
}
