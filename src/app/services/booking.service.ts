import { LodgingDTO } from './../DTO/lodging.dto';
import { Observable, lastValueFrom, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lodging } from '../domain/lodging';
import { BookingDTO, BookingReviewDTO } from '../DTO/booking.dto';
import { Booking } from '../domain/booking';
import { Router } from '@angular/router';
import { CommentProfile } from '../domain/commentProfile';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  url : string = 'http://localhost:8080/api/booking'

constructor(private httpClient: HttpClient,private router: Router) { }

  getOne(id : number) : Observable<Booking> {
    const pathUrl = `${this.url}/${id}`;
    return this.httpClient.get<any>(pathUrl).pipe(
      map((book) => Booking.fromDTO(book))
    )
  }

  createBooking(booking : BookingDTO) {
    const pathUrl = `${this.url}`;
    return this.httpClient.post<any>(pathUrl, booking);
  }

  // getByUser(userId : number) : Observable<Booking[]> {
  //   const pathUrl = `${this.url}/user/${userId}`;
  //   return this.httpClient.get<any>(pathUrl).pipe(
  //     map((bookings) => bookings.map((booking: BookingDTO) => Booking.fromDTO(booking))
  //     ))
  // }


  getByUser(userId : number) : Observable<Booking[]> {
    const pathUrl = `${this.url}/user/${userId}`;
    return this.httpClient.get<any>(pathUrl).pipe(
      tap((data) => console.log('Data received:', data)),
      map((bookings) => bookings.map((booking: BookingDTO) => Booking.fromDTO(booking)))
    );
  }
  userScore(bookingReview: BookingReviewDTO) {
    const url = `${this.url}/review`;
    return this.httpClient.post(url, bookingReview)
    
  }

  async getCommentByUser(userId: number): Promise<any> {
    const comment$ =  this.httpClient.get<any>(`${this.url}/comments/${userId}`)
    try {
      const comment =  await lastValueFrom(comment$)
      return comment;
    } catch (err) {
      throw new Error('Error al obtener comentarios')
    }
  }

  async getCommentForLodging(lodgingId: number): Promise<any> {
    const comment$ =  this.httpClient.get<any>(`${this.url}/comment/lodging/${lodgingId}`)
    try {
      const comment =  await lastValueFrom(comment$)
      return comment;
    } catch (err) {
      throw new Error('Error al obtener comentarios')
    }
  }

  async deleteComment(bookingId: number): Promise<any>{
    const comment$ = this.httpClient.delete<any>(`${this.url}/comment/${bookingId}`)
    try {
      const comment = await lastValueFrom(comment$)
      return comment;
    } catch (err) {
      throw new Error('Error al eliminar comentario')
    }
  }

}

