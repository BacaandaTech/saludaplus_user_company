import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONFIG_DATE_PICKER } from 'src/app/shared/interfaces/utils.interface';
import { ModalService } from 'src/app/shared/services/modal.service';
import { usersService } from 'src/app/shared/services/users.service';
import { formatDate, toFormData } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  public links: any = [
    {
      url: '/main',
      label: 'Inicio'
    },
    {
      url: '/users/list',
      label: 'Usuarios'
    },
    {
      url: '',
      label: 'Agregar'
    },
  ];

  public roles = [
    {
      label:"RH",
      value:'rh'
    },
    {
      label:"Director",
      value:'director'
    }
  ];

  public datePickerConfig = CONFIG_DATE_PICKER;

  public frmCreateUser!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService:usersService,
    private modalService:ModalService,
    private router: Router
  ){
    this.frmCreateUser = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      second_last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      department: ['', Validators.required],
      role:['director',Validators.required]
    })
  }

  createUser(){
    let formData = toFormData(this.frmCreateUser.value);
    formData.set('birthday',formatDate(this.frmCreateUser.controls['birthday'].value!));

    this.userService.createUser(formData).subscribe({
      next: (response) => {
        this.modalService.openConfirmModal("El usuario ha sido creado correctamente");
        this.frmCreateUser.reset();
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  returnToList(){
    this.router.navigateByUrl('/users/list')
  }
}
