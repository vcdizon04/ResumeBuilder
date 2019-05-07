import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { JsonResumeService } from './json-resume.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private af: AngularFireAuth,
        private authService: AuthService,
        private jsonService: JsonResumeService
        ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        // console.log(this.authService.isLoggedIn());
        // if ( this.authService.isLoggedIn() ) {
        //     return true;
        // } else {
        // this.router.navigate(['/login']);
        // return false;
        // }
        return this.authService.isLoggedIn().then((res) => {
            // const uid = Object.values(res)[9];
            // this.jsonService.getResumeJsonRef(uid).valueChanges()
            // .subscribe(
            //     result => {
            //         console.log(result);
            //         this.router.navigate(['/dashboard']);
            //     }
            // );
            return true;
        })
        .catch(err => {
            console.log(err);
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        });
        // return this.af.authState.subscribe(res=>{
        //     console.log(res);
        // })
    }
}
