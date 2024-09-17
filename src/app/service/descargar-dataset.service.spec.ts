import { TestBed } from '@angular/core/testing';

import { DescargarDatasetService } from './descargar-dataset.service';

describe('DescargarDatasetService', () => {
  let service: DescargarDatasetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescargarDatasetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
