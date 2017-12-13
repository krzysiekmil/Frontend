import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {WeatherComponent} from './weather/weather.component';
import {AppRoutingModule} from './app-routing.module';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';
import {DataService} from './service/data.service';
import {Http, HttpModule} from '@angular/http';
import {ChartComponent} from './chart/chart.component';
import {ChartsModule} from 'ng2-charts';
import {LoginComponent} from './login/login.component';
import {FormsModule} from "@angular/forms";
import {RegistrationComponent} from './registration/registration.component';
import {AuthGuard} from "./guards/auth.guard";
import {UserService} from "./service/user.service";
import {AuthenticationService} from "./service/authenticatoion.service";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {TOKEN_NAME} from "./service/auth.constant";
import {RegistrationService} from "./service/registration.service";
import {AdminGuard} from "./guards/admin.guard";
import {WelcomeComponent} from './welcome/welcome.component';


export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    AdminComponent,
    UserComponent,
    ChartComponent,
    LoginComponent,
    RegistrationComponent,
    WelcomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ChartsModule,
    FormsModule
  ],
  providers: [
    RegistrationService,
    UserService,
    DataService,
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
    AuthenticationService,
    AuthGuard,
    AdminGuard,
    UserComponent,
    AdminComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
