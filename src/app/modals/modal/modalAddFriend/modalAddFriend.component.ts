import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/services/user.service';
import { UserfriendsService } from 'src/app/services/userFriends.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-modalAddFriend',
  templateUrl: './modalAddFriend.component.html',
  styleUrls: ['./modalAddFriend.component.scss']
})
export class ModalAddFriendComponent implements OnInit {

  friends: User[] = [];
  showModel = false;
  length = 0;
  pageSize = 3;
  pageIndex = 0;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModalAddFriendComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private userfriendsService: UserfriendsService
  ) {}

  ngOnInit() {
    this.possibleFriends();
    this.showModel = true;
  }

  possibleFriends() {
    this.userfriendsService
      .possibleFriends(this.userService.userLogeado, this.pageIndex, this.pageSize)
      .subscribe((data) => {
        console.info(data)
        this.friends = data.users;
        this.length = data.totalElements;
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.possibleFriends();
  }

  addFriend(friend: User) {
    this.userfriendsService
      .addFriend(this.userService.userLogeado, friend)
      .then(() => {
        this.possibleFriends();
        this.snackBar.open('Amigo agregado con éxito', '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      })
      .catch((error: any) => {
        this.snackBar.open('Error al agregar amigo', '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      });

    this.showModel = false;
    this.dialogRef.close();
  }

  closedModal() {
    this.dialogRef.close();
  }
}
