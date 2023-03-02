import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

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
    private usersService: UsersService,
    private router: Router
  ) {

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
        Validators.email
      ]),
      image: new FormControl("", [
        Validators.required,
        Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
      ])
    })

    this.title = "NUEVO USUARIO"
    this.buttonName = "Guardar"

  }

  ngOnInit() {
    this.activateRoute.params.subscribe(async (params: any) => {
      this.id = params.url;
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
            Validators.email
          ]),
          image: new FormControl(this.myUser.image, [
            Validators.required,
            Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
          ])
        })
      }
    })
  }


  async getDataForm() {
    if (this.buttonName === "Guardar") {
      try {
        let user: User = this.AddEditUser.value;
        let response = await this.usersService.createUser(user);
        if (response) {
          Swal.fire({
            title: '¡Usuario creado correctamente!',
            text: `Se ha creado el usuario ${response.first_name} ${response.last_name} con id ${response.id}`,
            icon: 'success',
          })
          this.router.navigate(['/home']);
        }
      }
      catch (err) {
        console.log(err)
      }
    } else {
      try {
        let user = {
          firstname: this.AddEditUser.value.first_name,
          username: this.AddEditUser.value.username
        };
        let id = this.myUser._id;
        let response = await this.usersService.updateUser(user, id);
        if (response) {
          Swal.fire({
            title: '¡Usuario actualizado correctamente!',
            text: `Se ha actualizado el usuario ${response.first_name} ${response.last_name}`,
            icon: 'success',
          })
          this.router.navigate(['/home']);
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  }


  checkControl(pControlName: string, pError: string): boolean {
    if (this.AddEditUser.get(pControlName)?.hasError(pError) && this.AddEditUser.get(pControlName)?.touched) {
      return true
    }
    return false
  }

}
