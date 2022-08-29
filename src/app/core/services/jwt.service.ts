import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class JwtService {
    getToken(): string {
        return window.localStorage[environment.token];
    }

    saveToken(token: string) {
        window.localStorage[environment.token] = token;
    }

    destroyToken() {
        window.localStorage.removeItem(environment.token);
    }
}
