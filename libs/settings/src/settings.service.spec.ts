import { TestBed, inject } from '@angular/core/testing';

import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsService]
    });
  });

  it(
    'should be created',
    inject([SettingsService], (service: SettingsService) => {
      expect(service).toBeTruthy();
    })
  );
});
