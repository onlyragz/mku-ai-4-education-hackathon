import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public apiUrl = `${environment.backendUrl}/api`;

  constructor() { }
}
