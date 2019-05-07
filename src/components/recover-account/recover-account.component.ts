import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.scss']
})
export class RecoverAccountComponent implements OnInit {
  email: string;
  emailSent = false;
  err: Object;
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }
  resetPassword() {
    this.spinner.show();
    this.authService.resetPassword(this.email).then( res => {
      console.log(res , 'email sent');
      this.emailSent = true;
      this.err = null;
      this.spinner.hide();
    })
    .catch(err => {
      console.log(err);
      // alert('Error: Please try again');
      this.err = err;
      this.spinner.hide();
    });
  }
}
