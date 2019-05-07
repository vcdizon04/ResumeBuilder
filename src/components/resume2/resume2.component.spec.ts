import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume2Component } from './resume2.component';

describe('Resume2Component', () => {
  let component: Resume2Component;
  let fixture: ComponentFixture<Resume2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
