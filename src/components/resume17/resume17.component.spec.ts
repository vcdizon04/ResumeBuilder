import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume17Component } from './resume17.component';

describe('Resume17Component', () => {
  let component: Resume17Component;
  let fixture: ComponentFixture<Resume17Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume17Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
