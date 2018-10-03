import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionPlantillaComponent } from './configuracion-plantilla.component';

describe('ConfiguracionPlantillaComponent', () => {
  let component: ConfiguracionPlantillaComponent;
  let fixture: ComponentFixture<ConfiguracionPlantillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionPlantillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
