import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from './shared.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private token: TokenService,
    private http: HttpClient,
    private shared: SharedService
  ) { }

  public backendUrl = environment.backendUrl;
  public apiUrl = this.shared.apiUrl;

  public auth_get(endpoint: string) {

    const token = this.token.get();
    //console.log(token)

    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/${endpoint}`, { headers });
  }

  public auth_post(endpoint: string, data: any) {

    const token = this.token.get();

    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/${endpoint}`, data, { headers });
  }

  public auth_put(endpoint: string, data: any) {
    const token = this.token.get();
  
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    });
  
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, { headers });
  }
  
  public auth_delete(endpoint: string) {
    const token = this.token.get();
  
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    });
  
    return this.http.delete(`${this.apiUrl}/${endpoint}`, { headers });
  }
  
}
