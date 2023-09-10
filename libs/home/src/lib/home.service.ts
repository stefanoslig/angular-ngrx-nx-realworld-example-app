import { ApiService } from '@realworld/core/http-client';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private readonly apiService = inject(ApiService);

  getTags(): Observable<{ tags: string[] }> {
    return this.apiService.get('/tags');
  }
}
