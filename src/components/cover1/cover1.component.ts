import { Component, OnInit, Injector } from '@angular/core';
import { CoverJson } from 'src/models/CoverJson';
import { JsonResumeService } from 'src/services/json-resume.service';
import { AuthService } from 'src/services/auth.service';
import { ResumeJson } from 'src/models/ResmeJson';
import { CoverEditorComponent } from '../cover-editor/cover-editor.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cover1',
  templateUrl: './cover1.component.html',
  styleUrls: ['./cover1.component.scss']
})
export class Cover1Component implements OnInit {
  CoverJson: CoverJson;
  $subscription: Subscription;
  coverEditorComponent: CoverEditorComponent;
  constructor(
    private ResumeJsonService: JsonResumeService,
    private authService: AuthService,
    private injector: Injector
  ) {
    this.coverEditorComponent = this.injector.get(CoverEditorComponent);
  }

  ngOnInit() {
   this.$subscription =  this.ResumeJsonService.getCoverJson().subscribe( res => {
     console.log(res);
    this.CoverJson = res;
  });
    // this.authService.getUserDetails().subscribe(
    //   (user) => {
    //     if (user) {
    //       console.log(user);
    //       this.ResumeJsonService.getResumeJsonRef(user.uid)
    //       .valueChanges()
    //       .subscribe(async res => {
    //         const jsonResume = res as ResumeJson;
    //         this.coverJson = {
    //           name: jsonResume.basic.name,
    //           jobTitle: jsonResume.basic.jobtitle,
    //           date: this.DateNow,
    //           email: jsonResume.basic.email,
    //           phone: jsonResume.basic.phone
    //         };
    //       });
    //     }
    //   }
    // );
  //  this.ResumeJsonService.getResumeJson().subscribe(res => {
  //    console.log(res);
  //     this.coverJson = {
  //       name: res.basic.name,
  //       jobTitle: res.basic.jobtitle,
  //       date: this.DateNow,
  //       email: res.basic.email,
  //       phone: res.basic.phone
  //     };
  //  });
  
  }

  // save() {

  //     this.ResumeJsonService.getCoverJsonRef(user.uid).set(
  //      this.coverJson
  //     );
  
  // }
}
