import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private shared: SharedService) { }

  apiUrl = this.shared.apiUrl;

  handle(token: any) {
    this.set(token);
  }

  set(token: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  get() {
    //console.log(localStorage.getItem('token'));

    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getRole() {
    const token = this.get();
    if (token) {
        const payload = this.payload(token);
        if (payload && payload.role) {
            return payload.role;
        }
    }
    return null;
  }


  remove() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      //console.log(payload);
      if (payload) {
        // Check if the payload.iss matches either the login route or the google/login route
        const validIssuers = [
          `${this.apiUrl}/login`,
          `${this.apiUrl}/google/login`
        ];
        return validIssuers.includes(payload.iss);
      }
    }
    return false;
  }
  

  adminisValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      //console.log(payload);
      if (payload) {
        return (payload.iss === `${this.apiUrl}admin/login`)?true:false;
      }
    }
    return false;
  }

  organiserisValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      //console.log(payload);
      if (payload) {
        return (payload.iss === `${this.apiUrl}organiser/login`)?true:false;
      }
    }
    return false;
  }

  payload(token:any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload:any) {
    return JSON.parse(atob(payload));
  }

  adminloggedIn() {
    return this.adminisValid();
  }

  organiserloggedIn() {
    return this.organiserisValid();
  }

}
