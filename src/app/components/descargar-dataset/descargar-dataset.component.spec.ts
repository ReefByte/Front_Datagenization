import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarDatasetComponent } from './descargar-dataset.component';

describe('DescargarDatasetComponent', () => {
  let component: DescargarDatasetComponent;
  let fixture: ComponentFixture<DescargarDatasetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescargarDatasetComponent]
    });
    fixture = TestBed.createComponent(DescargarDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
