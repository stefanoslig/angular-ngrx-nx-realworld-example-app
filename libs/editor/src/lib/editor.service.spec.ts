import { TestBed, inject } from '@angular/core/testing';

import { EditorService } from './editor.service';

describe('EditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorService]
    });
  });

  it(
    'should be created',
    inject([EditorService], (service: EditorService) => {
      expect(service).toBeTruthy();
    })
  );
});
