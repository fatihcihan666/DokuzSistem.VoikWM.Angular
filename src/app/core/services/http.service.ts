import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(`${environment.apiEndPoint}/api/${url}`, this.prepareParams())
      .pipe()
  }

  post(url: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiEndPoint}/api/${url}`,
      body,
      this.prepareParams()
    ).pipe()
  }

  put(url: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiEndPoint}/api/${url}`,
      body,
      this.prepareParams()
    ).pipe()
  }

  patch(url: string, body: Object = {}): Observable<any> {
    return this.http.patch(
      `${environment.apiEndPoint}/api/${url}`,
      body,
      this.prepareParams()
    ).pipe()
  }

  delete(url: string): Observable<any> {
    return this.http.delete(
      `${environment.apiEndPoint}/api/${url}`,
      this.prepareParams()
    ).pipe()
  }

  private prepareParams(): Object {
    const token = localStorage.getItem(environment.token)
    let headersConfig = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token != undefined ? token : ''}`
    })

    return {
      headers: headersConfig,
      params: null,
      responseType: 'json'
    };
  }
}
