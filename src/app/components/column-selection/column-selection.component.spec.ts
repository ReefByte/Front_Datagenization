import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnSelectionComponent } from './column-selection.component';

describe('ColumnSelectionComponent', () => {
  let component: ColumnSelectionComponent;
  let fixture: ComponentFixture<ColumnSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnSelectionComponent]
    });
    fixture = TestBed.createComponent(ColumnSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
