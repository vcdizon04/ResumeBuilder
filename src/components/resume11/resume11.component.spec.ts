import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume11Component } from './resume11.component';

describe('Resume11Component', () => {
  let component: Resume11Component;
  let fixture: ComponentFixture<Resume11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
