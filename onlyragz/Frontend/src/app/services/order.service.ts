import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  api = inject(ApiService);
  http = inject(HttpClient);
  token = inject(TokenService);

  apiUrl = this.api.apiUrl;
  auth_get = this.api.auth_get;
  auth_post = this.api.auth_post;
  auth_put = this.api.auth_put;
  auth_delete = this.api.auth_delete;

  getCounties()
  {
    return this.http.get(`${this.apiUrl}/counties`);
  }

  getShippingForCounty(id:any)
  {
    return this.http.get(`${this.apiUrl}/counties/${id}`);
  }

  getDeliveryTypes()
  {
    return this.http.get(`${this.apiUrl}/delivery/types`);
  }

  getUser()
  {
    const token = this.token.get();

    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/profile`, {headers});
  }

  createOrder(order_data:any)
  {
    return this.auth_post(`order/create`, order_data);
  }

  getOrders()
  {
    return this.auth_get('orders');
  }

  getOrder(id:any)
  {
    return this.auth_get(`orders/${id}`)
  }

}
