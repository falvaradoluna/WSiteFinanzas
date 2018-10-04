import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDePlantaComponent } from './reporte-de-planta.component';

describe('ReporteDePlantaComponent', () => {
  let component: ReporteDePlantaComponent;
  let fixture: ComponentFixture<ReporteDePlantaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDePlantaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDePlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
