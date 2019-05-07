import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume19Component } from './resume19.component';

describe('Resume19Component', () => {
  let component: Resume19Component;
  let fixture: ComponentFixture<Resume19Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume19Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
