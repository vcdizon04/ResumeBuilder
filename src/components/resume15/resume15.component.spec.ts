import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume15Component } from './resume15.component';

describe('Resume15Component', () => {
  let component: Resume15Component;
  let fixture: ComponentFixture<Resume15Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume15Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
