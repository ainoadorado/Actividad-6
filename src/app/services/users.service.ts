import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private baseUrl: string = "https://peticiones.online/api/users";

  constructor(private httpClient: HttpClient) { }


  getAll(pPage: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>((this.baseUrl) + `?page=${pPage}`));
  }

  getById(pId: string): Promise<User[]> {
    return lastValueFrom(this.httpClient.get<User[]>((this.baseUrl) + `/${pId}`));
  }

  createUser(pUser: User): Promise<User> {
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, pUser))
  }

  updateUser(pUser: {}, pId: string): Promise<User> {
    return lastValueFrom(this.httpClient.put<User>((this.baseUrl) + `/${pId}`, pUser))
  }

  deleteUser(pId: string): Promise<User> {
    return lastValueFrom(this.httpClient.delete<User>((this.baseUrl) + `/${pId}`))
  }

}
