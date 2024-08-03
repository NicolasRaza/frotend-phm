/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserFriendsService } from './userFriends.service';

describe('Service: UserFriends', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFriendsService]
    });
  });

  it('should ...', inject([UserFriendsService], (service: UserFriendsService) => {
    expect(service).toBeTruthy();
  }));
});
