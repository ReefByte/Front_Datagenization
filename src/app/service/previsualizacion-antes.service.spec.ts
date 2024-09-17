import { TestBed } from '@angular/core/testing';

import { PrevisualizacionAntesService } from './previsualizacion-antes.service';

describe('PrevisualizacionAntesService', () => {
  let service: PrevisualizacionAntesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrevisualizacionAntesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
