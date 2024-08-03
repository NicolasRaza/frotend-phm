import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { UserDTO } from '../DTO/user.dto';
import { User, userFromDTO } from '../domain/user';
import { Lodging } from '../domain/lodging';
import { LodgingDTO } from '../DTO/lodging.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  userLogeado! : User

  constructor(private httpClient: HttpClient) {}
  pathUrl: string = 'http://localhost:8080/api/user';
  Url: string = 'http://localhost:8080/api/lodging';

  // updateUser(id: number, user: UserDTO): Observable<User> {
  //   const url = `${this.pathUrl}/${id}`;
  //   return this.httpClient.patch<any>(`${this.pathUrl}/${id}`, user).pipe(
  //     map((res) => {
  //       const user = res.map((usuario: UserDTO) => {
  //         return userFromDTO(usuario)
  //       })
  //       return user
  //     })
  //   );
  // }




  getLodgingsById(id: number): Observable<Lodging[]> {
    const url = `${this.Url}/user/${id}`;
    return this.httpClient.get<LodgingDTO[]>(url).pipe(
      map((lodgingDTOs) => lodgingDTOs.map((lodgingDTO) => Lodging.fromDTO(lodgingDTO)))
    );
  }


  updateUser(id: number, user: UserDTO): Observable<User> {
    const url = `${this.pathUrl}/${id}`;
    return this.httpClient.patch<any>(`${this.pathUrl}/${id}`, user).pipe(
      map((res) => userFromDTO(res))
    );
}
 

deleteLodging(id: number): Observable<any> {
  const url = `${this.Url}/deactivate/${id}`;
  return this.httpClient.delete<any>(url);
}

// postLodging(lodging : any): Observable<any> {
//   console.info(lodging)
//   return this.httpClient.post<any>(`${this.Url}/post`, lodging)
// }


 
}

