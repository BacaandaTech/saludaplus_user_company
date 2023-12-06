import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalDeleteCollaborator } from "../components/modals/modal-delete-collaborator.component";
import { ModalConfirm } from "../components/modals/modal-confirm.component";


@NgModule({
    declarations:[
        ModalDeleteCollaborator,
        ModalConfirm
    ],
    imports:[
        CommonModule
    ],
    exports:[
        ModalDeleteCollaborator,
        ModalConfirm
    ]
})

export class ModalCommonModule{}