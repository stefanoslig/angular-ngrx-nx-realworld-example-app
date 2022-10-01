import { TestBed, inject } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { SettingsService } from './settings.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '@realworld/core/http-client';

describe('SettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SettingsService, MockProvider(ApiService)],
    });
  });

  it('should be created', inject([SettingsService], (service: SettingsService) => {
    expect(service).toBeTruthy();
  }));
});
