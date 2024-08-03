import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Lodging, fromDetailToLodging } from './../../domain/lodging';
import { Component, Input } from '@angular/core';
import { ModalAddValueComponent } from 'src/app/modals/modal/modalAddValue/modalAddValue.component';
import { ModalAddReviewComponent } from 'src/app/modals/modal/modalAddReview/modalAddReview.component';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/domain/booking';
import { LodgingService } from 'src/app/services/lodging.service';
import { LodgingDetail } from 'src/app/domain/lodging-detail';
import { BookingReviewDTO } from 'src/app/DTO/booking.dto';
import { formatDate } from 'src/app/modals/modal/modalAddLodging/modalAddLodging.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, from, map, switchMap } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { ReviewDTO } from 'src/app/DTO/review.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchased-reserves',
  templateUrl: './purchased-reserves.component.html',
  styleUrls: ['./purchased-reserves.component.scss'],
})
export class PurchasedReservesComponent {
  
  @Input() button_qualify : boolean = true
  @Input() disableRedirect: boolean = false
  centered = false;
  disabled = false;
  unbounded = false;
  radius = 20;
  color = 'white';
  lodgings: Array<Lodging> = [];
  bookings : Array<Booking> = [];
  lodgingsBooked:Array<LodgingBooked>=[];

  constructor(
    public dialog: MatDialog,
    private bookingService: BookingService,
    private reviewService: ReviewService,
    private userService: UserService,
    private logingService : LodgingService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit() {
    this.getBookings();
  }


  openDialog( i : number): void {
    const booking = this.bookings[i]
    const dialogRef = this.dialog.open(ModalAddReviewComponent, {
      width: '600px',
      height: '350px',
      data: { score: booking.score, comment: booking.comment  },
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result !== undefined) {
        const review: ReviewDTO = {
          bookingId: booking.id,
          score: dialogRef.componentInstance.score,
          comment: dialogRef.componentInstance.comment,
          publishedComment : formatDate(new Date()),
          lodgingId: booking.lodgingId,
        };
        this.reviewService.userScore(review).subscribe(
          (response) => {
            this.getBookings();
            this.snackBar.open('Gracias por tu reseña', '', {
              duration: 10000,
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });
            this.router.navigate(['/profile/comments']);
          },
          (error) => {
            this.snackBar.open('Error al actualizar reseña', '', {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['error-snackbar']
            });
          });
      
        }})
  }

  getBookings() {
    this.bookings = [];
    this.bookingService.getByUser(this.userService.userLogeado.id!).subscribe(
      (data) => {
        this.bookings = data;
        this.lodgings = [];
        this.bookings.forEach((booking) => {
          try {
            this.logingService.getOne(booking.lodgingId).then((result: LodgingDetail) => {
              const lodging = fromDetailToLodging(result);
              //this.lodgings.push(lodging);
              this.lodgingsBooked.push({lodging : lodging, guests : booking.numberOfGuests,totalCost : booking.totalCost});

            });
          } catch (error) {
            console.error(error);
            // Manejar el error aquí, mostrar un mensaje al usuario, etc.
          }
        });
      },
      (error) => {
        console.error(error);
        // Manejar el error aquí, mostrar un mensaje al usuario, etc.
      }
    );
  }
  

}

export interface LodgingBooked{
  lodging : Lodging,
  guests: number,
  totalCost: number
}
