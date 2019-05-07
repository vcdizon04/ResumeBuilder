import { Component, OnInit, OnDestroy } from '@angular/core';
import { JsonResumeService } from 'src/services/json-resume.service';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-resume-list',
  templateUrl: './user-resume-list.component.html',
  styleUrls: ['./user-resume-list.component.scss']
})
export class UserResumeListComponent implements OnInit, OnDestroy {
templatePreviewimage: string;
$subscription: Subscription;
  constructor(
    private ResumeJsonService: JsonResumeService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.$subscription = this.authService.getUserDetails().subscribe(user => {
      this.ResumeJsonService.getResumeJsonRef(user.uid)
      .valueChanges()
      .subscribe(res  => {
        const userData = res as any;
        this.templatePreviewimage = userData ? userData.templatePreview : null;
        this.spinner.hide();
      });
    });
   }

  ngOnInit() {
  }
  continueEditing() {
    this.router.navigate(['/resume-editor']);
  }
  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

}
