import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../service/registration.service";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  model: any = {};
  redirectUrl: string;
  error: string;

  constructor(private registrationService: RegistrationService
    , private userService: UserService
    , private router: Router) {
  }

  ngOnInit() {
    this.userService.logout()
  }

  registration() {
    this.registrationService.registration(this.model.username, this.model.password)
      .subscribe(
        result => {
          if (result === 200) {
            this.router.navigate(['login']);
          }
        },
        error => {
          this.error = "Error";
        }
      )
  }
}
