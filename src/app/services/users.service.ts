import { Injectable } from '@angular/core';
import { USERS } from '../db/users.db';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private arrUsers: User[] = USERS;

  constructor() { }

  getAll(): User[] {
    return this.arrUsers;
  }
}
