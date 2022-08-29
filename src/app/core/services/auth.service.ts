import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, distinctUntilChanged } from 'rxjs/operators';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { AsyncSubject, BehaviorSubject, Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { User } from '../models/entities/users/user.model';
import { Subject } from 'rxjs';
import { UserLoginDto } from '../models/dto/authentication/user-login.dto';
import { AccessToken } from '../models/dto/authentication/access-token.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject = new AsyncSubject<LoginUser>();

  constructor(
    private http: HttpService,
    private router: Router,
    private jwtService: JwtService
  ) { }


  public async isAuthenticated() {
    return !!this.jwtService.getToken();
  }


  login(login: UserLoginDto) {
    return this.http.post('Auth/login', login).pipe(
      map(res => {
        this.setAuth(res);
        return res
      }, (err: any) => err))
  }

  setAuth(accessToken: AccessToken) {
    this.jwtService.saveToken(accessToken.token);
  }

  logout(): void {
    this.jwtService.destroyToken();
    this.setCurrentUser(null);
    // this.router.navigate([environment.loginPath]);
    location.reload()
  }

  logoutWithRefresh(): void {
    this.jwtService.destroyToken();
    this.router.navigate([environment.loginPath]).then(() => window.location.reload());
  }

  getLoginUser(): Observable<any> {        
    return this.http.get('Auth/GetLoginUser').pipe(
      map(data => {
        this.setCurrentUser(data);
        return data;
      }),
      catchError((res) => {
        this.logout();
        return res;
      })
    );
  }

  public getUser(): Observable<any>{
    return this.currentUserSubject.asObservable();
  }

  private setCurrentUser(user: any) {    
    this.currentUserSubject.next(user);
    this.currentUserSubject.complete();
  }
}

// export class LoginUser {
//   user: any;
//   dist: number | null | undefined;
// }
export class LoginUser {
  fullName!: string;
  email!: string;
  roles!: number[];
  companyId!: number | null;
  userId!: number;
  companyName!: string;
}