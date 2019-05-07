import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JsonResumeService } from 'src/services/json-resume.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-user-cover-letter',
  templateUrl: './user-cover-letter.component.html',
  styleUrls: ['./user-cover-letter.component.scss']
})
export class UserCoverLetterComponent implements OnInit, OnDestroy {
  templatePreviewImage: string;
  istemplatePreviewImage = false;
  $subscription: Subscription;
  constructor(private router: Router, private ResumeJsonService: JsonResumeService, private authService: AuthService) { 
    this.$subscription = this.authService.getUserDetails().subscribe(user => {
    this.ResumeJsonService.getCoverJsonRef(user.uid).valueChanges().subscribe((res) => {
      const userData = res as any;
      this.templatePreviewImage = userData.templatePreview;
    });
   });
  }

  ngOnInit() {
  }
  gotoCoverLetter() {
    this.router.navigate(['/cover-editor']);
  }
  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }
}
