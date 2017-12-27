import {inject, TestBed} from '@angular/core/testing';

import {UserService} from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
  it('should return boolean value true of Admin', inject([UserService], (service: UserService) => {
    service.admin_role = true;
    expect(service.isAdmin()).toBe(true);
  }));
  it('should return boolean value false of Admin', inject([UserService], (service: UserService) => {
    service.admin_role = false;
    expect(service.isAdmin()).not.toBe(true);
  }));
  it('should return boolean value true of Admin', inject([UserService], (service: UserService) => {
    service.admin_role = true;
    expect(service.isUser()).toBe(true);
  }));
  it('should return boolean value false of Admin', inject([UserService], (service: UserService) => {
    service.admin_role = false;
    expect(service.isUser()).not.toBe(true);
  }));
});
