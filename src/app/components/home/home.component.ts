import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrUsers: User[] = [];
  page: number = 1;
  totalPages: any[] = [];
  First: number = 0;
  Last: number = 0;


  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.paintUsers();
  }

  async paintUsers() {
    let response = await this.usersService.getAll(this.page)
    this.arrUsers = response.results
    this.totalPages = new Array(response['total_pages'])
    this.First = 1;
    this.Last = response.total_pages;
  }

  previous(): void {
    if (this.page > this.First) {
      this.page--;
      this.paintUsers();
    }

  }

  next(): void {
    if (this.page < this.Last) {
      this.page++;
      this.paintUsers();
    }

  }

  setPage(pPage: number): void {
    this.page = pPage;
    this.paintUsers();
  }
} 
