import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoexternosComponent } from './repoexternos.component';

describe('RepoexternosComponent', () => {
  let component: RepoexternosComponent;
  let fixture: ComponentFixture<RepoexternosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoexternosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoexternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
