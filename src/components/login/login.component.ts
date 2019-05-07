import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonResumeService } from 'src/services/json-resume.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  returnUrl: string;
  err: Object;

  constructor(
    private authService: AuthService,
    private jsonService: JsonResumeService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
   }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    //  this.jsonService.getResumeJsonRef(uid).valueChanges()
            // .subscribe(
            //     result => {
            //         console.log(result);
            //         this.router.navigate(['/dashboard']);
            //     }
            // );
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  login() {
    this.spinner.show();
    this.authService.login(this.email, this.password).then(value => {
      console.log('Nice, it worked!' , value);
      const uid = value.uid;
      this.jsonService.getResumeJsonRef(uid).valueChanges()
      .subscribe(
          result => {
              console.log(result , 'RESUME USER');
              if (result) {
                this.returnUrl = '/dashboard';
              } else {
                this.returnUrl = '/templates';
              }
              this.spinner.hide();
              this.router.navigateByUrl(this.returnUrl);
              // this.router.navigate(['/dashboard']);
          }
      );
    })
    .catch(err => {
      console.log('Something went wrong:', err.message);
      // alert('Login Error');
      this.err = err;
      this.spinner.hide();
    });
  }
  signInWithGoogle() {
    this.authService.signInWithGoogle().then( res => {
      console.log('Nice, it worked!' , res);
      const uid = res.uid;
      this.jsonService.getResumeJsonRef(uid).valueChanges()
      .subscribe(
          result => {
              console.log(result , 'RESUME USER');
              if (result) {
                this.returnUrl = '/dashboard';
              } else {
                this.returnUrl = '/templates';
              }
              this.spinner.hide();
              this.router.navigateByUrl(this.returnUrl);
              // this.router.navigate(['/dashboard']);
          }
      );
    });
  }

  gotoSignUp() {
    this.router.navigate(['/signup']);
  }
  gotoRecover() {
    this.router.navigate(['/recovery']);
  }
}
