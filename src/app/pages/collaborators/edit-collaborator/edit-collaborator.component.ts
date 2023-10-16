import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONFIG_DATE_PICKER } from 'src/app/shared/interfaces/utils.interface';
import { formatDate, toFormData } from 'src/app/shared/services/utils.service';
import { CollaboratorsService } from 'src/app/shared/services/collaborators.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-collaborator',
  templateUrl: './edit-collaborator.component.html',
  styleUrls: ['./edit-collaborator.component.scss']
})
export class EditCollaboratorComponent implements OnInit {
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
      label: 'Editar'
    },
  ];

  public datePickerConfig = CONFIG_DATE_PICKER;

  public frmCreateCollaborator: FormGroup;
  public idCollab:any = null;


  constructor(
    private fb: FormBuilder,
    private collabService: CollaboratorsService,
    private modalService: ModalService,
    private router: Router,
    private route:ActivatedRoute
  ) {
    

    this.frmCreateCollaborator = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      second_last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      department: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.idCollab = this.route.snapshot.paramMap.get('id_comunicate');

    
  }

  createCollaborator(): void {
    let formData = toFormData(this.frmCreateCollaborator.value);
    formData.set('birthday', formatDate(this.frmCreateCollaborator.controls['birthday'].value!));

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

  returnToList() {
    this.router.navigateByUrl('/collaborators/list')
  }
}
