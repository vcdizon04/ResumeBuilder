import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { AuthGuard } from 'src/services/auth-guard.service';
import { AuthService } from 'src/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  $subscription: Subscription;
  constructor(
    private authService: AuthService
  ) {
    // this.authService.canActivate().then(res => {
    //   return this.isLoggedIn = true;
    // })
    // .catch(err => {
    //   console.log(err, 'not authenticated');
    //   return this.isLoggedIn = false;
    // });
    this.$subscription = this.authService.curentLoginStatus.subscribe(status => this.isLoggedIn = status);
    this.authService.isLoggedIn().then(() => {
          return this.authService.updateLoginStatus(true);
      })
      .catch(err => {
          console.log(err);
          return this.authService.updateLoginStatus(false);
      });
  }

  ngOnInit() {
    this.navBarOnscroll();
    $(window).scroll( () => {
        this.navBarOnscroll();
    });
  }
  navBarOnscroll() {
    if (window.pageYOffset > 0 ) {
      $('nav').addClass('bg-light');
    } else {
      $('nav').removeClass('bg-light');
    }
  }
  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }
}
