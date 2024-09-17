import { TestBed } from '@angular/core/testing';

import { PrevisualizacionDespuesService } from './previsualizacion-despues.service';

describe('PrevisualizacionDespuesService', () => {
  let service: PrevisualizacionDespuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrevisualizacionDespuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
