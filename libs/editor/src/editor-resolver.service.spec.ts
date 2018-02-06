import { TestBed, inject } from '@angular/core/testing';

import { EditorResolverService } from './editor-resolver.service';

describe('EditorResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorResolverService]
    });
  });

  it(
    'should be created',
    inject([EditorResolverService], (service: EditorResolverService) => {
      expect(service).toBeTruthy();
    })
  );
});
