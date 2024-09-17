import { TestBed } from '@angular/core/testing';

import { RecomendacionesRealizadasService } from './recomendaciones-realizadas.service';

describe('RecomendacionesRealizadasService', () => {
  let service: RecomendacionesRealizadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecomendacionesRealizadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
