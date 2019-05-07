import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume5Component } from './resume5.component';

describe('Resume5Component', () => {
  let component: Resume5Component;
  let fixture: ComponentFixture<Resume5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
