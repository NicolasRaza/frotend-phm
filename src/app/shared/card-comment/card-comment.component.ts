import { ActivatedRoute } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {User} from "../../domain/user";
import { Review } from 'src/app/domain/review';
import { BookingService } from 'src/app/services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewService } from 'src/app/services/review.service';
//import { CommentsComponent } from 'src/app/profile/comments/comments/comments.component';

@Component({
  selector: 'app-card-comment',
  templateUrl: './card-comment.component.html',
  styleUrls: ['./card-comment.component.scss']
})
export class CardCommentComponent {

  @Input() comentario: any
  @Output() deleteComment = new EventEmitter<Comment>();
  @Input() reviewId : any

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private reviewService: ReviewService,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.isInProfile()
  }


  public isInProfile(): boolean{
    const urlActual = window.location.href.toString();
    return urlActual.includes('profile')
  }

  public deleteCommentEvent(){
    console.log(this.comentario)
    console.log(this.reviewId)

    this.reviewService.deleteReview(this.reviewId).then((response) => {
      console.log(response)
        this.snackBar.open("Comentario eliminado con exito",'',{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.deleteComment.emit(this.comentario)
    }).catch((error) => {
      console.log(error)
        this.snackBar.open('Error al eliminar comentario', '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
    });
  }

}
