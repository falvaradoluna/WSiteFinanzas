import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoeSituacionfComponent } from './flujoe-situacionf.component';

describe('FlujoeSituacionfComponent', () => {
  let component: FlujoeSituacionfComponent;
  let fixture: ComponentFixture<FlujoeSituacionfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlujoeSituacionfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlujoeSituacionfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
