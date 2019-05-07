import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.scss']
})
export class Navbar2Component implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  logOut() {
    this.authService.logout().then(res => {
      console.log(res , 'logut');
      this.router.navigate(['/home']);
    })
    .catch(err => console.log(err));
  }
  gotoPricing() {
    this.router.navigate(['/pricing']);
  }
  gotoAccount() {
    this.router.navigate(['/account']);
  }

}
