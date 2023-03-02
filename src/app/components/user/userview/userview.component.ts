import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  myUser: User | any;
  objUsers: any = {};
  arrUsers: User[] = [];
  id: string = "";
  p: number = 1;


  constructor(
    private activateRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(async (params: any) => {
      this.id = params.url;
      this.myUser = await this.usersService.getById(this.id)
    })
  }

  deleteUser() {
    Swal.fire({
      title: '¿Desea eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let user = this.myUser._id;
          let response = await this.usersService.deleteUser(user);
          if (response) {
            Swal.fire(
              '!Eliminado!',
              `El usuario ${response.first_name} ${response.last_name} se ha borrado correctamente`,
              'success'
            )
            this.router.navigate(['/home']);
          }
        }
        catch (err) {
          console.log(err)
        }
      }
    })
  }
}
