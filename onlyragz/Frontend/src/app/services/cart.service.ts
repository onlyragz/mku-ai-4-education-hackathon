import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  http = inject(HttpClient);
  api = inject(ApiService);
  token = inject(TokenService);

  apiUrl = this.api.apiUrl
  auth_get = this.api.auth_get;
  auth_post = this.api.auth_post;
  auth_put = this.api.auth_put;
  auth_delete = this.api.auth_delete;

  getCartItems()
  {
    return this.auth_get(`cart`);
  }

  addToCart(id: number, variation_id: number, quantity: number): Observable<any> 
  {
    const data = { 
      id: id, 
      variation_id, 
      quantity 
    };

    return this.auth_post(`cart/add`, data,);
  }

  isItemInCart(itemId: number,) 
  {
    const token = this.token.get();

    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/cart/check/${itemId}`, {headers});
  }

  getCartItemCount() 
  {
    return this.auth_get(`cart/count`);
  }

  updateCartItem(id: number, variation_id:number, quantity: number): Observable<any> 
  {
    const data = { id, variation_id, quantity };

    return this.auth_put(`cart/update`, data);
  }
}
