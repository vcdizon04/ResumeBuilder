import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume20Component } from './resume20.component';

describe('Resume20Component', () => {
  let component: Resume20Component;
  let fixture: ComponentFixture<Resume20Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume20Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
