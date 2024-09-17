import { TestBed } from '@angular/core/testing';

import { ColumnSelectionService } from './column-selection.service';

describe('ColumnSelectionService', () => {
  let service: ColumnSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
