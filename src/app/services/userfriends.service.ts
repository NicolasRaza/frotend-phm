import { UserDTO } from './../DTO/user.dto';
import { Observable, map, lastValueFrom, throwError, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../domain/user';
import { HttpClient } from '@angular/common/http';
import { userFromDTO } from '../domain/user';

@Injectable({
  providedIn: 'root'
})
export class UserfriendsService {

 url : string = 'http://localhost:8080/api/user-friend'

 constructor(private httpClient: HttpClient) {}

possibleFriends(userLogeado: User, page: number, size: number): Observable<{ users: User[], totalElements: number }> {
  const pathUrl = `${this.url}/${userLogeado.id}/suggest?page=${page}&size=${size}`;
  return this.httpClient.get<any>(pathUrl).pipe(
    map((response) => {
      const friends = response.content.map((unfriend: UserDTO) => userFromDTO(unfriend));
      const totalElements = response.totalElements;
      return { users: friends, totalElements: totalElements };
    })
  );
}


getFriends(userLogeado:User): Observable<User[]>{
  console.info(userLogeado)
  const pathUrl = `${this.url}/${userLogeado.id}`;
  return this.httpClient.get<any>(pathUrl).pipe(
    map((friends) => friends.content.map((friend : UserDTO) => userFromDTO(friend))
  ))
}


async addFriend(userLogeado: User, friend: User) : Promise<any>  {
  const pathUrl = `${this.url}/${userLogeado.id}/${friend.id}`;
  const data$ = this.httpClient.post<any>(pathUrl, friend)
  return await lastValueFrom(data$)
  
}


/*deleteFriend(userLogeado:User, friend: User): Observable<any>{
  const pathUrl = `${this.url}/${userLogeado.id}/${friend.id}`;
  /*return this.httpClient.delete<any>(pathUrl);
  return (this.httpClient.delete<any>(pathUrl));
}*/

deleteFriend(userLogeado: User, friend: User): Observable<any> {
  const pathUrl = `${this.url}/${userLogeado.id}/${friend.id}`;
  return this.httpClient.delete<any>(pathUrl)
    .pipe(
      catchError((error: any) => {
        // Manejar errores aquí, por ejemplo, mostrar un mensaje de error o registrar el error
        console.error('Error al eliminar amigo:', error);
        return throwError(error);
      })
    );
}

}


