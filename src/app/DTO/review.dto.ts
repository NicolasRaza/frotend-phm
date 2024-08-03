import { User } from '../domain/user';

export interface ReviewDTO {
  id?: number;
  comment: string;
  bookingId?: number;
  score: number;
  publishedComment?: string;
  lodgingId: number;

}