import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { User, userFromDTO } from '../domain/user';
import { filter } from 'rxjs/operators';
import { ModalAddValueComponent } from '../modals/modal/modalAddValue/modalAddValue.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UserDTO } from '../DTO/user.dto';
import { ModalChangePictureComponent } from '../modals/modal/modalChangePicture/modalChangePicture.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppEmitterService } from '../services/app-emitter.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profileinfo.component.html',
  styleUrls: ['./profileinfo.component.scss'],
})
export class ProfileInfoComponent {
  centered = false;
  disabled = false;
  unbounded = false;
  radius = 20;
  color = 'white';
  isEditing: boolean = false;
  profile!: User;
  displayedBirthDay!: Date;

  countries = [
    { value: 'Argentina' },
    { value: 'Brasil' },
    { value: 'Panama' },
  ];

  sideNavButtons: Array<SideNavButton> = [
    {
      id: 1,
      name: 'Reservas Compradas',
      route: 'purchased-reserves',
      active: true,
    },
    {
      id: 2,
      name: 'Amigos',
      route: 'friends',
      active: false,
    },
    {
      id: 3,
      name: 'Comentarios',
      route: 'comments',
      active: false,
    },
    {
      id: 4,
      name: 'Mis Publicaciones',
      route: 'posts',
      active: false,
    },
  ];

  nacionalidades: Nacionalidad[] = [
    { value: 'Argentina', display: 'Argentina' },
    { value: 'Brasil', display: 'Brasil' },
    { value: 'Chile', display: 'Chile' },
    { value: 'Colombia', display: 'Colombia' },
    { value: 'Peru', display: 'Perú' },
    { value: 'Uruguay', display: 'Uruguay' },
  ];

  selectedNacionalidad: string = '';

  selected = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private appEmitter: AppEmitterService
  ) {}

  ngOnInit() {
    this.getUser();

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log('Current URL:', event.url);
        this.sideNavButtons.forEach((button) => {
          button.active = false;
          if (event.url.includes(button.route)) {
            button.active = true;
          }
        });
      }
    });
  }

  getUser() {
    this.authService.currentUser().then(
      (userDTO) => {
        try {
          const user = userFromDTO(userDTO);
          console.log(user);
          this.profile = user;
          console.info(this.profile);
          this.selectedNacionalidad = this.profile.nationality;
          this.userService.userLogeado = user;
          this.displayedBirthDay = this.profile.birthDay;
        } catch (error) {
          console.error(error);
          // Manejar el error aquí, mostrar un mensaje al usuario, etc.
        }
      },
      (error) => {
        console.error(error);
        // Manejar el error aquí, mostrar un mensaje al usuario, etc.
      }
    );
  }

  navButtonClick(id: number) {
    this.sideNavButtons.forEach((button) => {
      button.active = false;
      if (button.id === id) {
        button.active = true;
      }
    });
    this.router.navigate(['profile', this.sideNavButtons[id - 1].route]);
  }

  sumarCredito(monto: number) {
    this.profile.addToBalance(monto);
    this.sendProfile();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAddValueComponent, {
      width: '350px',
      data: { number: undefined },
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result !== undefined) {
        this.sumarCredito(result);
      }
    });
  }

  openEdit() {
    const dialogRef = this.dialog.open(ModalChangePictureComponent, {
      width: '350px',
      height: '300px',
      data: this.profile.getImage(),
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result !== undefined) {
        this.profile.profileImageURL = result;
        this.sendProfile();
      }
    });
  }

  changeNationality(event: any) {
    this.profile.nationality = event;
    this.sendProfile();
  }

  saveUsername() {
    this.isEditing = false;
    this.sendProfile();
  }

  saveDate() {
    this.profile.birthDay = this.displayedBirthDay;
    this.sendProfile();
  }

  updateBirthDay(event: any) {
    const inputValue = event.target.value;
    this.profile.birthDay = new Date(inputValue);
  }

  sendProfile() {
    const user = this.profile.toDTO();
    this.userService.updateUser(this.profile.id!, user).subscribe(
      (result) => {
        this.profile = result;
      },
      (error) => {
        console.error(error);
        this.snackbar.open('Error al editar usuario', '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        // Manejar el error aquí, mostrar un mensaje al usuario, etc.
      }
    );

    this.appEmitter.updateprofileImage(user.profileImageURL);
  }
}

interface SideNavButton {
  id: number;
  name: string;
  route: string;
  active?: boolean;
}

interface Nacionalidad {
  value: string;
  display: string;
}
