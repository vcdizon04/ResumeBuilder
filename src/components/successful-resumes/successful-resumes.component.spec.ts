import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulResumesComponent } from './successful-resumes.component';

describe('SuccessfulResumesComponent', () => {
  let component: SuccessfulResumesComponent;
  let fixture: ComponentFixture<SuccessfulResumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulResumesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulResumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
