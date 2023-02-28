import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-AddEditUser',
  templateUrl: './AddEditUser.component.html',
  styleUrls: ['./AddEditUser.component.css']
})
export class AddEditUserComponent implements OnInit {

  myUser: User | any;
  objUsers: any = {};
  arrUsers: User[] = [];
  id: string = "";

  AddEditUser: FormGroup;
  title: string;
  buttonName: string;


  constructor(
    private activateRoute: ActivatedRoute,
    private usersService: UsersService) {

    this.AddEditUser = new FormGroup({
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

    this.title = "NUEVO USUARIO"
    this.buttonName = "Guardar"

    this.activateRoute.params.subscribe((params: any) => {
      this.id = params.url;
    })

  }

  async ngOnInit() {
    this.myUser = await this.usersService.getById(this.id)
    if (this.id) {
      this.title = "ACTUALIZAR USUARIO"
      this.buttonName = "Actualizar"
      this.AddEditUser = new FormGroup({
        first_name: new FormControl(this.myUser.first_name, [
          Validators.required,
          Validators.minLength(3)
        ]),
        last_name: new FormControl(this.myUser.last_name, [
          Validators.required,
          Validators.minLength(3)
        ]),
        email: new FormControl(this.myUser.email, [
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
        ]),
        image: new FormControl(this.myUser.image, [
          Validators.required,
          Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
        ])
      })
    }
  }


  getDataForm() {
    console.log(this.AddEditUser.value)
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.AddEditUser.get(pControlName)?.hasError(pError) && this.AddEditUser.get(pControlName)?.touched) {
      return true
    }
    return false
  }

}
