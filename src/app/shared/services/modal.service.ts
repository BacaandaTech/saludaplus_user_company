import { Injectable } from '@angular/core';

import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalDeleteCollaborator } from '../components/modals/modal-delete-collaborator.component';
import { ModalConfirm } from '../components/modals/modal-confirm.component';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
    bsModalRef?: BsModalRef;

    constructor(private modalService: BsModalService) {}

    openDeleteCollaboratorModal(params:any){
        let options:ModalOptions ={
            class:"custom-modal modal-dialog-centered",
            ignoreBackdropClick:true,
            initialState:{
                data:params
            }
        }
        this.bsModalRef = this.modalService.show(ModalDeleteCollaborator,options);

    }

    openConfirmModal(message:string){
        let options:ModalOptions ={
            class:"custom-modal modal-dialog-centered",
            ignoreBackdropClick:true,
            initialState:{
                message:message
            }
        }
        this.bsModalRef = this.modalService.show(ModalConfirm,options);

    }
    
  
}