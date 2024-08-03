import { BookingDTO } from "../DTO/booking.dto"

export class Booking {
  id: number = -1
  score?: number
  comment?: string

  constructor(
    public lodgingId: number = 0,
    public userId: number = 0,
    public fromDate: Date = new Date(),
    public toDate: Date = new Date(),
    public totalCost: number = 0,
    public numberOfGuests: number = 0
  ) {}

  rate(score: number, comment: string) {
    this.score = score
    this.comment = comment
  }

  toDTO(): BookingDTO {
    return {
      id: this.id,
      lodgingId: this.lodgingId,
      userId: this.userId,
      fromDate: this.fromDate,
      toDate: this.toDate,
      totalCost: this.totalCost,
      score: this.score,
      comment: this.comment,
      numberOfGuests: this.numberOfGuests
    }
  }

  static fromDTO(bookingDTO: BookingDTO): Booking {
    let booking = new Booking(
      bookingDTO.lodgingId,
      bookingDTO.userId,
      bookingDTO.fromDate,
      bookingDTO.toDate,
      bookingDTO.totalCost,
      bookingDTO.numberOfGuests
    );

    booking.comment = bookingDTO.comment;
    booking.score = bookingDTO.score;
    booking.id = bookingDTO.id!;

    return booking;
  }

}
