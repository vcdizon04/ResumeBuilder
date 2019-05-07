import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume9Component } from './resume9.component';

describe('Resume9Component', () => {
  let component: Resume9Component;
  let fixture: ComponentFixture<Resume9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
