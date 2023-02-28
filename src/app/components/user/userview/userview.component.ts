import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  myUser: User | any;
  objUsers: any = {};
  arrUsers: User[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private usersService: UsersService) {
  }

  async ngOnInit() {
    this.objUsers = await this.usersService.getAll()
    this.arrUsers = this.usersService.getArr(this.objUsers);

    this.activateRoute.params.subscribe((params: any) => {
      let id = params.url;
      console.log(id)
      this.myUser = this.usersService.getById(this.arrUsers, id);
    })
  }

}
