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
  @Input() myUser: User | any;
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
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      let id = params.url;
      this.myUser = this.usersService.getById(id);

      if (id) {
        this.title = "ACTUALIZAR USUARIO"
        this.buttonName = "Actualizar"
        this.AddEditUser.patchValue({ first_name: this.myUser.first_name, last_name: this.myUser.last_name, email: this.myUser.email, image: this.myUser.image });
      }
    })
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
