import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ApiService } from '@realworld/core/http-client';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService, ApiService],
    });
  });

  it('should be created', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));
});
