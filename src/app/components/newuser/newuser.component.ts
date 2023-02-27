import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent {
  newUser: FormGroup;

  constructor() {
    this.newUser = new FormGroup({
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

  getDataForm() {
    console.log(this.newUser.value)
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.newUser.get(pControlName)?.hasError(pError) && this.newUser.get(pControlName)?.touched) {
      return true
    }
    return false
  }

}

