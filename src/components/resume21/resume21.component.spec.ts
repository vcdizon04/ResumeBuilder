import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume21Component } from './resume21.component';

describe('Resume21Component', () => {
  let component: Resume21Component;
  let fixture: ComponentFixture<Resume21Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume21Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
