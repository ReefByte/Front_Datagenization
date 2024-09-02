import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualizacionAntesComponent } from './previsualizacion-antes.component';

describe('PrevisualizacionAntesComponent', () => {
  let component: PrevisualizacionAntesComponent;
  let fixture: ComponentFixture<PrevisualizacionAntesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevisualizacionAntesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrevisualizacionAntesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
