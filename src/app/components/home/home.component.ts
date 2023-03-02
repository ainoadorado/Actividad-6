import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrUsers: User[] = [];
  currentpage: number = 1;
  First: number = 0;
  Last: number = 0;
  totalPages: any[] = [];


  constructor(private usersService: UsersService) { }

  async ngOnInit() {
    try {
      let response = await this.usersService.getAll(this.currentpage)
      this.totalPages = new Array(response['total_pages'])
      this.First = 1;
      this.Last = response.total_pages;
      this.paintUsers(this.currentpage);
    }
    catch (err) {
      console.log(err);
    }
  }

  setPage(pPage: number): void {
    this.currentpage = pPage;
    this.paintUsers(pPage);
  }


  goToPage(page: number) {
    this.currentpage = page;
    this.paintUsers(page);
  }


  async paintUsers(pPage: number) {
    try {
      let response = await this.usersService.getAll(pPage)
      this.arrUsers = response.results
    }
    catch (err) {
      console.log(err);
    }

  }

} 
