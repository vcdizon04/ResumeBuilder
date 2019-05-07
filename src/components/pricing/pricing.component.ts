import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { of, Subscription, pipe } from 'rxjs';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { AuthService } from 'src/services/auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { JsonResumeService } from 'src/services/json-resume.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
// declare let paypal: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit, AfterViewChecked, OnDestroy  {
  public payPalConfig?: PayPalConfig;
  email: string;
  password: string;
  needLogin = true;
  isLogin: boolean;
  $subscription: Subscription;

  constructor( private authService: AuthService, private router: Router, private jsonService: JsonResumeService,
    private spinner: NgxSpinnerService ) {
     this.$subscription = this.authService.curentLoginStatus.subscribe(status => {
       console.log(status);
       this.isLogin = status;
     });

     this.spinner.show();
     this.authService.isLoggedIn().then((res) => {
       console.log(res , 'user is login');
       // actions.enable();
       this.needLogin = false;
       this.authService.updateLoginStatus(true);
       this.spinner.hide();
      })
      .catch(err => {
          console.log(err);
          // actions.disable();
          this.needLogin = true;
          this.authService.updateLoginStatus(false);
          this.spinner.hide();
          // this.router.navigate(['/login'], { queryParams: { returnUrl: '/pricing'}});
      });
  }
  // addScript: boolean = false;
  
  // finalAmount: number = 1;

  // paypalConfig1 = {
  //   env: 'sandbox',
  //   client: {
  //     sandbox: 'AZw6gqitk2nDExrcAkhdPRCN6GTeSb23_dEOfP7zCza0NhQRplf-ab1NaLjju2ekXGt6SFxHPdJl0l7D',
  //     // production: '<production-key>' 
  //   },
  //   commit: true,
  //   payment: (data, actions) => {
  //       return actions.payment.create({
  //         payment: {
  //           transactions: [
  //             {amount: { total: 49.99, currency: 'USD'}}
  //           ]
  //         }
  //       });
  //   },
  //   onAuthorize: (data, actions) => {
  //     return actions.payment.execute().then((payment) => {
  //       // console.log('pay succesful');
  //       console.log(payment);
  //     })
  //   },
  // };

  // paypalConfig2 = {
  //   env: 'sandbox',
  //   client: {
  //     sandbox: 'AZw6gqitk2nDExrcAkhdPRCN6GTeSb23_dEOfP7zCza0NhQRplf-ab1NaLjju2ekXGt6SFxHPdJl0l7D',
  //     // production: '<production-key>' 
  //   },
  //   commit: true,
  //   payment: (data, actions) => {
  //       return actions.payment.create({
  //         payment: {
  //           transactions: [
  //             {amount: { total: 19.99, currency: 'USD'}}
  //           ]
  //         }
  //       });
  //   },
  //   onAuthorize: (data, actions) => {
  //     return actions.payment.execute().then((payment) => {
  //       // console.log('pay succesful');
  //       console.log(payment);
  //     });
  //   },
  // };


  // paypalConfig3 = {
  //   env: 'sandbox',
  //   client: {
  //     sandbox: 'AZw6gqitk2nDExrcAkhdPRCN6GTeSb23_dEOfP7zCza0NhQRplf-ab1NaLjju2ekXGt6SFxHPdJl0l7D',
  //     // production: '<production-key>' 
  //   },
  //   commit: true,
  //   payment: (data, actions) => {
  //       return actions.payment.create({
  //         payment: {
  //           transactions: [
  //             {amount: { total: 65.94, currency: 'USD'}}
  //           ]
  //         }
  //       });
  //   },
  //   onAuthorize: (data, actions) => {
  //     return actions.payment.execute().then((payment) => {
  //       // console.log('pay succesful');
  //       console.log(payment);
  //     })
  //   },
  // };

  ngOnInit() {
  
  }
  choosePlan(price, days) {
    this.initConfig(price, days);
  }

  private initConfig(price, days): void {
    this.payPalConfig = new PayPalConfig(
      PayPalIntegrationType.ClientSideREST,
      PayPalEnvironment.Sandbox,
      {
        commit: true,
        client: {
          sandbox:
            'AZw6gqitk2nDExrcAkhdPRCN6GTeSb23_dEOfP7zCza0NhQRplf-ab1NaLjju2ekXGt6SFxHPdJl0l7D'
        },
        button: {
          label: 'paypal',
          layout: 'vertical'
        },
        onAuthorize: (data, actions) => {
          console.log('Authorize');
          return of(undefined);
        },
        onPaymentComplete: async (data, actions) => {
          this.spinner.show();
          console.log('OnPaymentComplete', data);
          this.$subscription = this.authService.getUserDetails().subscribe(async user => {
            console.log(user , 'The registered user');
            const userAccount = <any>await this.getUserAccount(user.uid);
            console.log(userAccount);
            const dateExpiration = new Date(userAccount.expiration_date);
            dateExpiration.setDate(dateExpiration.getDate() + days) ;
            const timestampExpiration = dateExpiration.getTime();
            console.log(timestampExpiration);
            this.jsonService.getResumeJsonRefAccount(user.uid)
            .set({start_date: userAccount.start_date, expiration_date: timestampExpiration })
            .then( () => {
              this.spinner.hide();
            })
            .catch(err => {
              console.log(err);
              alert(err);
              this.spinner.hide();
            });
          //  this.jsonService.getResumeJsonRefAccount(user.uid).valueChanges().subscribe(  (res) => {
          //   console.log(res);
          //   const jsonResume = res as any;
          //   const dateExpiration = new Date(jsonResume.expiration_date);
          //   dateExpiration.setDate(dateExpiration.getDate() + days) ;
          //   const timestampExpiration = dateExpiration.getTime();
          //   console.log(timestampExpiration);
          //     // this.jsonService.getResumeJsonRefAccount(user.uid).query.once('value').then
          //       // this.jsonService.getResumeJsonRefAccount(user.uid)
          //       // .set({start_date: jsonResume.start_date, expiration_date: timestampExpiration })
          //       // .then( () => {
          //       //   this.spinner.hide();
          //       //   // this.router.navigate(['/templates']);
          //       // })
          //       // .catch(err => {
          //       //   console.log(err);
          //       //   alert(err);
          //       //   this.spinner.hide();
          //       // });
          //  });
          });

        },
        onCancel: (data, actions) => {
          console.log('OnCancel');
        },
        onError: err => {
          console.log('OnError');
        },
        onClick: () => {
          console.log('onClick');
        },
        validate: (actions) => {
          console.log(actions);
          if (this.isLogin) {
            actions.enable();
          } else {
            actions.disable();
          }
        },
        experience: {
          noShipping: true,
          brandName: 'Angular PayPal'
        },
        transactions: [
          {
            amount: {
              total: price,
              currency: 'USD',
              // details: {
              //   subtotal: 30.00,
              //   tax: 0.07,
              //   shipping: 0.03,
              //   handling_fee: 1.00,
              //   shipping_discount: -1.00,
              //   insurance: 0.01
              // }
            },
            // custom: 'Custom value',
            // item_list: {
            //   items: [
            //     {
            //       name: 'hat',
            //       description: 'Brown hat.',
            //       quantity: 5,
            //       price: 3,
            //       tax: 0.01,
            //       sku: '1',
            //       currency: 'USD'
            //     },
            //     {
            //       name: 'handbag',
            //       description: 'Black handbag.',
            //       quantity: 1,
            //       price: 15,
            //       tax: 0.02,
            //       sku: 'product34',
            //       currency: 'USD'
            //     }],
            //   shipping_address: {
            //     recipient_name: 'Brian Robinson',
            //     line1: '4th Floor',
            //     line2: 'Unit #34',
            //     city: 'San Jose',
            //     country_code: 'US',
            //     postal_code: '95131',
            //     phone: '011862212345678',
            //     state: 'CA'
            //   },
            // },
          }
        ],
        note_to_payer: 'Contact us if you have troubles processing payment'
      }
    );
  }

  ngAfterViewChecked(): void {
    // if(!this.addScript) {
    //   this.addPaypalScript().then(() => {
    //     paypal.Button.render(this.paypalConfig1, '#paypal-checkout-btn');
    //     paypal.Button.render(this.paypalConfig2, '#paypal-checkout-btn2');
    //     paypal.Button.render(this.paypalConfig3, '#paypal-checkout-btn3');
    //   })
    // }
  }



  login() {
    this.spinner.show();
    this.authService.login(this.email, this.password).then(value => {
      console.log('Nice, it worked!' , value);
      const uid = value.uid;
      this.authService.updateLoginStatus(true);
      this.spinner.hide();
    })
    .catch(err => {
      console.log('Something went wrong:', err.message);
      this.authService.updateLoginStatus(false);
      alert('Login Error');
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
              // if (result) {
              //   this.returnUrl = '/dashboard';
              // } else {
              //   this.returnUrl = '/templates';
              // }
              this.spinner.hide();
              // this.router.navigateByUrl(this.returnUrl);
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
  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }
  getUserAccount(uid) {
    return new Promise( (resolve, reject) => { 
      this.jsonService.getResumeJsonRefAccount(uid).valueChanges().subscribe(  (res) => {
        resolve(res);
      });
    } );
  
  }
  // addPaypalScript() {
  //   this.addScript = true;
  //   return new Promise((resolve, reject) => {
  //     let scripttagElement = document.createElement('script');
  //     scripttagElement.src = "https://www.paypalobjects.com/api/checkout.js";
  //     scripttagElement.onload = resolve;
  //     document.body.appendChild(scripttagElement);
  //   })
  // }
}
