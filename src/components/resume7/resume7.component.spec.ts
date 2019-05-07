import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume7Component } from './resume7.component';

describe('Resume7Component', () => {
  let component: Resume7Component;
  let fixture: ComponentFixture<Resume7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
