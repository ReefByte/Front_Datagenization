import { TestBed } from '@angular/core/testing';

import { ColumnGroupingService } from './column-grouping.service';

describe('ColumnGroupingService', () => {
  let service: ColumnGroupingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnGroupingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
