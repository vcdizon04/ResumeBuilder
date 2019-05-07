import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume4Component } from './resume4.component';

describe('Resume4Component', () => {
  let component: Resume4Component;
  let fixture: ComponentFixture<Resume4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
