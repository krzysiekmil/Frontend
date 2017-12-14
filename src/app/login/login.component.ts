import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../service/authenticatoion.service";
import {UserService} from "../service/user.service";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  redirectUrl: string;
  userName: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authSerivice: AuthenticationService,
              private userService: UserService) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  ngOnInit(): void {
    this.userService.logout();
  }

  login() {
    this.loading = true;
    this.userName = this.model.username;
    this.authSerivice.login(this.model.username, this.model.password)
      .subscribe(
        result => {
          this.loading = false;
          if (result) {
            this.userService.login(result);
            if (this.redirectUrl) {
              this.router.navigateByUrl(this.redirectUrl);
            }
            else {
              this.router.navigate(['user']);
            }
          }
          else {
            this.error = "ERROR";
          }
        },
        error => {
          this.error = "Error";
          this.loading = false;
        }
      )
  }
}
