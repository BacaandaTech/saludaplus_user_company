import { Component } from '@angular/core';
import { checkPermission } from 'src/app/shared/services/utils.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
   AVAILABLE_MENUS = [
    {
      label:'Mis polizas',
      permission:"manage_policy",
      url:''
    },
    {
      label:'Colaboradores',
      permission:"list_collaborators",
      url:'/collaborators/list'
    },
    {
      label:'Facturacion',
      permission:"list_billing",
      url:''
    },
    {
      label:'Usuarios',
      permission:"list_users",
      url:''
    },
    {
      label:'Configuracion',
      permission:"edit_profile",
      url:''
    },
  
  ];

  validatePermission(permission:string):boolean{
    return checkPermission(permission);
  }
}
