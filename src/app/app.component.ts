import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Administrador SaludaPlus';
  auth: boolean;
  private authSubscription: Subscription | undefined;
  constructor(
    private authService: AuthService,
  ){
    this.auth = this.authService.isUserLoggedIn();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.currentAuth.subscribe(
      status => {
        this.auth = status;
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
