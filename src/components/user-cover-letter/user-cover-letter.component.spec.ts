import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoverLetterComponent } from './user-cover-letter.component';

describe('UserCoverLetterComponent', () => {
  let component: UserCoverLetterComponent;
  let fixture: ComponentFixture<UserCoverLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCoverLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCoverLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
