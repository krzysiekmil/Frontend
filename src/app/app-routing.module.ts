import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';
import {ChartComponent} from './chart/chart.component';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AdminGuard} from "./guards/admin.guard";
import {AuthGuard} from "./guards/auth.guard";
import {WelcomeComponent} from "./welcome/welcome.component";

const routes: Routes = [
  {
    path: ' ', redirectTo: 'user', pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chart',
    component: ChartComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'chart/:name',
    component: ChartComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
