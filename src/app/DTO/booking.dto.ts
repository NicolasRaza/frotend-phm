import { Booking } from "../domain/booking";

export interface BookingDTO {
  id?: number;
  userId: number;
  lodgingId: number;
  fromDate?: Date;
  toDate: Date;
  totalCost: number;
  score?: number;
  comment?: string;
  numberOfGuests?:number
}

export interface BookingReviewDTO{
  bookingId? : number;
  score?: number;
  comment?: string;
  publishedComment : string;
}