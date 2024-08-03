import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss', './authentication-card.scss']
})
export class AuthenticationComponent {

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser().then((user) => {
      if (user) {
        this.router.navigate(['/home']);
      }
      console.log('Holaaaa')
    }).catch((err) => {
    })
  }
}
