import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private usersService: UsersService) { }

  async ngOnInit() {
    this.objUsers = await this.usersService.getAll()
    this.arrUsers = this.usersService.getArr(this.objUsers)
  }


}
