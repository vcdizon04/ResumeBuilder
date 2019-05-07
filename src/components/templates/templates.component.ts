import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonResumeService } from 'src/services/json-resume.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  constructor(
    private router: Router,
    private ResumeJsonService: JsonResumeService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }
  selectTemplate(template) {
    this.ResumeJsonService.Template = template;
    this.authService.getUserDetails().subscribe(
      (user) => {
        if (user) {
          console.log(user);
          this.ResumeJsonService.getResumeJsonRef(user.uid)
          .valueChanges()
          .subscribe(async res => {
            if (res) {
            this.router.navigate(['resume-editor/' + template]);
            } else {
              this.router.navigate(['/user-details']);
            }
          },
          err =>   this.router.navigate(['/user-details'])
          );
        }
      }
    );

  }

}
