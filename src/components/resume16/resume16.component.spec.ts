import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume16Component } from './resume16.component';

describe('Resume16Component', () => {
  let component: Resume16Component;
  let fixture: ComponentFixture<Resume16Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume16Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
