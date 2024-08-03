import { FilterRequestLodingDTO } from './../DTO/lodging.dto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lodging } from '../domain/lodging';

import { LodgingDTO } from '../DTO/lodging.dto';
import { catchError, lastValueFrom } from 'rxjs';
import { LodgingDetail } from '../domain/lodging-detail';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LodgingService {
  lodgings!: Array<Lodging>;
  pathUrl: string = 'http://localhost:8080/api/lodging';
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getLodgings(
    page: number,
    size: number,
    filters: FilterRequestLodingDTO,
    minScore: number
  ): Observable<{ lodgings: Lodging[]; totalElements: number }> {
    return this.httpClient
      .post<LodgingDTO>(
        `${this.pathUrl}?page=${page}&size=${size}&minScore=${minScore}`,
        filters
      )
      .pipe(
        map((res: any) => {
          const lodgings = res['content'].map((lodging: LodgingDTO) => {
            return Lodging.fromDTO(lodging);
          });
          const totalElements = res['totalElements'];
          return { lodgings, totalElements };
        })
      );
  }

  getFilteredLodgings(
    filters: FilterRequestLodingDTO
  ): Observable<{ lodgings: Lodging[] }> {
    return this.httpClient
      .post<LodgingDTO>(`${this.pathUrl}/filtered`, filters)
      .pipe(
        map((res: any) => {
          const lodgings = res.map((lodging: LodgingDTO) => {
            return Lodging.fromDTO(lodging);
          });
          return { lodgings };
        })
      );
  }

  searchLodgingsCountrys(country: string) {
    return this.httpClient.get<string[]>(
      `${this.pathUrl}/search/country/${country}`
    );
  }

  async getOne(id: number): Promise<LodgingDetail> {
    //Promise User
    const lodging$ = this.httpClient.get<any>(`${this.pathUrl}/${id}`);
    try {
      const lodging = await lastValueFrom(lodging$);
      return lodging;
    } catch (err) {
      this.router.navigate(['/detail-error']);
      throw new Error('Error al obtener lodging actual');
    }
  }

  async delete(id: number) {
    return await this.httpClient.delete<any>(`${this.pathUrl}/${id}`);
  }

  postLodging(lodging: any): Observable<any> {
    return this.httpClient.post<any>(`${this.pathUrl}/`, lodging);
  }

  async countClick(lodgingId?: number, userId?: number | null) {
    try {
      const user = await this.authService.currentUser();

      if (user) {
        userId = user.id;
        console.log('hlapapi', userId);
      }
      console.log('Holaaaa');

      const url = `${this.pathUrl}/${lodgingId}/contador`;
      const body = { userId: userId };

      return this.httpClient.post<any>(url, body);
    } catch (err) {
      userId = null;
      const url = `${this.pathUrl}/${lodgingId}/contador`;
      const body = { userId: userId };

      return this.httpClient.post<any>(url, body);
    }
  }

  getRecommendations(
    page: number,
    size: number,
    filters: FilterRequestLodingDTO
  ): Observable<{ lodgings: Lodging[]; totalElements: number }> {
    return this.httpClient
      .post<LodgingDTO>(
        `${this.pathUrl}/recommendations?page=${page}&size=${size}`,
        filters
      )
      .pipe(
        map((res: any) => {
          const lodgings = res['content'].map((lodging: LodgingDTO) => {
            return Lodging.fromDTO(lodging);
          });
          const totalElements = res['totalElements'];
          console.log(lodgings);
          console.log(totalElements);
          console.log(page, size);
          return { lodgings, totalElements };
        })
      );
  }
}
