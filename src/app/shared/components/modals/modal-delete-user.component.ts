import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from '../../services/modal.service';
import { usersService } from '../../services/users.service';
@Component({
  selector: 'app-delete-user',
  template: `
      <div class="modal-header justify-content-center">
        <h4 class="modal-title text-center">Aviso</h4>
      </div>
      <div class="modal-body">
        <p class="text-center modal-body-text m-0">
          Se borrara al usuario {{data.meta.last_name}} {{data.meta.second_last_name}} {{data.meta.name}}.  ¿ Estas seguro de querer eliminar a este usuario ?
        </p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-cancel btn-rounded" (click)="bsModalRef.hide()">Cancelar</button>
        <button class="btn btn-add btn-rounded" (click)="deleteCollaborator()">Si, continuar</button>
      </div>
    `
})

export class ModalDeleteUser implements OnInit {
  data?: any;

  constructor(public bsModalRef: BsModalRef, private userService:usersService,private modalService:ModalService) { }

  ngOnInit() {
    
  }

  deleteCollaborator(){
    this.userService.deleteUser(this.data.meta.id).subscribe({
      next: (response) => {
        this.bsModalRef.hide();
        this.modalService.openConfirmModal("El usuario ha sido eliminado correctamente");
        this.userService.setCurrentUpdateStatus(true);
      },
      error: (err) => {
        console.log(err)
      }
    })
    
    
  }
}