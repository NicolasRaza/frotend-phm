import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, userFromDTO } from 'src/app/domain/user';
import { ModalAddFriendComponent } from 'src/app/modals/modal/modalAddFriend/modalAddFriend.component';
import { ModalAddLodgingComponent } from 'src/app/modals/modal/modalAddLodging/modalAddLodging.component';
import { UserService } from 'src/app/services/user.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserfriendsService } from 'src/app/services/userFriends.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {

  constructor(
    public dialog: MatDialog, 
    private userFriendService: UserfriendsService, 
    private userService: UserService,
    private changeDetectorRefs: ChangeDetectorRef  ,
    private snackBar: MatSnackBar
  ){}
  userLoggeado: User = new User()
  friendLoading = false;

  amigos: Array<User> = []

  ngOnInit() {
    try {
      this.userLoggeado = this.userService.userLogeado;
      this.obtenerAmigos();
    } catch (error) {
      console.error(error);
      // Manejar el error aquí, mostrar un mensaje al usuario, etc.
    }
  }
  


  obtenerAmigos() {
    this.userFriendService
      .getFriends(this.userLoggeado)
      .subscribe(
        (data) => {
          this.amigos = data;
        },
        (error) => {
          console.error(error);
          // Manejar el error aquí, mostrar un mensaje al usuario, etc.
        }
      );
  }
  

  deleteFriend(friend: User) {
    this.userFriendService.deleteFriend(this.userService.userLogeado, friend).subscribe(
      () => {
        // Eliminar amigo de la lista de amigos
        // this.amigos = this.amigos.filter((amigoLista) => amigoLista.id !== friend.id);
        this.friendLoading=false;
        this.obtenerAmigos();
        // this.changeDetectorRefs.detectChanges()
        this.snackBar.open('Amigo eliminado con éxito', '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Error al eliminar amigo ', '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    );
  }
  

  
  openModal(): void {
    const dialogRef = this.dialog.open(ModalAddFriendComponent, {
      width: '35em',
      height: '26em',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.obtenerAmigos()
    });
  }

}
