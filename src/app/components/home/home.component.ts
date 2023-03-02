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
  page: number = 1;


  constructor(private usersService: UsersService) { }


  ngOnInit() {
    this.paintUsers(this.page);
  }

  goToPage(page: number) {
    this.page = page;
    this.paintUsers(page);
  }


  async paintUsers(pPage: number) {
    let response = await this.usersService.getAll(pPage)
    this.arrUsers = response.results

  }

} 
