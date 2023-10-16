import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { LoginComponent } from './pages/login/login.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './pages/landing/landing.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { JwtInterceptor } from './shared/interceptors/jwt.inteceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { SharedModule } from './shared/modules/shared.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalCommonModule } from './shared/modules/modal.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    NavbarComponent,
    NotFoundComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    SharedModule,
    ModalCommonModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
