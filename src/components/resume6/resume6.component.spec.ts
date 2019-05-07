import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume6Component } from './resume6.component';

describe('Resume6Component', () => {
  let component: Resume6Component;
  let fixture: ComponentFixture<Resume6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
