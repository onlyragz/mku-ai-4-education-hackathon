import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http = inject(HttpClient);
  api = inject(ApiService);

  apiUrl = this.api.apiUrl

  constructor() { }

  getProducts()
  {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getCategories()
  {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getColors()
  {
    return this.http.get(`${this.apiUrl}/colors`);
  }

  getProduct(id:any)
  {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  getProductPrice(id:any, sizeId:any)
  {
    return this.http.get(`${this.apiUrl}/products/${id}/price/${sizeId}`);
  }

  getProductColors(id:any)
  {
    return this.http.get(`${this.apiUrl}/colors/${id}`);
  }

  getProductSizes(id:any)
  {
    return this.http.get(`${this.apiUrl}/sizes/${id}`);
  }

  getSizeColors(id:any, size_id:any)
  {
    return this.http.get(`${this.apiUrl}/colors/${id}/${size_id}`);
  }

  filter(min_price: number, max_price: number, selectedCategoryIds: number[], selectedColorIds: number[])
  {
    return this.http.post(`${this.apiUrl}/products/filter`, {
      min_price, 
      max_price,
      categories: selectedCategoryIds,
      colors: selectedColorIds
    });
  }
}
