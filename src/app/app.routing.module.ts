import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/components/home/home.component';
import { LayoutComponent } from 'src/layout/layout.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { Navbar2Component } from 'src/components/navbar2/navbar2.component';
import { FooterComponent } from 'src/components/footer/footer.component';
import { PricingComponent } from 'src/components/pricing/pricing.component';
import { LoginComponent } from 'src/components/login/login.component';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { AuthGuard } from '../services/auth-guard.service';
import { SignupComponent } from 'src/components/signup/signup.component';
import { TermsComponent } from 'src/components/terms/terms.component';
import { PrivacyComponent } from 'src/components/privacy/privacy.component';
import { ResourcesComponent } from 'src/components/resources/resources.component';
import { SuccessfulResumesComponent } from 'src/components/successful-resumes/successful-resumes.component';
import { FAQComponent } from 'src/components/faq/faq.component';
import { TemplatesComponent } from 'src/components/templates/templates.component';
import { ResumeEditorComponent } from 'src/components/resume-editor/resume-editor.component';
import { UserInfoComponent } from 'src/components/user-info/user-info.component';

import { BlogsComponent } from 'src/components/blogs/blogs.component';
import { RecoverAccountComponent } from 'src/components/recover-account/recover-account.component';
import { UserResumeListComponent } from 'src/components/user-resume-list/user-resume-list.component';
import { Resume1Component } from 'src/components/resume1/resume1.component';
import { Resume2Component } from 'src/components/resume2/resume2.component';
import { Resume3Component } from 'src/components/resume3/resume3.component';
import { Resume4Component } from 'src/components/resume4/resume4.component';
import { Resume5Component } from 'src/components/resume5/resume5.component';
import { Resume6Component } from 'src/components/resume6/resume6.component';
import { Resume7Component } from 'src/components/resume7/resume7.component';
import { Resume8Component } from 'src/components/resume8/resume8.component';
import { Resume9Component } from 'src/components/resume9/resume9.component';
import { Resume10Component } from 'src/components/resume10/resume10.component';
import { Resume11Component } from 'src/components/resume11/resume11.component';
import { Resume12Component } from 'src/components/resume12/resume12.component';
import { Resume13Component } from 'src/components/resume13/resume13.component';
import { Resume14Component } from 'src/components/resume14/resume14.component';
import { Resume15Component } from 'src/components/resume15/resume15.component';
import { Resume16Component } from 'src/components/resume16/resume16.component';
import { Resume17Component } from 'src/components/resume17/resume17.component';
import { Resume18Component } from 'src/components/resume18/resume18.component';
import { Resume19Component } from 'src/components/resume19/resume19.component';
import { Resume20Component } from 'src/components/resume20/resume20.component';
import { Resume21Component } from 'src/components/resume21/resume21.component';
import { Resume22Component } from 'src/components/resume22/resume22.component';
import { Resume23Component } from 'src/components/resume23/resume23.component';
import { ComponentCanDeactivate } from 'src/services/component-can-deactivate';
import { CanDeactivateGuard } from 'src/services/can-deactivate.guard';
import { CoverEditorComponent } from 'src/components/cover-editor/cover-editor.component';
import { Cover1Component } from 'src/components/cover1/cover1.component';
import { UserCoverLetterComponent } from 'src/components/user-cover-letter/user-cover-letter.component';
import { AccountComponent } from 'src/components/account/account.component';


const routes: Routes = [

    { path: 'blogs', component: BlogsComponent   },
    { path: 'faq', component: FAQComponent   },
    { path: 'home', component: HomeComponent   },
    { path: 'pricing', component: PricingComponent   },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] ,
        children : [
            { path: '', component: UserResumeListComponent   },
            { path: 'resume', component: UserResumeListComponent   },
            { path: 'cover', component: UserCoverLetterComponent   },
        ]
    },
    {
        path: 'account', component: AccountComponent , canActivate: [AuthGuard] ,
    },
    { path: 'signup', component: SignupComponent },
    { path: 'recovery', component: RecoverAccountComponent },
    { path: 'privacy', component: PrivacyComponent   },
    { path: 'resources', component: ResourcesComponent   },
    { path: 'successful-resumes', component: SuccessfulResumesComponent   },
    { path: 'terms', component: TermsComponent   },
    { path: 'templates', component: TemplatesComponent  , canActivate: [AuthGuard] },
    {
        path: 'resume-editor', component: ResumeEditorComponent,
        children : [
            { path: '', component: Resume1Component   },
            { path: 'resume1', component: Resume1Component   },
            { path: 'resume2', component: Resume2Component   },
            { path: 'resume3', component: Resume3Component   },
            { path: 'resume4', component: Resume4Component   },
            { path: 'resume5', component: Resume5Component   },
            { path: 'resume6', component: Resume6Component   },
            { path: 'resume7', component: Resume7Component   },
            { path: 'resume8', component: Resume8Component   },
            { path: 'resume9', component: Resume9Component   },
            { path: 'resume10', component: Resume10Component },
            { path: 'resume11', component: Resume11Component },
            { path: 'resume12', component: Resume12Component },
            { path: 'resume13', component: Resume13Component },
            { path: 'resume14', component: Resume14Component },
            { path: 'resume15', component: Resume15Component },
            { path: 'resume16', component: Resume16Component },
            { path: 'resume17', component: Resume17Component },
            { path: 'resume18', component: Resume18Component },
            { path: 'resume19', component: Resume19Component },
            { path: 'resume20', component: Resume20Component },
            { path: 'resume21', component: Resume21Component },
            { path: 'resume22', component: Resume22Component },
            { path: 'resume23', component: Resume23Component },

        ],
        canActivate: [AuthGuard],
    },
    { path: 'user-details', component: UserInfoComponent   },
    {
        path: 'cover-editor', component: CoverEditorComponent, children: [
            { path: '', component: Cover1Component },
            { path: 'cover1', component: Cover1Component}
        ],
        canActivate: [AuthGuard],
    },

    // { path: 'edit-customer/:id', component: EditCustomerComponent },


    // { path: 'edit-customer/:id', component: EditCustomerComponent },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
                                    BlogsComponent,
                                    FAQComponent,
                                    HomeComponent,
                                    LayoutComponent,
                                    Navbar2Component,
                                    NavbarComponent,
                                    FooterComponent,
                                    PricingComponent,
                                    LoginComponent,
                                    DashboardComponent,
                                    SignupComponent,
                                    PrivacyComponent,
                                    ResourcesComponent,
                                    SuccessfulResumesComponent,
                                    TermsComponent,
                                    TemplatesComponent,
                                    ResumeEditorComponent,
                                    UserInfoComponent,
                                    RecoverAccountComponent,
                                    UserResumeListComponent,
                                    Resume1Component,
                                    Resume2Component,
                                    Resume3Component,
                                    Resume4Component,
                                    Resume5Component,
                                    Resume6Component,
                                    Resume7Component,
                                    Resume8Component,
                                    Resume9Component,
                                    Resume10Component,
                                    Resume11Component,
                                    Resume12Component,
                                    Resume13Component,
                                    Resume14Component,
                                    Resume15Component,
                                    Resume16Component,
                                    Resume17Component,
                                    Resume18Component,
                                    Resume19Component,
                                    Resume20Component,
                                    Resume21Component,
                                    CoverEditorComponent,
                                    Cover1Component,
                                    Resume22Component,
                                    Resume23Component,
                                    UserCoverLetterComponent,
                                    AccountComponent
                                 ];
