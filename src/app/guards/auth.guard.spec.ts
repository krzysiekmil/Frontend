import {inject, TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";


describe('AuthGuard', () => {
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, UserService, {provide: Router, useValue: router}]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
  it('be able to hit route when tokenNotExpired is true', inject([UserService, AuthGuard], (userService, guard) => {
    spyOn(userService, 'isUser').and.returnValue(true);
    expect(guard.canActivate()).toBe(true);
  }));
  it('not be able to hit route when tokenNotExpired is false', inject([UserService, AuthGuard], (userService, guard) => {
    spyOn(userService, 'isUser').and.returnValue(false);
    expect(guard.canActivate()).toBe(false);
    expect(router.navigate).toHaveBeenCalled();
  }));
});
