import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume3Component } from './resume3.component';

describe('Resume3Component', () => {
  let component: Resume3Component;
  let fixture: ComponentFixture<Resume3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
