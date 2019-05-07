import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume14Component } from './resume14.component';

describe('Resume14Component', () => {
  let component: Resume14Component;
  let fixture: ComponentFixture<Resume14Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume14Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
