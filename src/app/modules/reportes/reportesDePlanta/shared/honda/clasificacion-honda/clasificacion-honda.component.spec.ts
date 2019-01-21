import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionHondaComponent } from './clasificacion-honda.component';

describe('ClasificacionHondaComponent', () => {
  let component: ClasificacionHondaComponent;
  let fixture: ComponentFixture<ClasificacionHondaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasificacionHondaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificacionHondaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
