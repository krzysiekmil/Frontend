import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../service/registration.service";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {User} from "../model/user";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  model: any = {};
  redirectUrl: string;
  loading: boolean;
  error: string;

  constructor(private registrationService: RegistrationService
    , private userService: UserService
    , private router: Router) {
  }

  ngOnInit() {
    this.userService.logout()
  }

  registration() {
    this.loading = true;
    let user = new User(this.model.username, this.model.password)
    this.registrationService.registration(user)
      .subscribe(
        result => {
          this.loading = false;
          if (result) {
            this.userService.login(result);
            this.router.navigate(['/login']);
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
