import {inject, TestBed} from '@angular/core/testing';

import {AdminGuard} from './admin.guard';
import {UserService} from "../service/user.service";
import {Router, RouterModule} from "@angular/router";

describe('AdminGuard', () => {
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      providers: [AdminGuard, UserService, {provide: Router, useValue: router}]
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
  it('be able to hit route when admin is logged in', inject([UserService, AdminGuard], (userService, guard) => {
    spyOn(userService, 'isAdmin').and.returnValue(true);
    expect(guard.canActivate()).toBe(true);
  }));
  it('not be able to hit route when admin is logged in', inject([UserService, AdminGuard], (userService, guard) => {
    spyOn(userService, 'isAdmin').and.returnValue(false);
    expect(guard.canActivate()).toBe(false);
    expect(router.navigate).toHaveBeenCalled();
  }));
});
