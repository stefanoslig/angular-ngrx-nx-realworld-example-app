import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomeService {
  constructor(private apiService: ApiService) {}

  getTags(): Observable<any> {
    return this.apiService.get('/tags');
  }
}
