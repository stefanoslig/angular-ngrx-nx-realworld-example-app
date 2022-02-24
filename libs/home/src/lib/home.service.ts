import { ApiService } from '@angular-ngrx-nx-realworld-example-app/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private apiService: ApiService) {}

  getTags(): Observable<{ tags: string[] }> {
    return this.apiService.get('/tags');
  }
}
