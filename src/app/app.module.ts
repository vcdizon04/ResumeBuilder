import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule , AngularFireDatabase } from 'angularfire2/database';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app.routing.module';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { config } from './firebase_config';
import { AuthService } from 'src/services/auth.service';
import { AuthGuard } from 'src/services/auth-guard.service';
import {DndModule} from '@beyerleinf/ngx-dnd';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { PapaParseModule } from 'ngx-papaparse';
import { NgSelectModule } from '@ng-select/ng-select';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { NgxPayPalModule } from 'ngx-paypal';
import { CanDeactivateGuard } from 'src/services/can-deactivate.guard';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    DndModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxSpinnerModule,
    SlimLoadingBarModule,
    PapaParseModule,
    NgSelectModule,
    VirtualScrollerModule,
    NgxPayPalModule,
  ],
  providers: [
    AngularFireDatabase,
    AuthService,
    AuthGuard,
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: routingComponents
})
export class AppModule { }
