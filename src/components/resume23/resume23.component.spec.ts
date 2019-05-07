import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume23Component } from './resume23.component';

describe('Resume23Component', () => {
  let component: Resume23Component;
  let fixture: ComponentFixture<Resume23Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume23Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
