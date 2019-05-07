import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { JsonResumeService } from 'src/services/json-resume.service';
import {ResumeJson } from 'src/models/ResmeJson';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  err: Object;
  email: string;
  password: string;
  name: string;
  terms: boolean;

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private ResumeJsonService: JsonResumeService
  ) { }

  ngOnInit() {
  }

  signUp() {
    this.spinner.show();
    this.authService.signup(this.email , this.password).then(value => {
      console.log('Success!', value);
      this.authService.updateProfile(this.name).then( () => {
        console.log('Success!');
        this.authService.getUserDetails().subscribe(user => {
          console.log(user , 'The registered user');
          const dateNow = new Date();
          const dateExpiration = new Date();
          const timestampNow = dateNow.getTime();
          dateExpiration.setDate(dateExpiration.getDate() + 14) ;
          const timestampExpiration = dateExpiration.getTime();
          this.ResumeJsonService.getResumeJsonRefAccount(user.uid).set({start_date: timestampNow, expiration_date: timestampExpiration })
          .then(res => {
            console.log(res, 'Added to database Free trial');
            this.spinner.hide();
            this.router.navigate(['/templates']);
          })
          .catch(err => {
            console.log(err);
            alert(err);
            this.spinner.hide();
          });
        });
        // this.ResumeJsonService.getResumeJsonRef().set(this.ResumeJson);
        // this.spinner.hide();
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        alert('Error:' + err.message);
        this.err = err;
        this.spinner.hide();
      });
    })
    .catch(err => {
      console.log('Something went wrong:', err.message);
      // alert('Error: ' + err.message  )
      this.err = err;
      this.spinner.hide();
    });
  }

  gotoSignin() {
    this.router.navigate(['/login']);
  }
  // signInWithGoogle() {
  //   this.authService.signInWithGoogle().then( res => {
  //     console.log('Nice, it worked!' , res);
  //     const uid = res.uid;
  //     this.ResumeJsonService.getResumeJsonRef(uid).valueChanges()
  //     .subscribe(
  //         result => {
  //             console.log(result , 'RESUME USER');
  //             if (result) {
  //               this.returnUrl = '/dashboard';
  //             } else {
  //               this.returnUrl = '/templates';
  //             }
  //             this.spinner.hide();
  //             this.router.navigateByUrl(this.returnUrl);
  //             // this.router.navigate(['/dashboard']);
  //         }
  //     );
  //   });
  // }

}
