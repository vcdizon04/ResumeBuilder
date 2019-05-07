import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResumeListComponent } from './user-resume-list.component';

describe('UserResumeListComponent', () => {
  let component: UserResumeListComponent;
  let fixture: ComponentFixture<UserResumeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserResumeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResumeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
