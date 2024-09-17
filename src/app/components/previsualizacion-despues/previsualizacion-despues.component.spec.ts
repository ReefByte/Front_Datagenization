import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualizacionDespuesComponent } from './previsualizacion-despues.component';

describe('PrevisualizacionDespuesComponent', () => {
  let component: PrevisualizacionDespuesComponent;
  let fixture: ComponentFixture<PrevisualizacionDespuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrevisualizacionDespuesComponent]
    });
    fixture = TestBed.createComponent(PrevisualizacionDespuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
