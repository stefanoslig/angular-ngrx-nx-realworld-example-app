import { TestBed, inject } from '@angular/core/testing';

import { ProfileResolverService } from './profile-resolver.service';

describe('ProfileResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileResolverService]
    });
  });

  it(
    'should be created',
    inject([ProfileResolverService], (service: ProfileResolverService) => {
      expect(service).toBeTruthy();
    })
  );
});
