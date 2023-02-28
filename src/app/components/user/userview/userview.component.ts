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
  @Input() myUser: User | any;

  constructor(
    private activateRoute: ActivatedRoute,
    private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      let id = params.url;
      this.myUser = this.usersService.getById(id);
    })
  }

}
