import { Booking } from './booking';
//create class CommentProfile
export class CommentProfile {
  constructor(
    public nameLodging: string = '',
    public bookingId: number = 0,

    public imageCreatorLodging: string = '',
    public nameCreatorLodging: string = '',

    public imageAuthor: string = '',
    public nameAuthor: string = '',

    public score: number = 0,
    public comment: string = '',
    public publishedComment: Date = new Date(),
  ){}
}
