import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-modal-confirm',
  template: `
      <div class="modal-header justify-content-center">
        <h4 class="modal-title text-center">Exito</h4>
      </div>
      <div class="modal-body">
        <p class="text-center modal-body-text m-0">
          {{message}}
        </p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-add btn-rounded" (click)="bsModalRef.hide()">Continuar</button>
      </div>
    `
})

export class ModalConfirm implements OnInit {
  message?: any;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    
  }
}