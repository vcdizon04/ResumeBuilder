import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume12Component } from './resume12.component';

describe('Resume12Component', () => {
  let component: Resume12Component;
  let fixture: ComponentFixture<Resume12Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
