import { LodgingDTO } from '../DTO/lodging.dto';
import { Observable, lastValueFrom, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lodging } from '../domain/lodging';
import { ReviewDTO } from '../DTO/review.dto';
import { Review } from '../domain/review';
import { Router } from '@angular/router';
import { CommentProfile } from '../domain/commentProfile';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  url : string = 'http://localhost:8080/api/review'

constructor(private httpClient: HttpClient,private router: Router) { }

  postReview(review: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/`, review);
  }

  async getReviewByUser(userId: number): Promise<any> {
    const comment$ =  this.httpClient.get<any>(`${this.url}/user/${userId}`)
    try {
      const comment =  await lastValueFrom(comment$)
      return comment;
    } catch (err) {
      throw new Error('Error al obtener comentarios')
    }
  }

  async getReviewForLodging(lodgingId: number): Promise<any> {
    try {
      const comment$ =  this.httpClient.get<any>(`${this.url}/lodging/${lodgingId}`)
      const comment =  await lastValueFrom(comment$)
      return comment;
    } catch (err) {
      throw new Error('Error al obtener comentarios')
    }
  }

  userScore(review: ReviewDTO) {
    const url = `${this.url}/rate`;
    return this.httpClient.post(url, review)
    
  }

  deleteReview(reviewId: number){
    
    const url = `${this.url}/${reviewId}`;
  return this.httpClient.delete(url, { observe: 'response', responseType: 'text' })
    .toPromise()
    .then((response) => {
      if (response!.status === 200) {
        return response!.body;
      } else {
        throw new Error(`Failed to delete review with id ${reviewId}`);
      }
    })
    .catch((error) => {
      console.error(error);
      throw new Error(`Failed to delete review with id ${reviewId}`);
    });
}

}

