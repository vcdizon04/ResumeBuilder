import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  userDetails: firebase.User = null;
  private curentLoginStatusSource = new BehaviorSubject(false);
  curentLoginStatus = this.curentLoginStatusSource.asObservable();
  constructor(
    private firebaseAuth: AngularFireAuth
  ) {
    this.user = this.firebaseAuth.authState;
    // this.user.subscribe(
    //   (user) => {
    //     if (user) {
    //       this.userDetails = user;
    //       console.log(this.userDetails);
    //     } else {
    //       this.userDetails = null;
    //     }
    //   }
    // );
  }
  updateLoginStatus(status) {
    this.curentLoginStatusSource.next(status);
  }

  signup(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password);
  }
  signInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
    return this.firebaseAuth
      .auth
      .signOut();
  }

  isLoggedIn() {

   return new Promise((resolve, reject) => {
            this.user.subscribe(
              (user) => {
                if (user) {
                  this.userDetails = user;
                  console.log(this.userDetails);
                  resolve(user);
                } else {
                  reject();
                }
              }
            );

      });
    }


  getUserDetails() {
    return this.user;
  }

  updateProfile(name: string = null , url: string = null) {
   return firebase.auth().currentUser.updateProfile({
      displayName : name,
      photoURL : url,
    });
  }
  resetPassword(email) {
    return this.firebaseAuth.auth.sendPasswordResetEmail(email);
  }
  updatePassword(password) {
    return this.firebaseAuth.auth.currentUser.updatePassword(password);
  }
  verifyPassword(password) {
    // return this.firebaseAuth.auth.
  }
}
