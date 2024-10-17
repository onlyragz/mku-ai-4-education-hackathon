import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  http = inject(HttpClient);
  api = inject(ApiService);
  token = inject(TokenService);

  apiUrl = this.api.apiUrl
  auth_get = this.api.auth_get;
  auth_post = this.api.auth_post;
  auth_put = this.api.auth_put;
  auth_delete = this.api.auth_delete;

  getQuestion(page:number) {
    return this.auth_get(`questions?page=${page}`);
  }
}
