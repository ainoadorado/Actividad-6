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


  getAll(): Promise<User[]> {
    return lastValueFrom(this.httpClient.get<User[]>(this.baseUrl));
  }

  getByPage(currentPage: number): Promise<User[]> {
    return lastValueFrom(this.httpClient.get<User[]>((this.baseUrl) + `?page=${currentPage}`));
  }

  getById(pId: string): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>((this.baseUrl) + `/${pId}`));
  }

  getArr(pObj: any): User[] {
    return pObj.results
  }
}
