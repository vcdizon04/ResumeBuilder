import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume13Component } from './resume13.component';

describe('Resume13Component', () => {
  let component: Resume13Component;
  let fixture: ComponentFixture<Resume13Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume13Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
