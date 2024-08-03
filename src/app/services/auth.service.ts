import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  pathUrl: string = 'http://localhost:8080/api/auth/';

  constructor(private http: HttpClient) { }

  async login(email: string, password: string): Promise<any> {
    const user$ = this.http.post<any>(
      this.pathUrl + 'login',
      {
        email: email,
        password: password
      },
      {
        withCredentials: true,
      },

    )
    return await lastValueFrom(user$);
  }

  async register(email: string, password: string): Promise<any> { //Promise User
    const user$ = this.http.post<any>(
      this.pathUrl + 'register',
      {
        email: email,
        password: password
      }
    )
    const user = await lastValueFrom(user$)
    return user;
  }

  async currentUser(): Promise<any> { //Promise User
    const user$ = this.http.get<any>(
      this.pathUrl + 'user',
      {
        withCredentials: true,
      }
    )
    try {
      const user = await lastValueFrom(user$)
      return user;
    } catch (err) {
      throw new Error('Error al obtener usuario actual')
    }

  }

  async logout(): Promise<any> {
    const response$ = this.http.post<any>(
      this.pathUrl + 'logout',
      {},
      {
        withCredentials: true,
      }
    )
    const response = await lastValueFrom(response$)
    return response;
  }

  async changeUserPassword(email: string, password: string): Promise<any> {
    const response$ = this.http.post<any>(
      this.pathUrl + 'change-password',
      {
        email: email,
        password: password
      },
    )
    const response = await lastValueFrom(response$)
    return response;
  }
}
