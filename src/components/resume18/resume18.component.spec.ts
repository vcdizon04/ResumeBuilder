import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume18Component } from './resume18.component';

describe('Resume18Component', () => {
  let component: Resume18Component;
  let fixture: ComponentFixture<Resume18Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume18Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
