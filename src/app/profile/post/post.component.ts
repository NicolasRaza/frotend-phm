import { Lodging } from 'src/app/domain/lodging';
import { Component,Input   } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddLodgingComponent } from 'src/app/modals/modal/modalAddLodging/modalAddLodging.component';
import { LodgingService } from 'src/app/services/lodging.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User, userFromDTO } from 'src/app/domain/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent   {

  @Input() button_delete : boolean = true
  @Input() disableRedirect: boolean = false
  
  constructor(public dialog: MatDialog, private userService : UserService, private authService : AuthService,private snackBar : MatSnackBar, private lodgingService : LodgingService) { }

  lodgings! : Lodging[]

  ngOnInit() {
    this.getLodgings()
  }


  getLodgings() {
    console.info("ad")
    console.info(this.userService.userLogeado);
    this.userService.getLodgingsById(this.userService.userLogeado.id!).subscribe(
      (resul) => {
        this.lodgings = resul;
      },
      (error) => {
        console.error(error);
        // Manejar el error aquí, mostrar un mensaje al usuario, etc.
      }
    );
  }
  



  deletePost(id: number) {
    this.userService.deleteLodging(id).subscribe(() => {
      this.lodgings = this.lodgings.filter((item: Lodging) => item.id !== id);
      this.snackBar.open('Hospedaje eliminado con éxito', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
    },
    (error) => {
      console.log(error);
      this.snackBar.open('Error al eliminar Hospedaje ', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
  }
  )
}

    openModal(): void {
      const dialogRef = this.dialog.open(ModalAddLodgingComponent, {
        width: '1080px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getLodgings()
      });
    }
    
}