import { TestBed } from '@angular/core/testing';

import { JsonResumeService } from './json-resume.service';

describe('JsonResumeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonResumeService = TestBed.get(JsonResumeService);
    expect(service).toBeTruthy();
  });
});
