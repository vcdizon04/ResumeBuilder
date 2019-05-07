import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  newPassword: string;
  confirmPassword: string;
  constructor( private auth: AuthService, private spinner: NgxSpinnerService ) { }

  err: Object;
  ngOnInit() {
  }
  updatePassword() {
    console.log(this.newPassword, this.confirmPassword);
    this.spinner.show();
    this.auth.updatePassword(this.newPassword).then(
      res => {
        console.log(res , 'Password Updated');
        this.spinner.hide();
      }
    ).catch(err => {
      console.log(err, 'Error');
      this.err = err;
      this.spinner.hide();
      // alert('Update Password Error');
    });
  }

}
