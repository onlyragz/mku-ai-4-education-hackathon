import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { LoginComponent } from '../components/modals/login/login.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  router = inject(Router);

  apiUrl = this.api.apiUrl;
  auth_get = this.api.auth_get;
  auth_post = this.api.auth_post;
  auth_put = this.api.auth_put;
  auth_delete = this.api.auth_delete;
  private redirectUrl: string | null = null;

  private loggedIn = new BehaviorSubject<boolean>(this.token.isValid());
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value:boolean) {
    this.loggedIn.next(value);
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }

  handleSuccessfulLogin(): void {
    const redirectTo = this.redirectUrl ? this.redirectUrl : '/'; // Default fallback
    this.redirectUrl = null; // Clear the redirect URL
    this.router.navigateByUrl(redirectTo);
  }

  openLoginModal(): void {
    this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: false,
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.authStatus;
  }

  checkAuthStatus(): Observable<boolean> {
    const isValid = this.token.isValid();
    this.changeAuthStatus(isValid);
    //console.log('Auth status:', isValid); // For debugging
    return of(isValid);
  }

  async checkAuthStatusPromise(): Promise<boolean> {
    const isValid = this.token.isValid();
    this.changeAuthStatus(isValid);
    return isValid;
  }

  constructor(
    private http: HttpClient, 
    private token: TokenService, 
    private api: ApiService,
    private dialog: MatDialog,
  ) { 

    this.checkAuthStatus().subscribe();
  }

  signup(data: any) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  googleSignIn(idToken:string) {
    return this.http.post(`${this.apiUrl}/google/login`, { idToken });
  }

  submitPhone(phone:any) {
    return this.auth_post(`auth/phone`, phone);
  }

  update(formdata: any) {
    return this.auth_post('updateProfile', formdata);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logout() {
    return this.auth_post(`logout`, {});
  }

  getUserEvents(page:number) {
    return this.auth_get(`user-events?page=${page}`);
  }

  getUserBalance() {
    return this.auth_get('profile/balance');
  }

  getUserPastEvents() {
    return this.auth_get('user-past-events');
  }

  getUserEventBalance() {
    return this.auth_get('user-events/balance')
  }

  getUserEventCount() {
    return this.auth_get('user-event-count');
  }

  fetchForm(id:any) {
    return this.auth_get(`user-events/${id}/forms`);
  }

  fetchOrderIds() {
    return this.auth_get(`user-events/order_ids`);
  }

  fetchOrderResponses(id:any) {
    return this.auth_get(`user-events/orders/${id}/form`);
  }

  getUserProgramCount() {
    return this.auth_get('user-program-count');
  }

  getUserOrderCount() {
    return this.auth_get('my-orders/count')
  }

  getAllUserEvents() {
    return this.auth_get('all-user-events');
  }

  getUserPrograms() {
    return this.auth_get('user-programs');
  }

  getUser() {
    return this.auth_get('profile');
  }

  me() {
    return this.auth_get('me');
  }
}
