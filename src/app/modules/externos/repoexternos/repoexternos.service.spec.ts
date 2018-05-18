import { TestBed, inject } from '@angular/core/testing';

import { RepoexternosService } from './repoexternos.service';

describe('RepoexternosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepoexternosService]
    });
  });

  it('should be created', inject([RepoexternosService], (service: RepoexternosService) => {
    expect(service).toBeTruthy();
  }));
});
