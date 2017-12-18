import {inject, TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, UserService, {provide: Router, useClass: jasmine.createSpy('navigate')}]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
