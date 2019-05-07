import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonResumeService } from 'src/services/json-resume.service';
import { ResumeJson } from 'src/models/ResmeJson';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user = {
    firstname: undefined,
    lastname: undefined,
    jobtitle: undefined,
    address: undefined,
    city: undefined,
    zip: undefined,
    phone: undefined,
    email: undefined
  } ;
  ResumeJson = { } as ResumeJson;
  jobTitles: Array<any>;
  currentJob = {
    JOB_ID: undefined,
    JOB_VALUE: undefined
  };

  constructor(
    private router: Router,
    private ResumeJsonService: JsonResumeService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private papa: Papa
  ) {
    this.ResumeJsonService.getAllJobs().subscribe(res => {
      const csv = res as any;
      this.papa.parse(csv._body, {
        complete: (result) => {
          console.log(result , 'parsed');
          this.jobTitles = result.data;
        },
        header: true
    });

    });
  }

  ngOnInit() {
  }

  gotoResumeEditor() {
    this.spinner.show();
    this.ResumeJson.template = this.ResumeJsonService.Template;
    this.ResumeJson.basic = {
      name: this.user.firstname + ' ' + this.user.lastname,
      email: this.user.email,
      phone: this.user.phone,
      address: this.user.address + ' ' + this.user.city + ' ' + this.user.zip,
      jobtitle: this.currentJob.JOB_VALUE
    };
    // this.ResumeJsonService.updateResumeJson(this.ResumeJson);
    this.spinner.show();
    this.authService.getUserDetails().subscribe(
     (user) => {
       if (user) {
         this.ResumeJsonService.getResumeJsonRef(user.uid).set(this.ResumeJson).then(res => {
           console.log(res);
           this.spinner.hide();
           this.router.navigate(['/resume-editor/' + this.ResumeJsonService.Template]);
         });
       }
     }
   );
  }

}
