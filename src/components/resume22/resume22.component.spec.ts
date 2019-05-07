import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume22Component } from './resume22.component';

describe('Resume22Component', () => {
  let component: Resume22Component;
  let fixture: ComponentFixture<Resume22Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume22Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
