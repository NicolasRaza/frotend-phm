import { Component } from '@angular/core';
import { User, userFromDTO } from 'src/app/domain/user';
import { Review } from 'src/app/domain/review';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewService } from 'src/app/services/review.service';
import { CommentProfile } from 'src/app/domain/commentProfile';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  comment!: Array<any> ; 

  
  profile!: User;
  selectedNacionalidad: string = '';

  eliminarComentario(comentario: any): void {
    this.comment = this.comment.filter(c => c !== comentario);
  }


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private reviewService: ReviewService) { }
  
    ngOnInit(): void {
      try {
        this.profile = this.userService.userLogeado;
        console.log("este log con id: ", this.profile.id);
        const commentProfile = this.reviewService.getReviewByUser(this.profile.id!);
        console.log("este log3: ", commentProfile);
        commentProfile.then((data) => {
          this.comment = data;
          console.log("este log2: ", this.comment);
        });
      } catch (error) {
        console.error(error);
        // Manejar el error aquí, mostrar un mensaje al usuario, etc.
      }
    }
    

    getUser() {
      try {
        this.authService.currentUser().then((userDTO) => {
          const user = userFromDTO(userDTO);
          console.log(user);
          this.profile = user;
          console.info(this.profile);
          this.selectedNacionalidad = this.profile.nationality;
          this.userService.userLogeado = user;
        });
      } catch (error) {
        console.error(error);
        // Manejar el error aquí, mostrar un mensaje al usuario, etc.
      }
    }
    
}