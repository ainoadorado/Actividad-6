import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  @Input() myUser: User | any;
  updateUser: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private usersService: UsersService) {

    this.updateUser = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      image: new FormControl("", [
        Validators.required,
        Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
      ])
    })
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      let id = params.url;
      this.myUser = this.usersService.getById(id);
      this.updateUser.patchValue({ first_name: this.myUser.first_name, last_name: this.myUser.last_name, email: this.myUser.email, image: this.myUser.image });
    })
  }



  getDataForm() {
    console.log(this.updateUser.value)
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.updateUser.get(pControlName)?.hasError(pError) && this.updateUser.get(pControlName)?.touched) {
      return true
    }
    return false
  }

}
