import { ReviewDTO } from '../DTO/review.dto';
import * as moment from 'moment';
import { User } from './user';

export class Review {
  constructor(
    public id?: number,
    public comment: string = "",
    public bookingId?: number,
    public score: number = 0,
    public publishedComment?: string,
    public lodgingId?: number,
  ) {}

  toDTO(): ReviewDTO {
    return {
      id: this.id,
      comment: this.comment,
      bookingId: this.bookingId,
      score: this.score,
      publishedComment: this.publishedComment,
      lodgingId: this.lodgingId!,
    }
  }

}
