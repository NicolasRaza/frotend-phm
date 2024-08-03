import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppEmitterService {
  profileImage = new Subject<string>();
  profileImage$ = this.profileImage.asObservable();

  updateprofileImage(newprofileImage: any) {
    this.profileImage.next(newprofileImage);
  }
}
