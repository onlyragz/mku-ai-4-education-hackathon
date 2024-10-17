import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal.service';
import { LoaderComponent } from '../../partials/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    LoaderComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  authService = inject(AuthService);
  tokenService = inject(TokenService);
  modal = inject(ModalService);
  dialogRef = inject(MatDialogRef<LoginComponent>);

  @ViewChild('myForm') myForm: any;
  @ViewChild('googleButton') googleButton: any;

  isLoading: boolean = false;
  isLogin = true;
  google:any;
  loggedIn: boolean = false;
  password_type = 'password';
  show = 'fi fi-rr-eye';
  newUser: boolean = false;

  public login_form={
    email:null,
    password:null
  }

  public signup_form={
    firstname:null,
    lastname:null,
    phone:null,
    email:null,
    password:null,
    cpassword:null
  }

  phone_form = {
    phone:null,
  }

  ngOnInit(): void {

  }

  toggleForm(event: Event): void {
    event.preventDefault();
    this.isLogin = !this.isLogin;
  }

  togglePassword(): void {
    this.password_type = this.password_type === 'password' ? 'text' : 'password';
    this.show = this.show === 'fi fi-rr-eye' ? 'fi fi-rs-crossed-eye' : 'fi fi-rr-eye';
  }
  

  submitLogin() {
    this.isLoading = true;
    this.authService.login(this.login_form).subscribe(
      (data:any) => {
        console.log(data);
        this.modal.openSuccessModal(data.message);
        this.handleResponse(data);
        this.isLoading = false;
        this.authService.handleSuccessfulLogin(); 
        this.dialogRef.close();
      },

      (error:any) => {
        //console.log(error);
        this.modal.openErrorModal(error.error.error);
        this.isLoading = false;
        //this.dialogRef.close();
      }
    );
  }

  submitSignup() {

    this.isLoading = true;

    this.authService.signup(this.signup_form).subscribe({
      next: (data:any) => {
        this.isLoading = false;
        
        this.modal.openSuccessModal(data.message);
        
        this.authService.login({email: this.signup_form.email, password: this.signup_form.password}).subscribe({
          next: (res:any) => {
            this.tokenService.handle(res.access_token);
            this.authService.changeAuthStatus(true);
            this.myForm.reset();
            this.modal.openSuccessModal('Logged in successfully!');
            this.close();
          },
          error: (error:any) => {
            this.modal.openErrorModal('Oops! Try logging in again');
          }
        })
      },
      error: (error:any) => {
        this.isLoading = false;
        this.myForm.reset();
        this.modal.openErrorModal(error.error.message);
        this.dialogRef.close();
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  handleResponse(data:any) {
    //console.log(data);
    this.tokenService.handle(data.access_token);
    this.authService.changeAuthStatus(true);
    this.authService.handleSuccessfulLogin(); 
    this.dialogRef.close();

  }

  handle(data:any) {
    //console.log(data);
    this.tokenService.handle(data.access_token);
    this.authService.changeAuthStatus(true);
    this.authService.handleSuccessfulLogin(); 
    this.dialogRef.close();
  }

  sendTokenToBackend(token: string) {
    //console.log(token);

    this.authService.googleSignIn(token).subscribe({
      next: (res:any) => {

        if(res.new_user) {
          this.handle(res);
        }
        else {
          this.handleResponse(res);
          this.modal.openSuccessModal('Successfully Logged In');
        }
      }
    });
  }

  submitPhone() {
    this.isLoading = true;

    this.authService.submitPhone(this.phone_form).subscribe({
      next: (res:any) => {
        this.modal.openSuccessModal(res.message);

        this.dialogRef.close();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

}
