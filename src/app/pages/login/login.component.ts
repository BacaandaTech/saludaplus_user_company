import { Component,ViewChild   } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { AuthCredentials } from 'src/app/shared/interfaces/auth.interface';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  bsModalRef?: BsModalRef

  frmLogin = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', Validators.required)
  });

  private unsuscribe$: Subject<void> = new Subject();

  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  isModalShown = true;
 
  showModal(): void {
    this.isModalShown = false;
  }

  handleLogin(){
    const authCredentials = new AuthCredentials({
      email: this.frmLogin.value.email,
      password: this.frmLogin.value.password
    });

    this.authService.login(authCredentials).pipe(takeUntil(this.unsuscribe$))
    .subscribe({
      next: (response: any) => {
        this.handleSuccesLogin(response);
        this.router.navigate(['/main']);
        this.authService.setCurrentUser(true);
      },
      error: (error:HttpErrorResponse) => {
        console.log(error.error.message)
      }
    })
  }

  handleSuccesLogin(response:any) {
    localStorage.clear();
    localStorage.setItem("token", response.access_token);
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("permissions", JSON.stringify(response.user.permissions));
    localStorage.setItem("expires_in", JSON.stringify(Date.now() + response.expires_in ));
  }


  
}
