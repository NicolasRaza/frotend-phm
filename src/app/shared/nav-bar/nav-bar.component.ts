import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/domain/user';
import { AppEmitterService } from 'src/app/services/app-emitter.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  stars = [1, 2, 3];
  campeones = ['78', '86', '22'];

  numberOfNotifications = 2;
  logedIn = false;
  userLoged!: User;
  // userName = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private appEmitter: AppEmitterService
  ) {}

  ngOnInit() {
    this.authService
      .currentUser()
      .then((user) => {
        console.log('User', user);
        if (user) {
          this.logedIn = true;
          this.userLoged = user;
          // this.userName = user.userName;
        }
        console.log('Holaaaa');
      })
      .catch((err) => {
        this.logedIn = false;
      });

    this.appEmitter.profileImage$.subscribe((newprofileImage) => {
      console.log('Hubo un cambio en la imagen de perfil NAV BAR');
      this.userLoged.profileImageURL = newprofileImage;
    });
  }

  isAnyNotification() {
    return this.numberOfNotifications > 0;
  }

  numberOfNotificationsString() {
    return this.numberOfNotifications > 9
      ? '+9'
      : this.numberOfNotifications.toString();
  }

  logout() {
    this.authService
      .logout()
      .then((res) => {
        console.log('Loged Out', res);
        this.logedIn = false;
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        //Mostrar un toast de error
        console.log('Error', err);
      });
  }

  goToFifaPage(index: number) {
    switch (index) {
      case 0:
        window.open(
          'https://www.fifa.com/es/tournaments/mens/worldcup/1978argentina',
          '_blank'
        );
        break;
      case 1:
        window.open(
          'https://www.fifa.com/es/tournaments/mens/worldcup/1986mexico/teams/43922',
          '_blank'
        );
        break;
      case 2:
        window.open(
          'https://www.fifa.com/fifaplus/es/tournaments/mens/worldcup/qatar2022',
          '_blank'
        );
        break;
    }
  }
}
