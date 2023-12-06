import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONFIG_DATE_PICKER } from 'src/app/shared/interfaces/utils.interface';
import { formatDate, toFormData } from 'src/app/shared/services/utils.service';
import { CollaboratorsService } from 'src/app/shared/services/collaborators.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-collaborator',
  templateUrl: './create-collaborator.component.html',
  styleUrls: ['./create-collaborator.component.scss']
})
export class CreateCollaboratorComponent {
  public links: any = [
    {
      url: '/main',
      label: 'Inicio'
    },
    {
      url: '/collaborators/list',
      label: 'Colaboradores'
    },
    {
      url: '',
      label: 'Agregar'
    },
  ];

  public datePickerConfig = CONFIG_DATE_PICKER;

  public frmCreateCollaborator: FormGroup;

  public genders = [
    {
      label:'Masculino',
      value:'male'
    },
    {
      label:'Femenino',
      value:'female'
    },
  ];

  constructor(
    private fb: FormBuilder,
    private collabService:CollaboratorsService,
    private modalService:ModalService,
    private router: Router
  ) {
    this.frmCreateCollaborator = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      second_last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      department: ['', Validators.required],
      gender: ['male', Validators.required],
      telephone: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      colony: ['', Validators.required],
      street: ['', Validators.required],
      external_number: ['', Validators.required],
      internal_number: ['', Validators.required],
      zipcode: ['', Validators.required],
    })
  }

  createCollaborator(): void {
    let formData = toFormData(this.frmCreateCollaborator.value);
    formData.set('birthday',formatDate(this.frmCreateCollaborator.controls['birthday'].value!));

    this.collabService.createCollaborator(formData).subscribe({
      next: (response) => {
        this.modalService.openConfirmModal("El colaborador ha sido creado correctamente");
        this.frmCreateCollaborator.reset();
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  returnToList(){
    this.router.navigateByUrl('/collaborators/list')
  }
}
