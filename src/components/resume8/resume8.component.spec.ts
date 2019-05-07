import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume8Component } from './resume8.component';

describe('Resume8Component', () => {
  let component: Resume8Component;
  let fixture: ComponentFixture<Resume8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
