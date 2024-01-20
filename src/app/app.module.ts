import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoarpetComponent } from './components/doarpet/doarpet/doarpet.component';
import { EncontrarpetComponent } from './components/encontrarpet/encontrarpet/encontrarpet.component';
import { BaseFormComponent } from './helpers/base-form/base-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NgToastModule } from 'ng-angular-popup';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { ConfirmarboxComponent } from './shared/components/confirmar/confirmarbox/confirmarbox.component';
import { DoarpetCEPComponent } from './components/doarpetCEP/doarpetCEP.component';
import { DialogLogadoComponent } from './shared/components/dialogLogado/dialogLogado.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainPageComponent } from './components/main-page/main-page.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MenuComponent,
    DashboardComponent,
    DoarpetComponent,
    DoarpetCEPComponent,
    EncontrarpetComponent,
    BaseFormComponent,
    DialogComponent,
    ConfirmarboxComponent,
    DialogLogadoComponent,
    MainPageComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    NgbModule,
    FormsModule,
  ],

  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }