import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  objUsers: any = {};
  arrUsers: User[] = [];
  currentPage = 0;

  constructor(private usersService: UsersService) { }

  async ngOnInit() {
    let response = await this.usersService.getAll()
    this.arrUsers = response.results
  }

}
