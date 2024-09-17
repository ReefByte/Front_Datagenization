import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacionesRealizadasComponent } from './recomendaciones-realizadas.component';

describe('RecomendacionesRealizadasComponent', () => {
  let component: RecomendacionesRealizadasComponent;
  let fixture: ComponentFixture<RecomendacionesRealizadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecomendacionesRealizadasComponent]
    });
    fixture = TestBed.createComponent(RecomendacionesRealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
