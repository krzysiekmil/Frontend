import {inject, TestBed} from '@angular/core/testing';

import {AdminGuard} from './admin.guard';
import {UserService} from "../service/user.service";
import {Router, RouterModule} from "@angular/router";

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      providers: [AdminGuard, UserService, {provide: Router, useClass: jasmine.createSpy('navigate')}]
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
