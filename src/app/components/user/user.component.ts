import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() myUser: User | any;

  ngOnInit(): void {
    //console.log(this.myUser);
  }

  constructor(
    private usersService: UsersService) {
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
              '¡Eliminado!',
              `El usuario ${response.first_name} ${response.last_name} se ha borrado correctamente`,
              'success'
            )
          }
        }
        catch (err) {
          console.log(err)
        }
      }
    })
  }
}
