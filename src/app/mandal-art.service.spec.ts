import { TestBed, inject } from '@angular/core/testing';

import { MandalArtService } from './mandal-art.service';

describe('MandalArtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MandalArtService]
    });
  });

  it('should be created', inject([MandalArtService], (service: MandalArtService) => {
    expect(service).toBeTruthy();
  }));
});
